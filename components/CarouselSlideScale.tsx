"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function SlideScale() {
  const data = [
    { imageSrc: "/icons/train.webp", title: "Since AQI is 65 today; try public transportation! you’ll be saving 1kg CO2 " },
    { imageSrc: "/icons/person.webp", title: "Tomorrow's AQI is 101 ! Try to work from home or combine errands" },
    { imageSrc: "/icons/leaf.webp", title: "Clean air yesterday means your effort kept AQI low for everyone!" },
  ];

  const MIN_SLIDES = 5;
  const slides = React.useMemo(() => {
    if (data.length >= MIN_SLIDES) return data;
    const out: typeof data = [];
    while (out.length < MIN_SLIDES) {
      out.push(...data);
    }
    return out.slice(0, MIN_SLIDES);
  }, [data]);

  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const update = () => {
      const sel = typeof api.selectedScrollSnap === "function" ? api.selectedScrollSnap() : 0;
      setCurrent(sel);
    };
    update();
    api.on("select", update);
    return () => {
      if (typeof api.off === "function") api.off("select", update);
    };
  }, [api, slides.length]);

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col gap-4 md:hidden">
        {data.map((card, index) => (
          <Card key={index} className="text-white bg-blue-600 transition-transform duration-500">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Image src={card.imageSrc} alt={card.title.split(" ")[0]} width={40} height={40} />
                <h3 className="font-medium">{card.title}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="hidden md:block">
        <Carousel setApi={setApi} className="max-w-full" opts={{ loop: true }}>
          <CarouselContent className="py-3">
            {slides.map((card, index) => (
              <CarouselItem key={index} className={cn("basis-[33%] shrink-0")}>
                <Card
                  className={cn("text-white bg-blue-600 transition-transform duration-500", {
                    "scale-[0.8] opacity-80": index !== current,
                  })}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Image src={card.imageSrc} alt={card.title} width={40} height={40} />
                      <h3 className="font-medium">{card.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
