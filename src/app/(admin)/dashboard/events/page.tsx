"use client";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const AdminCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/event");
      const data = await response.json();
      const mappedEvents = data.events.map((event: any) => ({
        ...event,
        id: event._id,
      }));
      setEvents(mappedEvents);
    };
    fetchEvents();
  }, []);

  const handleEventClick = (info: any) => {
    setSelectedEventId(info.event.id);
    setEventTitle(info.event.title);
    setEventDescription(info.event.extendedProps.description || "");
    setSelectedDate(info.event.startStr);
    setShowModal(true);
  };

  const handleAddEvent = (info: any) => {
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

    const eventData = {
      title: eventTitle,
      date: selectedDateObj.toISOString(),
      description: eventDescription,
    };

    let success = false;

    if (selectedEventId) {
      const response = await fetch(`/api/event/${selectedEventId}`, {
        method: "PUT",
        body: JSON.stringify(eventData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) success = true;
    } else {
      const response = await fetch("/api/event", {
        method: "POST",
        body: JSON.stringify(eventData),
        headers: {
          "Content-Type": "application/json",
        },
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
      const mappedUpdatedEvents = updatedData.events.map((event: any) => ({
        ...event,
        id: event._id,
      }));
      setEvents(mappedUpdatedEvents);
    } else {
      alert("Failed to save the event");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEventTitle("");
    setEventDescription("");
    setSelectedDate(null);
    setSelectedEventId(null);
  };

  const handleEventDrop = async (info: any) => {
    const updatedEventData = {
      title: info.event.title,
      date: info.event.start.toISOString(),
      description: info.event.extendedProps.description || "",
    };

    const response = await fetch(`/api/event/${info.event.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedEventData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      alert("Failed to update the event date");
    } else {
      const updatedEventsResponse = await fetch("/api/event");
      const updatedData = await updatedEventsResponse.json();
      const mappedUpdatedEvents = updatedData.events.map((event: any) => ({
        ...event,
        id: event._id,
      }));
      setEvents(mappedUpdatedEvents);
    }
  };

  return (
    <div className="w-full h-screen box-border px-10">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        dateClick={handleAddEvent}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
      />

      {showModal && (
        <div className="modal ">
          <div className="modal-content">
            <h2>{selectedEventId ? "Edit Event" : "Add Event"}</h2>
            <input
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <textarea
              placeholder="Event Description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              rows={4}
            />
            <input
              type="date"
              value={selectedDate?.split("T")[0]}
              onChange={handleDateChange}
            />
            <button onClick={handleSaveEvent}>
              {selectedEventId ? "Update Event" : "Save Event"}
            </button>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        input,
        textarea {
          padding: 8px;
          margin: 10px 0;
          width: 100%;
        }
        button {
          padding: 8px 16px;
          margin: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default AdminCalendar;
