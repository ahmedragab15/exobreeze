import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card"
import { MapPin,  Wind, ArrowRight, ChevronLeft, ChevronRight, Bus } from "lucide-react"

const Home = () => {
  const stats = [
    { value: "25000", label: "Daily Monitoring" },
    { value: "5000", label: "Active Users" },
    { value: "2500", label: "Locations Tracked" },
    { value: "15000", label: "Alerts Sent" },
  ];
  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-transparent shadow-sm backdrop-blur-sm">
        <div className="px-6 py-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/">
                <Image src="/logo.png" width={150} height={150} className="object-cover h-auto w-36" alt="Logo" />
              </Link>
              <nav className="items-center hidden gap-6 md:flex">
                <Link href="/home" className="font-medium text-blue-600">
                  Home
                </Link>
                <Link href="/map" className="text-black hover:text-foreground">
                  My map
                </Link>
                <Link href="/dashboard" className="text-black hover:text-foreground">
                  Dashboard
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/user_placeholder.png" alt="User" className="object-cover size-8" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Welcome back,</p>
                <p className="text-sm text-gray-700">Clare!</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="flex relative justify-between min-h-screen gap-12 sm:gap-20 pt-62 bg-[url('/hero_bg.png')] bg-no-repeat bg-center bg-cover bg-fixed">
        <div className="absolute -top-28 right-0 w-1/3 h-full md:bg-[url('/patterns.png')] bg-no-repeat bg-right bg-contain pointer-events-none"></div>
        {/* Hero Content */}
        <div className="flex flex-col gap-4 px-4 max-w-7xl sm:px-8 lg:px-30">
          <div className="flex items-center gap-2 text-2xl text-white">
            <MapPin className="w-5 h-5" />
            <span>New Cairo</span>
          </div>
          <h1 className="text-4xl text-white leading-[1.29167] font-medium text-balance sm:text-5xl lg:text-7xl ">
            Sunny, Very Hot
            <br />
            <span className="relative text-orange-400">
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
          <Button className="h-12 text-xl text-white bg-orange-500 white hover:bg-orange-600">Track Local Air Quality</Button>
        </div>
      </section>

      {/* Stats Section */}
      <div className="container mx-auto my-8 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-muted-foreground">ExoBreeze in Numbers</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 text-center border-0">
              <h3 className="text-3xl font-bold ">
                {stat.value}
                <span className="text-orange-500">+</span>
              </h3>
              <h4 className="text-sm text-muted-foreground">{stat.label}</h4>
            </Card>
          ))}
        </div>
      </div>

      {/* Personal Exposure Score */}
      <div className="container mx-auto my-8 space-y-4">
        <h2 className="text-2xl font-semibold">Personal exposure score</h2>
        <p className="text-muted-foreground">Your AQI exposure this week</p>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="text-white bg-sky-700">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="text-sm opacity-90">Current exposure</div>
                <div className="text-4xl font-bold">53</div>
                <div className="text-sm opacity-90">Real-time personal exposure</div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary" className="text-white bg-white/20">
                  AQI
                </Badge>
                <span>48 / 500</span>
              </div>
            </CardContent>
          </Card>
          <Card className="text-white bg-sky-700">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="text-sm opacity-90">Weekly Average AQI</div>
                <div className="text-4xl font-bold">30%</div>
                <div className="text-sm opacity-90">30% This Week</div>
                <div className="text-sm opacity-90">46% Last week</div>
              </div>
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 border-4 rounded-full border-white/30">
                  <div className="text-sm font-medium">Goal 70</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="text-white bg-sky-700">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="text-sm opacity-90">Time in Unsafe Air</div>
                <div className="text-4xl font-bold">5.8 h</div>
                <div className="text-sm opacity-90">Last 7 days</div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary" className="text-white bg-orange-500">
                  -35.24%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
              <span className="text-sm text-white">✓</span>
            </div>
            <div>
              <span className="font-medium">Great job!</span>
              <span className="ml-1 text-muted-foreground">Keep it up with short walks or cycling when AQI stays this low</span>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Air Quality Snapshots */}
      <div className="container mx-auto my-8 space-y-4">
        <h2 className="text-2xl font-semibold">Your air quality snapshots</h2>
        <p className="text-muted-foreground">Discover 2024 AQI Trend</p>
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <Link href="/location/al-azhar-park" className="md:row-span-2">
            <Card className="h-full overflow-hidden transition-shadow cursor-pointer group hover:shadow-lg">
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
            <Card className="overflow-hidden transition-shadow cursor-pointer group hover:shadow-lg">
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
            <Card className="overflow-hidden transition-shadow cursor-pointer group hover:shadow-lg">
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
      {/* Daily Eco Challenges */}
      <div className="container mx-auto my-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Daily Eco challenges</h2>
            <p className="text-muted-foreground">Small action, big impact</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="text-white bg-blue-600">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Bus className="w-8 h-8" />
                <div>
                  <div className="font-medium">Since AQI is 65 today, try public transportation!</div>
                  <div className="text-sm opacity-90">you'll be saving 1kg CO2</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="text-white bg-gradient-to-br from-blue-500 to-blue-600">
            <CardContent className="p-6">
              <div className="mb-2 text-sm opacity-90">Today means your</div>
              <div className="text-lg font-medium">air for everyone!</div>
            </CardContent>
          </Card>
          <Card className="text-white bg-gradient-to-br from-blue-600 to-blue-700">
            <CardContent className="flex items-center gap-3 p-6">
              <Wind className="w-8 h-8" />
              <div>
                <div className="font-medium">Tomorrow</div>
                <div className="text-sm opacity-90">from</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Footer */}
      <footer className="py-8 mt-16 text-white bg-blue-600">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
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
