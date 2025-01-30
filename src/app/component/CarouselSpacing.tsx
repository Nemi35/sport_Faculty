"use client";

import React from "react";
import useSWR from "swr";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

// API fetcher function
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch coaches");
  return res.json();
};

interface Coach {
  image: string;
  name: string;
  title: string;
}

export function CarouselSpacing() {
  const {
    data: coaches,
    error,
    isLoading,
  } = useSWR<Coach[]>("/api/profile", fetcher, {
    revalidateOnFocus: false, // Prevents refetching on window focus
    dedupingInterval: 300000, // Cache for 5 minutes
  });

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center">
        <h2 className="pb-10 text-4xl text-center font-bold tracking-tight">
          Meet our expert coaches
        </h2>
        <div className="w-full flex gap-4 justify-center">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="w-full md:w-1/2 lg:w-1/4 h-[400px] bg-gray-200 animate-pulse rounded-3xl"
              />
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  return (
    <div>
      <h2
        id="coach"
        className="pb-10 text-4xl text-center font-bold tracking-tight"
      >
        Meet our expert coaches
      </h2>
      <Carousel className="w-full">
        <CarouselContent className="gap-4">
          {coaches?.map((coach, index) => (
            <CarouselItem
              key={index}
              className="w-full md:basis-1/2 lg:basis-1/4"
            >
              <div className="p-5 border rounded-3xl">
                <Card className="w-full h-[400px] overflow-hidden relative border-none shadow-none">
                  {/* Image with lazy loading and optimized quality */}
                  <div className="relative w-full h-full">
                    <Image
                      src={coach.image}
                      alt={coach.name}
                      layout="fill"
                      objectFit="cover"
                      priority={index < 2} // Load first 2 images fast, rest lazy load
                      quality={index < 2 ? 80 : 50} // Reduce quality for non-priority images
                      loading={index < 2 ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="absolute bottom-0 w-full p-6 text-left bg-gradient-to-t from-white to-transparent">
                    <h3 className="text-3xl text-black font-serif pb-2.5 font-semibold">
                      {coach.name}
                    </h3>
                    <p className="text-sm">{coach.title}</p>
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
