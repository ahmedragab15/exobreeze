"use client";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useRef } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { healthGroups, stats } from "@/data/dummyDate";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const cardsScrollRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollCards = (direction: "left" | "right") => {
    if (cardsScrollRef.current) {
      const scrollAmount = 440;
      const newScrollLeft =
        direction === "left" ? cardsScrollRef.current.scrollLeft - scrollAmount : cardsScrollRef.current.scrollLeft + scrollAmount;
      cardsScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const checkCardsScroll = () => {
    if (cardsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = cardsScrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
            <p className="font-semibold text-sm text-foreground">{data.label}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Amount: <span className="font-bold text-foreground">{data.amount}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  useGSAP(() => {
    const heroContent = heroRef.current?.querySelectorAll(".hero-content > *") || [];
    gsap.fromTo(heroContent, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" });
    gsap.fromTo(".hero-underline", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power2.out", delay: 0.5 });

    const statCards = statsRef.current?.querySelectorAll(".stat-card") || [];
    gsap.fromTo(
      statCards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );

    const carouselCards = carouselRef.current?.querySelectorAll(".carousel-card") || [];
    gsap.fromTo(
      carouselCards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );

    const communityContent = communityRef.current?.querySelectorAll("h2, p, button, .pie-chart") || [];
    gsap.fromTo(
      communityContent,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: communityRef.current,
          start: "top 85%",
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
        <div className="flex flex-col gap-4 px-4 max-w-7xl sm:px-8 lg:px-30 hero-content">
          <div className="flex items-center gap-2 text-3xl text-white">
            <MapPin className="w-5 h-5" />
            <span>New Cairo</span>
          </div>
          <h1 className="text-4xl text-white leading-[1.29167] font-medium sm:text-5xl lg:text-8xl">
            Sunny, Very Hot <br />
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
                  stroke="url(#paint0_linear)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="paint0_linear" x1="18.85" y1="3.72" x2="42.64" y2="66.63" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--primary)" />
                    <stop offset="1" stopColor="var(--primary-foreground)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
          <p className="text-white/90 max-w-84">Use public transport or car-share today to help lower emissions</p>
          <Button className="h-12 text-xl text-white bg-orange hover:bg-orange-600">Track Local Air Quality</Button>
        </div>
      </section>

      <div ref={statsRef} className="container mx-auto my-8 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-muted-foreground">ExoBreeze in Numbers</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 text-center border-0 stat-card">
              <h3 className="text-3xl font-bold">
                {stat.value}
                <span className="text-orange">+</span>
              </h3>
              <h4 className="text-sm text-muted-foreground">{stat.label}</h4>
            </Card>
          ))}
        </div>
      </div>

      <section ref={carouselRef} className="container mx-auto py-12 px-8">
        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => scrollCards("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-3 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scrollCards("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-3 shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          )}

          <div ref={cardsScrollRef} onScroll={checkCardsScroll} className="overflow-hidden scrollbar-hide snap-x snap-mandatory px-8">
            <div className="flex gap-6 pb-4">
              {["schools", "elderly_homes", "hospitals"].map((img, i) => (
                <div
                  key={i}
                  className="carousel-card relative h-96 w-full md:w-[400px] flex-shrink-0 snap-center rounded-2xl overflow-hidden group cursor-pointer bg-gradient-to-br from-blue-400 to-blue-500"
                >
                  <Image src={`/${img}.webp`} alt={img} width={400} height={300} className="absolute inset-0 w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-semibold mb-2 capitalize">{img.replace("_", " ")}</h3>
                    <Link href="#" className="text-[#FF6B4A] flex items-center gap-2 hover:gap-3 transition-all">
                      Search sites
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={communityRef} className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-foreground mb-3">Community health impact</h2>
        <p className="text-muted-foreground mb-8">
          See how{" "}
          <Link href="#" className="text-[#4A90E2] underline">
            these locations
          </Link>{" "}
          affect local communities
        </p>
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-6">Groups that will be affected</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" className="bg-[#A5D4FF] hover:bg-[#8CAFFF] text-[#1E3A8A] font-medium px-6 py-5 rounded-lg">
              <Image src="/icons/children.webp" alt="children" width={17} height={17} className="mr-2" />
              Children
            </Button>
            <Button variant="secondary" className="bg-[#A5D4FF] hover:bg-[#8CAFFF] text-[#1E3A8A] font-medium px-6 py-5 rounded-lg">
              <Image src="/icons/pregnant_women.webp" alt="pregnant women" width={17} height={17} className="mr-2" />
              Pregnant women
            </Button>
            <Button variant="secondary" className="bg-[#A5D4FF] hover:bg-[#8CAFFF] text-[#1E3A8A] font-medium px-6 py-5 rounded-lg">
              <Image src="/icons/elderly_people.webp" alt="elderly people" width={17} height={17} className="mr-2" />
              Elderly People
            </Button>
            <Button variant="secondary" className="bg-[#A5D4FF] hover:bg-[#8CAFFF] text-[#1E3A8A] font-medium px-6 py-5 rounded-lg">
              <Image src="/icons/heart_patients.webp" alt="heart patients" width={17} height={17} className="mr-2" />
              Heart Patients
            </Button>
            <Button variant="secondary" className="bg-[#A5D4FF] hover:bg-[#8CAFFF] text-[#1E3A8A] font-medium px-6 py-5 rounded-lg">
              <Image src="/icons/outdoor_workers.webp" alt="outdoor workers" width={17} height={17} className="mr-2" />
              Outdoor Workers
            </Button>
            <Button variant="secondary" className="bg-[#A5D4FF] hover:bg-[#8CAFFF] text-[#1E3A8A] font-medium px-6 py-5 rounded-lg">
              <Image src="/icons/respiratory_patients.webp" alt="respiratory patients" width={17} height={17} className="mr-2" />
              Respiratory Patients
            </Button>
            <Button variant="secondary" className="bg-[#A5D4FF] hover:bg-[#8CAFFF] text-[#1E3A8A] font-medium px-6 py-5 rounded-lg">
              <Image src="/icons/athletes.webp" alt="athletes" width={17} height={17} className="mr-2" />
              Athletes
            </Button>
            <Button variant="secondary" className="bg-[#A5D4FF] hover:bg-[#8CAFFF] text-[#1E3A8A] font-medium px-6 py-5 rounded-lg">
              <Image src="/icons/low_immunity.webp" alt="low_immunity" width={17} height={17} className="mr-2" />
              Low Immunity
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
              <div className="font-semibold text-muted-foreground mb-2">Label</div>
              <div className="font-semibold text-muted-foreground mb-2">Amount</div>
              {healthGroups.map((group, index) => (
                <>
                  <div key={`label-${index}`} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: group.color }} />
                    <span className="text-foreground">{group.label}</span>
                  </div>
                  <div key={`amount-${index}`} className="font-semibold text-foreground">
                    {group.amount}
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="pie-chart flex justify-center">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie data={healthGroups} cx="50%" cy="50%" innerRadius={60} outerRadius={140} paddingAngle={2} dataKey="value">
                  {healthGroups.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <footer className="py-8 mt-16 text-white bg-gradient-to-r from-white to-sky-700">
        <div className="px-6 mx-auto max-w-7xl flex justify-between">
          <Image src="/logo.png" width={150} height={150} className="object-cover w-36" alt="Logo" />
          <div className="flex gap-6 text-sm">
            <Link href="/policies">policies</Link>
            <Link href="/cookies">cookies</Link>
            <Link href="/about">About Us</Link>
            <Link href="/certificates">Certificates</Link>
            <Link href="/contact">Contacts</Link>
          </div>
          <div className="text-sm">info@exobreeze.com</div>
        </div>
      </footer>
    </>
  );
}
