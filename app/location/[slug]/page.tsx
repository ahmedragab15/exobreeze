"use client";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import LocationChart from "@/components/LocationChart";
import ProgressColor from "@/components/Progress";
import CircularProgressColor from "@/components/CircularProgress";
import Header from "@/components/layout/Header";
import { notFound } from "next/navigation";
import { locations } from "@/data/dummyDate";

export default function LocationStatsPage({ params }: { params: { slug: string } }) {
  const location = locations[params.slug as keyof typeof locations];
  if (!location) notFound();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    gsap.from(titleRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(cardsRef.current?.children || [], {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2,
      delay: 0.3,
    });
  }, []);

  return (
    <>
      <Header />
      <div ref={containerRef} className="flex items-center justify-center min-h-screen p-4 bg-gray-100 mt-12">
        <Card className="container mx-auto bg-white shadow-lg rounded-xl">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-4">
              <Link href="/home">
                <Button variant="ghost" size="sm" className="p-2">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <CardTitle ref={titleRef} className="text-2xl font-semibold">
                {location.name} AQI statistics
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div ref={cardsRef} className="grid gap-6 lg:grid-cols-3">
              <Card className="bg-gray-50">
                <CardContent className="p-6 ">
                  <div className="space-y-2">
                    <h3 className="text-xl">Current exposure</h3>
                    <h3 className="text-5xl font-bold">{location.currentAqi}</h3>
                  </div>
                  <div>
                    <span className="text-sm opacity-90 text-right w-full inline-block">48 / 500</span>
                    <div className="flex items-center gap-2 text-sm">
                      <ProgressColor progressWidth={(location.currentAqi / 500) * 100} />
                    </div>
                    <h4 className="opacity-90">Real-time personal exposure</h4>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50">
                <CardContent className="p-6 space-y-4 flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl">Weekly Average AQI</h3>
                    <h3 className="text-5xl font-bold">{location.weeklyAverage}%</h3>
                    <h3>
                      <span className="font-bold">{location.weeklyAverage}%</span> This Week
                    </h3>
                    <h3>
                      <span className="font-bold">{location.lastMonthPercent}%</span> Last week
                    </h3>
                  </div>
                  <div className="relative">
                    <CircularProgressColor progressValue={location.goalPercent} />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl ">Visitors This Week</h3>
                    <h3 className="text-5xl font-bold">{location.visitorsThisWeek}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <h4 className="text-xl ">Last 7 days</h4>
                    <Badge variant="secondary" className="text-red-600 bg-red-100 text-md font-medium">
                      {location.changePercent}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            <LocationChart />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
