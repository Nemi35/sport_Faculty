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
    image: coach,
    name: "Coach 1",
    description: "Expert in strength training Weightlifting and bodybuilding pro.",
  },
  {
    image: coach,
    name: "Coach 2",
    description: "Specialist in endurance workouts Weightlifting and bodybuilding pro.",
  },
  {
    image: coach,
    name: "Coach 3",
    description: "Yoga and mindfulness trainer Weightlifting and bodybuilding pro.",
  },
  {
    image: coach,
    name: "Coach 4",
    description: "Cardio and HIIT expert Weightlifting and bodybuilding pro.",
  },
  {
    image: coach,
    name: "Coach 5",
    description: "Weightlifting and bodybuilding pro Weightlifting and bodybuilding pro.",
  },
];

export function CarouselSpacing() {
  return (
    <div>
      <h2 className="pb-10  text-4xl text-center font-bold tracking-tight">
        Meet our expert coaches
      </h2>
      <Carousel className="w-full">
        <CarouselContent className="gap-4">
          {carouselData.map((item, index) => (
            <CarouselItem key={index} className="w-full md:basis-1/2 lg:basis-1/4">
              <div className="p-5 border rounded-3xl">
                <Card className="w-full h-[400px] overflow-hidden relative border-none shadow-none">
                  {/* Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  {/* Text at the bottom */}
                  <div className="absolute bottom-0 w-full p-[50px_12px_35px_12px] text-left bg-gradient-to-t from-white to-transparent">
                    <h3 className="text-3xl text-black font-serif pb-2.5 font-semibold">{item.name}</h3>
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
    </div>
  );
}
