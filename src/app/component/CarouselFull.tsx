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
    <div className="w-full mx-auto mt-10 pt-28 h-[450px]">
      <Carousel className="w-full h-full  p-8">
        <CarouselContent className="h-full">
          {img.map((item, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="p-1 w-full h-full flex justify-center   items-center">
                <Card className="h-[450px] w-full overflow-hidden  border-none shadow-none rounded-[5vw]">
                  <CardContent className="flex items-center w-full rounded-[5vw] justify-center h-full p-6">
                    <Image
                      src={item.img}
                      className="img-fluid  rounded-[5vw]"
                      alt="Image description"
                      style={{ maxWidth: "110%" }}
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
