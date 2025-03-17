"use client";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

type Event = {
  id: string;
  title: string;
  date: string;
  description?: string;
};

const AdminCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/event");
      const data = await response.json();
      const mappedEvents: Event[] = data.events.map((event: any) => ({
        ...event,
        id: event._id,
      }));
      setEvents(mappedEvents);
    };
    fetchEvents();
  }, []);

  const handleEventClick = (info) => {
    setSelectedEventId(info.event.id);
    setEventTitle(info.event.title);
    setEventDescription(info.event.extendedProps.description || "");
    setSelectedDate(info.event.startStr);
    setShowModal(true);
  };

  const handleAddEvent = (info) => {
    setSelectedDate(info.dateStr);
    setEventTitle("");
    setEventDescription("");
    setSelectedEventId(null);
    setShowModal(true);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleSaveEvent = async () => {
    if (!eventTitle || !selectedDate) {
      alert("Title and date are required.");
      return;
    }

    const selectedDateObj = new Date(selectedDate);
    if (isNaN(selectedDateObj.getTime())) {
      alert("Please select a valid date.");
      return;
    }

    const eventData: Omit<Event, "id"> = {
      title: eventTitle,
      date: selectedDateObj.toISOString(),
      description: eventDescription,
    };

    let success = false;

    if (selectedEventId) {
      const response = await fetch(`/api/event/${selectedEventId}`, {
        method: "PUT",
        body: JSON.stringify(eventData),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) success = true;
    } else {
      const response = await fetch("/api/event", {
        method: "POST",
        body: JSON.stringify(eventData),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) success = true;
    }

    if (success) {
      setShowModal(false);
      setEventTitle("");
      setEventDescription("");
      setSelectedDate(null);
      setSelectedEventId(null);
      const updatedEventsResponse = await fetch("/api/event");
      const updatedData = await updatedEventsResponse.json();
      const mappedUpdatedEvents: Event[] = updatedData.events.map((event: any) => ({
        ...event,
        id: event._id,
      }));
      setEvents(mappedUpdatedEvents);
    } else {
      alert("Failed to save the event");
    }
  };

  return (
    <div className="w-full h-screen px-10">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        dateClick={handleAddEvent}
        eventClick={handleEventClick}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 flex flex-col items-center">
            <h2>{selectedEventId ? "Edit Event" : "Add Event"}</h2>
            <input
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="p-2 w-full border border-gray-300 rounded"
            />
            <textarea
              placeholder="Event Description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              rows={4}
              className="p-2 w-full border border-gray-300 rounded mt-2"
            />
            <input
              type="date"
              value={selectedDate?.split("T")[0]}
              onChange={handleDateChange}
              className="p-2 w-full border border-gray-300 rounded mt-2"
            />
            <button onClick={handleSaveEvent} className="bg-blue-500 text-white p-2 rounded mt-2 w-full">
              {selectedEventId ? "Update Event" : "Save Event"}
            </button>
            <button onClick={() => setShowModal(false)} className="bg-red-500 text-white p-2 rounded mt-2 w-full">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCalendar;