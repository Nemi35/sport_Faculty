import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Img from "@/assets/img1.jpg";
import Image from "next/image";

const img = [
  { img: Img },
  { img: Img },
  { img: Img },
  { img: Img },
  { img: Img },
  { img: Img },
];

export function CarouselDemo() {
  return (
    <div className="w-full mx-auto h-[400px]">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {img.map((item, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="p-1 w-full h-full flex justify-center items-center">
                <Card className="h-[400px] w-full overflow-hidden">
                  <CardContent className="flex items-center w-full justify-center h-full p-6">
                    <Image
                      src={item.img}
                      className="img-fluid rounded-top"
                      alt="Image description"
                      style={{ maxWidth: "104%" }}
                    />
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
