"use client";
import React from "react";
import Navbar from "./components/Navbar";
import { CarouselDemo } from "./components/CarouselFull";

const page = () => {
  return (
    <div className=" w-full ">
    <Navbar/>
    <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        The King's Plan
      </h2>
      <div className="w-full h-screen ">
    <CarouselDemo/>
    </div>

    </div>
  );
};

export default page;
