"use client";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const AdminCalendar = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const handleEventClick = async (info) => {
    // Handle event edit (e.g., open a modal to edit event details)
    const eventId = info.event.id;
    const updatedEvent = { title: "Updated Event" }; // Get updated details from a modal or input

    await fetch(`/api/events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    });
  };

  const handleEventDrop = async (info) => {
    const updatedEvent = {
      id: info.event.id,
      start: info.event.start,
      end: info.event.end,
    };

    await fetch(`/api/events/${updatedEvent.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedEvent),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleAddEvent = async (info) => {
    const newEvent = {
      start: info.dateStr,
      title: "New Event",
    };

    await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify(newEvent),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true} // Allow editing (add, move, delete events)
        droppable={true} // Allow drag and drop
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        dateClick={handleAddEvent} // Add event on date click
      />
    </div>
  );
};

export default AdminCalendar;