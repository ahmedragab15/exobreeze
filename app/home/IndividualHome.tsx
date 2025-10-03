"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";
import ProgressColor from "@/components/Progress";
import CircularProgressColor from "@/components/CircularProgress";
import SlideScale from "@/components/CarouselSlideScale";
import { stats } from "@/data/dummyDate";
import Header from "@/components/layout/Header";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const exposureRef = useRef<HTMLDivElement>(null);
  const snapshotsRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const heroTl = gsap.timeline();
    heroTl
      .fromTo(".hero-content > *", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" })
      .fromTo(".hero-underline", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power2.out" }, "-=0.5");

    const statsCards = statsRef.current?.querySelectorAll(".stat-card") || [];
    statsCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });

    const exposureCards = exposureRef.current?.querySelectorAll(".exposure-card") || [];
    exposureCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });

    const snapshotItems = snapshotsRef.current?.querySelectorAll(".snapshot-item") || [];
    gsap.fromTo(
      snapshotItems,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: snapshotsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );

    gsap.fromTo(
      ".challenges-title",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: challengesRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
  }, []);

  return (
    <>
      <Header />
      <section
        ref={heroRef}
        className="flex relative justify-between min-h-screen gap-12 sm:gap-20 pt-62 bg-[url('/hero_bg.webp')] bg-no-repeat bg-center bg-cover bg-fixed"
      >
        <div className="absolute -top-28 right-0 w-1/3 h-full md:bg-[url('/patterns.png')] bg-no-repeat bg-right bg-contain pointer-events-none"></div>
        <div className="flex flex-col gap-4 px-4 max-w-7xl sm:px-8 lg:px-30 hero-content">
          <div className="flex items-center gap-2 text-3xl text-white">
            <MapPin className="w-5 h-5" />
            <span>New Cairo</span>
          </div>
          <h1 className="text-4xl text-white leading-[1.29167] font-medium text-balance sm:text-5xl lg:text-8xl ">
            Sunny, Very Hot
            <br />
            <span className="relative text-orange">
              AQI: 120
              <svg
                width="223"
                height="12"
                viewBox="0 0 223 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-x-0 bottom-0 w-full translate-y-1/2 max-sm:hidden hero-underline"
              >
                <path
                  d="M1.11716 10.428C39.7835 4.97282 75.9074 2.70494 114.894 1.98894C143.706 1.45983 175.684 0.313587 204.212 3.31596C209.925 3.60546 215.144 4.59884 221.535 5.74551"
                  stroke="url(#paint0_linear_10365_68643)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="paint0_linear_10365_68643" x1="18.8541" y1="3.72033" x2="42.6487" y2="66.6308" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--primary)" />
                    <stop offset="1" stopColor="var(--primary-foreground)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
          <p className="text-white/90 max-w-84">Use public transport or car-share today to help lower emissions</p>
          <Button className="h-12 text-xl text-white bg-orange white hover:bg-orange-600">Track Local Air Quality</Button>
        </div>
      </section>

      <div ref={statsRef} className="container mx-auto my-8 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-muted-foreground">ExoBreeze in Numbers</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 text-center border-0 gap-0 stat-card">
              <h3 className="text-3xl font-bold ">
                {stat.value}
                <span className="text-orange">+</span>
              </h3>
              <h4 className="text-sm text-muted-foreground">{stat.label}</h4>
            </Card>
          ))}
        </div>
      </div>

      <div ref={exposureRef} className="container mx-auto my-8 space-y-4">
        <h2 className="text-2xl font-semibold">Personal exposure score</h2>
        <p className="text-muted-foreground">Your AQI exposure this week</p>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="text-white bg-sky-700 exposure-card">
            <CardContent className="p-6 ">
              <div className="space-y-2">
                <h3 className="text-xl">Current exposure</h3>
                <h3 className="text-5xl font-bold">53</h3>
              </div>
              <div>
                <span className="text-sm opacity-90 text-right w-full inline-block">48 / 500</span>
                <div className="flex items-center gap-2 text-sm">
                  <ProgressColor progressWidth={32} />
                </div>
                <h4 className="opacity-90">Real-time personal exposure</h4>
              </div>
            </CardContent>
          </Card>
          <Card className="text-white bg-sky-700 exposure-card">
            <CardContent className="p-6 space-y-4 flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xl">Weekly Average AQI</h3>
                <h3 className="text-5xl font-bold">30%</h3>
                <h3>
                  <span className="font-bold">30%</span> This Week
                </h3>
                <h3>
                  <span className="font-bold">65%</span> Last week
                </h3>
              </div>
              <div className="relative">
                <CircularProgressColor progressValue={30} />
              </div>
            </CardContent>
          </Card>
          <Card className="text-white bg-sky-700 exposure-card">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl ">Time in Unsafe Air</h3>
                <h3 className="text-5xl font-bold">5.8 h</h3>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <h4 className="text-xl ">Last 7 days</h4>
                <Badge variant="secondary" className="text-red-600 bg-red-100 text-md font-medium">
                  -35.24%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="border-blue-200 bg-blue-300 p-2 exposure-card">
          <CardContent className="flex items-center gap-3 p-4">
            <Image src="/icons/heart.webp" alt="heart" width={40} height={40} />
            <div className="text-lg">
              <span className="font-bold">Great job!</span>
              <span className="ml-1">Keep it up with short walks or cycling when AQI stays this low</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div ref={snapshotsRef} className="container mx-auto my-8 space-y-4">
        <h2 className="text-3xl font-semibold">Your air quality snapshots</h2>
        <p className="text-muted-foreground">Favorites Quick AQI View</p>
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <Link href="/location/al-azhar-park" className="md:row-span-2 snapshot-item">
            <Card className="h-full overflow-hidden transition-shadow cursor-pointer group hover:shadow-lg py-0">
              <div className="relative h-48 md:h-full bg-gradient-to-br from-blue-400 to-blue-500">
                <div className="absolute inset-0 bg-[url('/al-azhar-park-with-trees-and-greenery.webp')] bg-cover bg-center opacity-80" />
                <div className="absolute text-white bottom-4 left-4">
                  <h3 className="text-2xl font-semibold text-shadow-md">Al-Azhar Park</h3>
                  <p className="font-medium text-orange-400 text-shadow-md">AQI statistics</p>
                </div>
                <div className="absolute bottom-4 right-4">
                  <ArrowRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Card>
          </Link>
          <Link href="/location/family-park" className="md:col-span-2 snapshot-item">
            <Card className="overflow-hidden transition-shadow cursor-pointer group hover:shadow-lg py-0">
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-500">
                <div className="absolute inset-0 bg-[url('/family-park-with-lake-and-palm-trees.webp')] bg-cover bg-center opacity-80" />
                <div className="absolute text-white bottom-4 left-4">
                  <h3 className="text-2xl font-semibold text-shadow-md">Family park</h3>
                  <p className="font-medium text-orange-400 text-shadow-md">AQI statistics</p>
                </div>
                <div className="absolute bottom-4 right-4">
                  <ArrowRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Card>
          </Link>
          <Link href="/location/alexandria-corniche" className="md:col-span-2 snapshot-item">
            <Card className="overflow-hidden transition-shadow cursor-pointer group hover:shadow-lg py-0">
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-500">
                <div className="absolute inset-0 bg-[url('/alexandria-corniche-waterfront-with-buildings.webp')] bg-cover bg-center opacity-80" />
                <div className="absolute text-white bottom-4 left-4">
                  <h3 className="text-2xl font-semibold text-shadow-md">Alexandria corniche</h3>
                  <p className="font-medium text-orange-400 text-shadow-md">AQI statistics</p>
                </div>
                <div className="absolute bottom-4 right-4">
                  <ArrowRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>

      <div ref={challengesRef} className="container mx-auto my-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="challenges-title">
            <h2 className="text-2xl font-semibold">Daily Eco challenges</h2>
            <p className="text-muted-foreground">Small action, big impact</p>
          </div>
        </div>
        <div className="w-full">
          <SlideScale />
        </div>
      </div>

      <footer className="py-8 mt-16 text-white bg-gradient-to-r from-white to-sky-700">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center gap-2 ">
              <Link href="/">
                <Image src="/logo.png" width={150} height={150} className="object-cover h-auto w-36" alt="Logo" />
              </Link>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/policies" className="hover:text-blue-200">
                policies
              </Link>
              <Link href="/cookies" className="hover:text-blue-200">
                cookies
              </Link>
              <Link href="/about" className="hover:text-blue-200">
                About Us
              </Link>
              <Link href="/certificates" className="hover:text-blue-200">
                Certificates
              </Link>
              <Link href="/contact" className="hover:text-blue-200">
                Contacts
              </Link>
            </div>
            <div className="text-sm">info@exobreeze.com</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
