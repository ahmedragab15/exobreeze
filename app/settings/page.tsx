"use client";
import { useState, useRef } from "react";
import FirmSettings from "./Firm";
import IndividualSettings from "./Individual";
import { toast, Bounce } from "react-toastify";
import axiosInstance from "@/config/axios.config";
import Header from "@/components/layout/Header";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getCookie, setCookie } from "cookies-next";

export default function SettingsPage() {
  const [selectedType, setSelectedType] = useState<"firm" | "individual">("individual");
  const [isLoading, setIsLoading] = useState(false);

  const toggleRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(toggleRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
      })
        .to(
          indicatorRef.current,
          {
            x: selectedType === "individual" ? 0 : "100%",
            duration: 0.4,
            ease: "power3.inOut",
          },
          "<"
        )
        .fromTo(contentRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.5");
    },
    { dependencies: [selectedType] }
  );

  const handleSwitch = async (type: "firm" | "individual") => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.put("/auth/user/type", { type });

      if (res.status >= 200 && res.status < 300) {
        const userCookie = JSON.parse(getCookie("user") as string);
        const updatedUser = {
          ...userCookie,
          isIndividual: type === "individual",
        };
        setCookie("user", JSON.stringify(updatedUser), { maxAge: 60 * 60 * 24 * 30 });

        toast.success(`Switched to ${type}`, {
          position: "top-right",
          autoClose: 500,
          theme: "light",
          transition: Bounce,
        });
        setSelectedType(type);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="p-8 space-y-6 mt-16 ">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">Switch between Firm and Individual</h2>
        <div ref={toggleRef} className="relative flex w-fit rounded-full bg-gray-200 p-1 mx-auto overflow-hidden">
          <button
            onClick={() => handleSwitch("individual")}
            disabled={isLoading}
            className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              selectedType === "individual" ? "text-white" : "text-gray-600"
            }`}
          >
            Individual
          </button>
          <button
            onClick={() => handleSwitch("firm")}
            disabled={isLoading}
            className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              selectedType === "firm" ? "text-white" : "text-gray-600"
            }`}
          >
            Firm
          </button>
          <span ref={indicatorRef} className="absolute top-1 bottom-1 w-1/2 rounded-full bg-blue-600" />
        </div>
        <div ref={contentRef}>{selectedType === "firm" ? <FirmSettings /> : <IndividualSettings />}</div>
      </div>
    </>
  );
}
