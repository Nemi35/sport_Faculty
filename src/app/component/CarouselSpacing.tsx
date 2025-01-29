import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselSpacing() {
  return (
    <div className="">
     <h2 className=" py-10  scroll-m-20  text-4xl text-center font-bold tracking-tight transition-colors first:mt-0">
            Coach Profile
          </h2>
    <Carousel className="w-full "> 
      <CarouselContent className="gap-4"> 
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="w-full md:basis-1/2 lg:basis-1/4">
            <div className="p-4"> 
              <Card className="w-full h-[400px]"> 
                <CardContent className="flex items-center justify-center p-6 h-full">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
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
