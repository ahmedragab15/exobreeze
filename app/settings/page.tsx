"use client";
import { useState } from "react";
import FirmSettings from "./Firm";
import IndividualSettings from "./Individual";
import { toast, Bounce } from "react-toastify";
import axiosInstance from "@/config/axios.config";
import Header from "@/components/layout/Header";

export default function SettingsPage() {
  const [selectedType, setSelectedType] = useState<"firm" | "individual">("individual");
  const [isLoading, setIsLoading] = useState(false);

  const handleSwitch = async (type: "firm" | "individual") => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.put("/auth/user/type", { type });

      if (res.status >= 200 && res.status < 300) {
        toast.success(`Switched to ${type}`, {
          position: "top-right",
          autoClose: 2000,
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
      <div className="p-8 space-y-6 mt-16">
        <div className="relative flex w-fit rounded-full bg-gray-200 p-1 mx-auto">
          <button
            onClick={() => handleSwitch("individual")}
            disabled={isLoading}
            className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300
         ${selectedType === "individual" ? "text-white" : "text-gray-600"}
       `}
          >
            Individual
          </button>
          <button
            onClick={() => handleSwitch("firm")}
            disabled={isLoading}
            className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300
         ${selectedType === "firm" ? "text-white" : "text-gray-600"}
       `}
          >
            Firm
          </button>

          <span
            className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-blue-600 transition-all duration-300 ${
              selectedType === "individual" ? "left-1" : "left-1/2"
            }`}
          />
        </div>

        {selectedType === "firm" ? <FirmSettings /> : <IndividualSettings />}
      </div>
    </>
  );
}
