"use client";
import React from "react";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Coaches from "./component/Coaches";
import Calender from "./component/Calender";

const page = () => {
  return (
    <div className="  overflow-x-hidden">
      <Navbar />
      <div className="w-full h-screen ">
        <Hero />
        <Coaches />
        <Calender />
      </div>
    </div>
  );
};

export default page;
