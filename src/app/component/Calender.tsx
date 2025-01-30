import React from "react";
import MyCalendar from "./EventCalendar";

const Calender = () => {
  return (
    <div  id="calendar" className="bg-white p-4">
      <h2  className="pb-10  mt-10 text-4xl text-center font-bold tracking-tight">
        Upcoming Events
      </h2>
      <div className="w-full h-full relative p-5 ">
        <MyCalendar />
        <div className="overlay w-full h-full absolute -top-[10vh] bg-[#fff6] -z-[2] rounded-b-[5vw] "></div>
      </div>
    </div>
  );
};

export default Calender;
