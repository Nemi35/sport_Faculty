"use client";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const AdminCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/event");
      const data = await response.json();
      const mappedEvents = data.events.map(event => ({
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
    setSelectedDate(info.event.startStr);
    setShowModal(true);
  };

  const handleAddEvent = (info: any) => {
    setSelectedDate(info.dateStr);
    setSelectedEventId(null);
    setEventTitle("");
    setShowModal(true);
  };

  const handleSaveEvent = async () => {
    if (!eventTitle || !selectedDate) {
      alert("Title and date are required.");
      return;
    }

    const eventData = {
      title: eventTitle,
      date: new Date(selectedDate).toISOString(),
    };

    if (selectedEventId) {
      // Update existing event with PUT request
      const response = await fetch(`/api/event/${selectedEventId}`, {
        method: "PUT",
        body: JSON.stringify(eventData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to update the event");
      }
    } else {
      // Add new event (POST request)
      const response = await fetch("/api/event", {
        method: "POST",
        body: JSON.stringify(eventData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to add the event");
      }
    }

    // Close modal and refresh events
    setShowModal(false);
    setEventTitle("");
    setSelectedDate(null);
    setSelectedEventId(null);

    // Refresh events after save
    const updatedEventsResponse = await fetch("/api/event");
    const updatedData = await updatedEventsResponse.json();
    const mappedUpdatedEvents = updatedData.events.map(event => ({
      ...event,
      id: event._id,
    }));
    setEvents(mappedUpdatedEvents);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEventTitle("");
    setSelectedDate(null);
    setSelectedEventId(null);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        dateClick={handleAddEvent}
        eventClick={handleEventClick}
      />

      {/* Modal for adding/updating event */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedEventId ? "Edit Event" : "Add Event"}</h2>
            <input
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <p style={{ fontSize: "14px", color: "gray" }}>
              Selected Date: {selectedDate || "No date selected"}
            </p>
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
        input {
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
