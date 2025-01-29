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
    description: "Expert in strength training.",
  },
  {
    image: { coach },
    name: "Coach 2",
    description: "Specialist in endurance workouts.",
  },
  {
    image: { coach },
    name: "Coach 3",
    description: "Yoga and mindfulness trainer.",
  },
  {
    image: { coach },
    name: "Coach 4",
    description: "Cardio and HIIT expert.",
  },
  {
    image: { coach },
    name: "Coach 5",
    description: "Weightlifting and bodybuilding pro.",
  },
];

export function CarouselSpacing() {
  return (
    <Carousel className="w-full">
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
                <div className="absolute bottom-0 w-full bg-white/60 text-black text-center p-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
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
  );
}
