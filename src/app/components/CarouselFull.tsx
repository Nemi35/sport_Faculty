import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center"> {/* Parent container */}
      <div className="w-full h-1/2"> {/* Carousel wrapper with 50% height */}
        <Carousel className="w-full h-full"> {/* Carousel takes full height of its container */}
          <CarouselContent className="h-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="w-full h-full"> {/* Each item takes full height */}
                <div className="p-2 h-full">
                  <Card className="w-full h-full"> {/* Card stretches to full height */}
                    <CardContent className="flex items-center justify-center p-6 h-full">
                      <span className="text-4xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2" />
          <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  );
}
