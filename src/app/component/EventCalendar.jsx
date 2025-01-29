"use client"; // This is necessary for client-side rendering in Next.js 13+

// Importing required FullCalendar libraries and styles
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // Month View
import timeGridPlugin from "@fullcalendar/timegrid"; // Week & Day Views
import interactionPlugin from "@fullcalendar/interaction"; // Enables event interaction

// Corrected imports for styles (remove vdom import)

export default function MyCalendar() {
  // State to manage the list of events
  const [events, setEvents] = useState([
    { title: "Meeting", date: "2025-01-29" },
    { title: "Workshop", date: "2025-02-05" },
  ]);

  const handleEventClick = (info) => {
    alert(
      `Event: ${
        info.event.title
      } \nStart: ${info.event.start.toLocaleString()} \nEnd: ${info.event.end?.toLocaleString()}`
    );
  };

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        editable={false}
        droppable={false}
        height="auto"
      />
    </div>
  );
}
