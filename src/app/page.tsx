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
    
      <div className=" w-[90%] mx-auto mt-24 ">
        <div className="w-full h-screen ">
          <CarouselDemo />
        
          <CarouselSpacing/>

          <h2 className=" py-10  scroll-m-20  text-4xl text-center font-bold tracking-tight transition-colors first:mt-0">
          Events Calendar
        </h2>
        <main className="flex justify-center items-center min-h-screen">
          
        <MyCalendar/>



      </main>

        </div>
      </div>
      </>
    );
  };

  export default page;
