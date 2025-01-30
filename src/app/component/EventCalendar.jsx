"use client";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/event");
        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (info) => {
    const eventDetails = {
      title: info.event.title,
      start: info.event.start
        ? info.event.start.toISOString().split("T")[0]
        : "No date available",
      end: info.event.end
        ? info.event.end.toISOString().split("T")[0]
        : "No end date",
      desc: info.event.extendedProps.description || "No description available.",
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
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
            <p>
              <strong>Description:</strong> {selectedEvent.desc}
            </p>
            <p>
              <strong>Date:</strong> {selectedEvent.start}
            </p>
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
