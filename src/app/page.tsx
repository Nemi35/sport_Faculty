"use client";
import React from "react";
import { CarouselDemo } from "@/app/component/CarouselFull";
import { CarouselSpacing } from "@/app/component/CarouselSpacing";
import MyCalendar from "@/app/component/EventCalendar";
import Navbar from "./component/Navbar";
import Image from "next/image";
import bg_img from "@/assets/bg_img.jpg";
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
