"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Bounce } from "react-toastify";
import axiosInstance from "@/config/axios.config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Headphones } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getCookie, setCookie } from "cookies-next";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const steps = [
  {
    id: 1,
    title: "Personal Details",
    description: "Help us tailor your air-quality tips.",
  },
  {
    id: 2,
    title: "Daily Routine & Exposure",
    description: "Understand when and where you're exposed most.",
  },
  {
    id: 3,
    title: "Preferences & Goals",
    description: "Set your notifications and wellness targets.",
  },
];

export default function IndividualQuestionnaire() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "male",
    sensitiveToWeatherOrAllergies: false,
    timeOutdoorsDaily: "",
    publicTransport: false,
    doExercise: false,
    frequency: "",
    mainGoal: "",
    healthGoals: "",
    improvements: "",
  });

  useGSAP(() => {
    gsap.from(".sidebar", {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".step-content", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.from(".step-indicator", {
      scale: 0.5,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.7)",
    });
  }, [currentStep]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleSubmitStep = async () => {
    try {
      setIsLoading(true);

      if (currentStep === 1) {
        await axiosInstance.post("/auth/individual/step1", {
          fullName: formData.fullName,
          age: Number(formData.age),
          gender: formData.gender,
          sensitiveToWeatherOrAllergies: formData.sensitiveToWeatherOrAllergies,
        });

        toast.success("Step 1 completed ✅", { transition: Bounce });
        setCurrentStep(2);
      }

      if (currentStep === 2) {
        await axiosInstance.post("/auth/individual/step2", {
          timeOutdoorsDaily: formData.timeOutdoorsDaily,
          publicTransport: formData.publicTransport,
          exerciseOutdoors: {
            doExercise: formData.doExercise,
            frequency: formData.frequency,
          },
        });

        toast.success("Step 2 completed ✅", { transition: Bounce });
        setCurrentStep(3);
      }

      if (currentStep === 3) {
        await axiosInstance.post("/auth/individual/step3", {
          mainGoal: formData.mainGoal,
          healthGoals: formData.healthGoals,
          improvements: formData.improvements,
        });

        await axiosInstance.post("/auth/individual/submit");

        const userCookie = JSON.parse(getCookie("user") as string);
        const updatedUser = { ...userCookie, hasCompletedQuestionnaire: true, isIndividual: true };
        setCookie("user", JSON.stringify(updatedUser), { maxAge: 60 * 60 * 24 * 30 });

        toast.success("Questionnaire completed 🎉", { autoClose: 1000, transition: Bounce });
        setTimeout(() => router.replace("/home"), 500);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong ❌");
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Personal details</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="h-12" />
              <Input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} className="h-12" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-12 border border-gray-300 rounded-lg">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-gray-700">
              <input type="checkbox" name="sensitiveToWeatherOrAllergies" checked={formData.sensitiveToWeatherOrAllergies} onChange={handleChange} />
              Sensitive to Weather or Allergies?
            </label>
          </div>
        );

      case 2:
        return (
          <div className="step-content space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Daily routine & exposure</h2>
            <Input
              name="timeOutdoorsDaily"
              placeholder="Hours outdoors"
              value={formData.timeOutdoorsDaily}
              onChange={handleChange}
              className="h-12"
            />
            <label className="flex items-center gap-2 text-gray-700">
              <input type="checkbox" name="publicTransport" checked={formData.publicTransport} onChange={handleChange} />
              Use Public Transport?
            </label>
            <label className="flex items-center gap-2 text-gray-700">
              <input type="checkbox" name="doExercise" checked={formData.doExercise} onChange={handleChange} />
              Exercise Outdoors?
            </label>
            {formData.doExercise && (
              <Input name="frequency" placeholder="Frequency" value={formData.frequency} onChange={handleChange} className="h-12" />
            )}
          </div>
        );

      case 3:
        return (
          <div className="step-content space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Preferences & goals</h2>
            <Input name="mainGoal" placeholder="Main Goal" value={formData.mainGoal} onChange={handleChange} className="h-12" />
            <Input name="healthGoals" placeholder="Health Goals" value={formData.healthGoals} onChange={handleChange} className="h-12" />
            <Textarea
              name="improvements"
              placeholder="What would you like to improve?"
              value={formData.improvements}
              onChange={handleChange}
              className="min-h-[100px]"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-orange-50">
      <div className="flex">
        <div className="sidebar min-h-screen p-6 w-80 bg-gradient-to-b from-blue-300 via-blue-100 to-orange-300">
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <Link href="/">
                <Image src="/logo.png" width={150} height={150} alt="Logo" />
              </Link>
            </div>
            <div className="flex-1 space-y-6">
              {steps.map((step, index) => (
                <div key={step.id} className="relative flex items-start gap-4 step-indicator">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${
                      currentStep === step.id
                        ? "bg-blue-600 text-white"
                        : currentStep > step.id
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-500"
                    }`}
                  >
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${currentStep === step.id ? "text-gray-900" : "text-gray-600"}`}>{step.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && <div className="absolute left-10 mt-8 w-0.5 h-6 bg-blue-300" />}
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-white/40 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="mb-1 font-semibold text-gray-900">Need help?</h4>
                  <p className="text-sm text-gray-700">Chat with support</p>
                </div>
                <Button size="sm" className="w-10 h-10 p-0 text-gray-700 bg-white rounded-lg hover:bg-gray-50">
                  <Headphones className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            <div className="p-8 bg-white shadow-lg rounded-2xl">
              {renderStepContent()}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <Button onClick={() => setCurrentStep((prev) => prev - 1)} variant="outline" className="px-8 py-3 text-gray-700 border-gray-300">
                    Back
                  </Button>
                )}
                <Button onClick={handleSubmitStep} disabled={isLoading} className="px-8 py-3 ml-auto text-white bg-blue-600 hover:bg-blue-700">
                  {isLoading ? "Loading..." : currentStep === 3 ? "Submit" : "Continue"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
