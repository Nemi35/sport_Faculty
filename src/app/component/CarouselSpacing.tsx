import * as React from "react";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import coach from "../../assets/coach.jpg";

const carouselData = [
  {
    image: { coach },
    name: "Coach 1",
    description: "Expert in strength training Weightlifting and bodybuilding pro.",
  },
  {
    image: { coach },
    name: "Coach 2",
    description: "Specialist in endurance workouts Weightlifting and bodybuilding pro.",
  },
  {
    image: { coach },
    name: "Coach 3",
    description: "Yoga and mindfulness trainer Weightlifting and bodybuilding pro.",
  },
  {
    image: { coach },
    name: "Coach 4",
    description: "Cardio and HIIT expert Weightlifting and bodybuilding pro.",
  },
  {
    image: { coach },
    name: "Coach 5",
    description: "Weightlifting and bodybuilding pro Weightlifting and bodybuilding pro .",
  },
];

export function CarouselSpacing() {
  return (
    <>
   <h2 className=" py-10  scroll-m-20  text-4xl text-center font-bold tracking-tight transition-colors first:mt-0">
   Coach profile
        </h2>
    <Carousel className="w-full">
      <h1 className="py-10  scroll-m-20  text-4xl text-center font-bold tracking-tight transition-colors first:mt-0">All Coaches</h1>
      <CarouselContent className="gap-4">
        {carouselData.map((item, index) => (
          <CarouselItem
            key={index}
            className="w-full md:basis-1/2 lg:basis-1/4"
          >
            <div className="p-4">
              <Card className="w-full h-[400px] overflow-hidden relative">
                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={item.image.coach}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>

                {/* Text at the bottom */}
                <div className="absolute bottom-0 w-full p-[50px_12px_35px_12px] text-left bg-gradient-to-t from-white to-transparent">
                  <h3 className="text-3xl text-black font-serif pb-2.5c font-semibold">{item.name}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </>
  );
}
