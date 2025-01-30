import React from "react";
import { CarouselDemo } from "./CarouselFull";

const Hero = () => {
  return (
    <div className="">
      <div className=" bg-[#F4F4ED]  overflow-hidden rounded-[5vw] md:h-[60rem] ">
        <div className="w-[100%] md:h-full m-auto">
          <CarouselDemo />
           <h1 id="coach"></h1>
        </div>
       
      </div>
    </div>
  );
};

export default Hero;
