import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function CarouselDemo() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images");
        const data = await response.json();
        setImages(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="w-full mx-auto mt-10 pt-28 h-[450px]">
      <Carousel className="w-full h-full  md:p-8">
        <CarouselContent className="h-full">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <div className="text-center text-gray-500">Loading...</div>
            </div>
          ) : (
            images.map((imgUrl, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="p-1 w-full h-full flex justify-center items-center">
                  <Card className="h-[450px] w-full overflow-hidden  border-none shadow-none rounded-[5vw]">
                    <CardContent className="flex items-center w-full rounded-[5vw] justify-center h-full p-6">
                      <Image
                        src={imgUrl}
                        alt={`Image ${index + 1}`}
                        layout="responsive"
                        width={100}
                        height={60}
                        className="img-fluid rounded-[5vw]"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
