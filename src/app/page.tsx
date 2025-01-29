"use client";
import React from "react";

import { CarouselDemo } from "./components/CarouselFull";
import { CarouselSpacing } from "./components/CarouselSpacing";
import MyCalendar from "@/app/components/EventCalendar"



const page = () => {
  return (
    <div className=" w-[90%] mx-auto ">
      <h2 className=" py-8 mb-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        The King's Plan
      </h2>
      <div className="w-full h-screen ">
        <CarouselDemo />

        <h2 className=" py-10  scroll-m-20  text-4xl text-center font-bold tracking-tight transition-colors first:mt-0">
        Coach Profile
      </h2>
        <CarouselSpacing/>

        <h2 className=" py-10  scroll-m-20  text-4xl text-center font-bold tracking-tight transition-colors first:mt-0">
        Events Calendar
      </h2>
      <main className="flex justify-center items-center min-h-screen">
        
      <MyCalendar/>
    </main>
      </div>
    </div>
  );
};

export default page;
