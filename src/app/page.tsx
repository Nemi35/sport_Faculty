"use client";
import React from "react";

import { CarouselDemo } from "@/app/component/CarouselFull";
import { CarouselSpacing } from "@/app/component/CarouselSpacing";
import MyCalendar from "@/app/component/EventCalendar"
import Navbar from "./component/Navbar";


const page = () => {
  return (
    <>
    <Navbar/>
   
    <div className=" w-[90%] mx-auto mt-8 ">

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

    <h1 className="bg-red-500">jfl;sdkjflsdkjflksdjflksdjflk</h1>
      </div>
    </div>
    </>
  );
};

export default page;
