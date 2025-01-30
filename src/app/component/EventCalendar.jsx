"use client";

import { useEffect, useState } from "react";

export default function MyCalendar() {
  const [events, setEvents] = useState([]);

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

  // Function to format date to dd-MMM (with date on top and month below)
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }); // Get short form of month (e.g., "Jan")
    return { day, month };
  };

  return (
    <div className="p-4 w-full md:w-[80%] mx-auto h-[60%] overflow-y-auto">
      <div className="space-y-4">
        {events.map((event, index) => {
          const { day, month } = formatDate(event.date);
          const eventTitle = event.title || "No title available";
          const eventDesc = event.description || "No description available.";

          return (
            <div key={index} className="flex flex-col md:flex-row items-center md:space-x-6 p-4 border-b">
              <div className="text-4xl font-bold mb-2 md:mb-0">
                <div>{day}</div>
                <div className="text-lg">{month}</div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-semibold">{eventTitle}</h2>
                <p className="text-base md:text-lg">{eventDesc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
