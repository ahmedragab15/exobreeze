"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import Header from "@/components/layout/Header";
import { pollutionDays, weatherDays } from "@/data/dummyDate";
import WeatherIcon from "@/components/WeatherIcon";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function DashboardPage() {
  const [selectedDay, setSelectedDay] = useState<string>("today");
  const [selectedWeatherDay, setSelectedWeatherDay] = useState<string>("today");
  const [weatherCarouselIndex, setWeatherCarouselIndex] = useState(0);
  const [pollutionCarouselIndex, setPollutionCarouselIndex] = useState(0);

  const currentDay = pollutionDays.find((day) => day.id === selectedDay) || pollutionDays[0];

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const weatherCardsPerView = isMobile ? 1 : isTablet ? 2 : isDesktop ? 4 : 1;
  const pollutionCardsPerView = isMobile ? 1 : isTablet ? 2 : isDesktop ? 4 : 1;

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(".page-header", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });

      gsap.fromTo(
        ".weather-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
      gsap.fromTo(
        ".pollution-card",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.3,
        }
      );
      gsap.fromTo(
        ".message-box",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.5)",
        }
      );
      gsap.fromTo(
        ".nav-button",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );
    },
    { scope: containerRef }
  );

  const handleWeatherCardClick = (dayId: string) => {
    setSelectedWeatherDay(dayId);
  };

  const nextWeatherCards = () => {
    if (weatherCarouselIndex < weatherDays.length - weatherCardsPerView) {
      setWeatherCarouselIndex(weatherCarouselIndex + 1);
    }
  };

  const prevWeatherCards = () => {
    if (weatherCarouselIndex > 0) {
      setWeatherCarouselIndex(weatherCarouselIndex - 1);
    }
  };

  const nextPollutionCards = () => {
    if (pollutionCarouselIndex < pollutionDays.length - pollutionCardsPerView) {
      setPollutionCarouselIndex(pollutionCarouselIndex + 1);
    }
  };

  const prevPollutionCards = () => {
    if (pollutionCarouselIndex > 0) {
      setPollutionCarouselIndex(pollutionCarouselIndex - 1);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f5f5f7]">
      <Header />
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 mt-16">
        <div className="relative mb-10 lg:mb-14 h-[450px]">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevWeatherCards}
              disabled={weatherCarouselIndex === 0}
              className="shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-md disabled:opacity-30 transition-all hover:scale-110 bg-transparent nav-button"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <div className="overflow-hidden flex-1">
              <div
                className="flex gap-3 sm:gap-5 transition-transform duration-500 ease-out items-stretch"
                style={{
                  transform: `translateX(-${weatherCarouselIndex * (100 / weatherCardsPerView)}%)`,
                }}
              >
                {weatherDays.map((day) => {
                  const isSelected = selectedWeatherDay === day.id;
                  const isToday = day.id === "today";

                  if (isSelected) {
                    return (
                      <Card
                        key={day.id}
                        onClick={() => handleWeatherCardClick(day.id)}
                        className="min-w-[calc(100%-12px)] sm:min-w-[calc(50%-10px)] lg:min-w-[calc(50%-10px)] bg-gradient-to-br from-[#6eb5e8] via-[#4a9ad8] to-[#2b7ab8] text-white p-5 sm:p-7 rounded-[20px] sm:rounded-[28px] border-0 shadow-lg cursor-pointer transition-all duration-600 ease-in-out hover:shadow-xl transform hover:scale-[1.02] weather-card h-[450px]"
                      >
                        <div className="flex justify-between items-start mb-6 sm:mb-8">
                          <div className="text-[15px] sm:text-[17px] font-medium">{day.label}</div>
                          <div className="text-[15px] sm:text-[17px] font-medium">{isToday ? "11:45 AM" : ""}</div>
                        </div>
                        <div className="flex items-start justify-between mb-8 sm:mb-10">
                          <div className="text-[56px] sm:text-[72px] font-bold leading-none">{day.temp}</div>
                          <div className="scale-75 sm:scale-100">
                            <WeatherIcon type={day.icon} />
                          </div>
                        </div>
                        <div className="space-y-2 sm:space-y-2.5 text-[13px] sm:text-[14px] transition-all duration-300 ease-in-out">
                          <div className="flex justify-between items-center">
                            <span className="text-blue-100">Real Feel</span>
                            <span className="font-semibold text-white">{day.realFeel}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-100">Wind N-E</span>
                            <span className="font-semibold text-white">{day.wind}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-100">Sunrise</span>
                            <span className="font-semibold text-white">{day.sunrise}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-100">Pressure</span>
                            <span className="font-semibold text-white">{day.pressure}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-100">Sunset</span>
                            <span className="font-semibold text-white">{day.sunset}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-100">Humidity</span>
                            <span className="font-semibold text-white">{day.humidity}</span>
                          </div>
                        </div>
                      </Card>
                    );
                  }

                  return (
                    <Card
                      key={day.id}
                      onClick={() => handleWeatherCardClick(day.id)}
                      className="min-w-[calc(100%-12px)] sm:min-w-[calc(50%-10px)] lg:min-w-[calc(25%-15px)] bg-gradient-to-b from-[#a8d5f2] to-[#7ec3ed] text-white p-4 sm:p-5 rounded-[20px] sm:rounded-[28px] border-0 shadow-md flex flex-col items-center justify-between cursor-pointer transition-all duration-600 ease-in-out hover:scale-105 hover:shadow-lg transform weather-card h-[450px]"
                    >
                      <div className="text-[14px] sm:text-[15px] font-semibold mb-2 sm:mb-3 text-white/90 uppercase tracking-wide">{day.label}</div>
                      <div className="relative flex-1 flex items-center justify-center transition-transform duration-300 scale-75 sm:scale-100">
                        <WeatherIcon type={day.icon} />
                      </div>
                      <div className="text-[36px] sm:text-[42px] font-bold leading-none mt-2 sm:mt-3">{day.temp}</div>
                    </Card>
                  );
                })}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextWeatherCards}
              disabled={weatherCarouselIndex >= weatherDays.length - weatherCardsPerView}
              className="shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-md disabled:opacity-30 transition-all hover:scale-110 nav-button"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
        </div>

        <div className="mb-8 lg:mb-10">
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-6 sm:mb-8 page-header">Day pollution forecast</h2>
          <div className="relative">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevPollutionCards}
                disabled={pollutionCarouselIndex === 0}
                className="shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-md disabled:opacity-30 transition-all hover:scale-110 bg-transparent nav-button"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
              <div className="overflow-hidden flex-1">
                <div
                  className="flex gap-3 sm:gap-6 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${pollutionCarouselIndex * (100 / pollutionCardsPerView)}%)`,
                  }}
                >
                  {pollutionDays.map((day) => (
                    <Card
                      key={day.id}
                      onClick={() => setSelectedDay(day.id)}
                      className={`min-w-[calc(100%-12px)] sm:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] bg-white p-5 sm:p-7 rounded-[20px] sm:rounded-[28px] border shadow-sm transition-all duration-300 ease-in-out cursor-pointer transform pollution-card ${
                        selectedDay === day.id
                          ? "border-gray-400 shadow-xl scale-105 ring-2 ring-gray-300"
                          : "border-gray-200 hover:shadow-md hover:scale-[1.02]"
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-2.5 mb-5 sm:mb-7">
                        <div
                          className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full ${day.color} transition-transform duration-300 ${
                            selectedDay === day.id ? "scale-125" : ""
                          }`}
                        ></div>
                        <h3 className="text-[18px] sm:text-[20px] font-semibold text-gray-900">{day.label}</h3>
                      </div>
                      <div
                        className={`space-y-3 sm:space-y-4 text-gray-900 transition-all duration-300 ease-in-out ${
                          selectedDay === day.id ? "opacity-100" : "opacity-70"
                        }`}
                      >
                        <div className="text-[15px] sm:text-[17px]">
                          NO<sub className="text-[12px] sm:text-[13px]">2</sub> :<span className="font-semibold">55.25 Mg/m³</span>
                        </div>
                        <div className="text-[15px] sm:text-[17px]">
                          SO<sub className="text-[12px] sm:text-[13px]">2</sub> :<span className="font-semibold">15.52 Mg/m³</span>
                        </div>
                        <div className="text-[15px] sm:text-[17px]">
                          PM2.5 : <span className="font-semibold">25.18 Mg/m³</span>
                        </div>
                        <div className="text-[15px] sm:text-[17px]">
                          PM10 : <span className="font-semibold">70.57 Mg/m³</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextPollutionCards}
                disabled={pollutionCarouselIndex >= pollutionDays.length - pollutionCardsPerView}
                className="shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-md disabled:opacity-30 transition-all hover:scale-110 nav-button"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </div>
          </div>
        </div>
        <div
          className={`${currentDay.bgColor} rounded-[20px] sm:rounded-[28px] p-5 sm:p-7 text-center shadow-sm transition-all duration-500 ease-in-out message-box`}
        >
          <p className="text-[16px] sm:text-[18px] lg:text-[19px] font-semibold text-gray-900 leading-relaxed transition-all duration-300">
            {currentDay.message}
          </p>
        </div>
      </main>
    </div>
  );
}
