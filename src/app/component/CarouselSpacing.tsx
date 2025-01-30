"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Coach {
  image: string;
  name: string;
  title: string;
}

export function CarouselSpacing() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) throw new Error("Failed to fetch coaches");
        const data: Coach[] = await response.json();
        setCoaches(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  if (loading) return <p className="text-center text-xl">Loading coaches...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div>
      <h2 id="coach" className="pb-10  text-4xl text-center font-bold tracking-tight">
        Meet our expert coaches
      </h2>
      <Carousel className="w-full">
        <CarouselContent className="gap-4">
          {coaches.map((coach, index) => (
            <CarouselItem
              key={index}
              className="w-full md:basis-1/2 lg:basis-1/4"
            >
              <div className="p-5 border rounded-3xl">
                <Card className="w-full h-[400px] overflow-hidden relative border-none shadow-none">
                  {/* Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={coach.image}
                      alt={coach.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="absolute bottom-0 w-full p-[50px_12px_35px_12px] text-left bg-gradient-to-t from-white to-transparent">
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
