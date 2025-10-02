import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";
import ProgressColor from "@/components/Progress";
import CircularProgressColor from "@/components/CircularProgress";
import SlideScale from "@/components/CarouselSlideScale";
import { stats } from "@/data/dummyDate";
import Header from "@/components/layout/Header";

const Home = () => {
  return (
    <>
      <Header />
      <section className="flex relative justify-between min-h-screen gap-12 sm:gap-20 pt-62 bg-[url('/hero_bg.png')] bg-no-repeat bg-center bg-cover bg-fixed">
        <div className="absolute -top-28 right-0 w-1/3 h-full md:bg-[url('/patterns.png')] bg-no-repeat bg-right bg-contain pointer-events-none"></div>
        <div className="flex flex-col gap-4 px-4 max-w-7xl sm:px-8 lg:px-30">
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
                className="absolute inset-x-0 bottom-0 w-full translate-y-1/2 max-sm:hidden"
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

      <div className="container mx-auto my-8 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-muted-foreground">ExoBreeze in Numbers</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 text-center border-0 gap-0">
              <h3 className="text-3xl font-bold ">
                {stat.value}
                <span className="text-orange">+</span>
              </h3>
              <h4 className="text-sm text-muted-foreground">{stat.label}</h4>
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto my-8 space-y-4">
        <h2 className="text-2xl font-semibold">Personal exposure score</h2>
        <p className="text-muted-foreground">Your AQI exposure this week</p>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="text-white bg-sky-700">
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
          <Card className="text-white bg-sky-700">
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
          <Card className="text-white bg-sky-700">
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
        <Card className="border-blue-200 bg-blue-300 p-2">
          <CardContent className="flex items-center gap-3 p-4">
            <Image src="/icons/heart.png" alt="heart" width={40} height={40} />
            <div className="text-lg">
              <span className="font-bold">Great job!</span>
              <span className="ml-1">Keep it up with short walks or cycling when AQI stays this low</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="container mx-auto my-8 space-y-4">
        <h2 className="text-3xl font-semibold">Your air quality snapshots</h2>
        <p className="text-muted-foreground">Favorites Quick AQI View</p>
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <Link href="/location/al-azhar-park" className="md:row-span-2">
            <Card className="h-full overflow-hidden transition-shadow cursor-pointer group hover:shadow-lg py-0">
              <div className="relative h-48 md:h-full bg-gradient-to-br from-blue-400 to-blue-500">
                <div className="absolute inset-0 bg-[url('/al-azhar-park-with-trees-and-greenery.jpg')] bg-cover bg-center opacity-80" />
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
          <Link href="/location/family-park" className="md:col-span-2">
            <Card className="overflow-hidden transition-shadow cursor-pointer group hover:shadow-lg py-0">
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-500">
                <div className="absolute inset-0 bg-[url('/family-park-with-lake-and-palm-trees.jpg')] bg-cover bg-center opacity-80" />
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
          <Link href="/location/alexandria-corniche" className="md:col-span-2">
            <Card className="overflow-hidden transition-shadow cursor-pointer group hover:shadow-lg py-0">
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-500">
                <div className="absolute inset-0 bg-[url('/alexandria-corniche-waterfront-with-buildings.jpg')] bg-cover bg-center opacity-80" />
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
      <div className="container mx-auto my-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
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
