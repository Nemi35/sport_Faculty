"use client"; // This is necessary for client-side rendering in Next.js 13+

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // Month View
import timeGridPlugin from "@fullcalendar/timegrid"; // Week & Day Views
import interactionPlugin from "@fullcalendar/interaction"; // Enables event interaction

export default function MyCalendar() {
  // State to manage the list of events
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/event"); 
        const data = await response.json();
        
     
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []); 

  const handleEventClick = (info) => {
    const eventDetails = {
      title: info.event.title,
      start: info.event.start.toLocaleString(),
      end: info.event.end?.toLocaleString(),
    };
    setSelectedEvent(eventDetails);
  };

  const closePopup = () => {
    setSelectedEvent(null); 
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

 
      {selectedEvent && (
        <div className="z-[999] fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
            <p><strong>Description:</strong> {selectedEvent.desc || "No description available."}</p>
            <p><strong>Date:</strong> {selectedEvent.start}</p>
            <button
              onClick={closePopup}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
