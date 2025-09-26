"use client";
import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Headphones } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Personal Details",
    description: "Help us tailor your air-quality tips.",
    active: true,
  },
  {
    id: 2,
    title: "Daily Routine & Exposure",
    description: "Understand when and where you're exposed most.",
    active: false,
  },
  {
    id: 3,
    title: "Preferences & Goals",
    description: "Set your notifications and wellness targets.",
    active: false,
  },
];

export default function IndividualQuestionnairePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    fullName: "",
    email: "",
    age: "",
    city: "",
    respiratoryConditions: "",

    // Step 2: Daily Routine & Exposure
    workLocation: "",
    commuteMethod: "",
    exerciseFrequency: "",
    outdoorActivities: "",

    // Step 3: Preferences & Goals
    notificationPreference: "",
    healthGoals: "",
    alertSensitivity: "",
  });

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.email && formData.age && formData.city && formData.respiratoryConditions;
      case 2:
        return formData.workLocation && formData.commuteMethod && formData.exerciseFrequency && formData.outdoorActivities;
      case 3:
        return formData.notificationPreference && formData.alertSensitivity && formData.healthGoals;
      default:
        return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleContinue = () => {
    if (!validateCurrentStep()) {
      alert("Please fill in all required fields before continuing.");
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Individual questionnaire completed:", formData);
      localStorage.setItem("userType", "individual");
      localStorage.setItem("questionnaireData", JSON.stringify(formData));
      router.push("/home");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Personal details</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Full name<span className="text-red-500">*</span>
                </label>
                <Input
                  name="fullName"
                  placeholder="Exp. John Carter"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email<span className="text-red-500">*</span>
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Age<span className="text-red-500">*</span>
                </label>
                <Input
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  City<span className="text-red-500">*</span>
                </label>
                <Input
                  name="city"
                  placeholder="Enter city or neighborhood"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Do you have any respiratory conditions (e.g., asthma)?<span className="text-red-500">*</span>
              </label>
              <Textarea
                name="respiratoryConditions"
                placeholder="If none please enter NA"
                value={formData.respiratoryConditions}
                onChange={handleInputChange}
                className="min-h-[100px] border-gray-300 rounded-lg resize-none"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Daily routine & exposure</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Primary work location<span className="text-red-500">*</span>
                </label>
                <Input
                  name="workLocation"
                  placeholder="e.g., Office, Home, Outdoor"
                  value={formData.workLocation}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Commute method<span className="text-red-500">*</span>
                </label>
                <Input
                  name="commuteMethod"
                  placeholder="e.g., Car, Public transport, Walking"
                  value={formData.commuteMethod}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Exercise frequency<span className="text-red-500">*</span>
                </label>
                <Input
                  name="exerciseFrequency"
                  placeholder="e.g., Daily, 3x per week, Rarely"
                  value={formData.exerciseFrequency}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Outdoor activities<span className="text-red-500">*</span>
                </label>
                <Input
                  name="outdoorActivities"
                  placeholder="e.g., Running, Cycling, Gardening"
                  value={formData.outdoorActivities}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Preferences & goals</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Notification preference<span className="text-red-500">*</span>
                </label>
                <Input
                  name="notificationPreference"
                  placeholder="e.g., Push, Email, SMS"
                  value={formData.notificationPreference}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Alert sensitivity<span className="text-red-500">*</span>
                </label>
                <Input
                  name="alertSensitivity"
                  placeholder="e.g., High, Medium, Low"
                  value={formData.alertSensitivity}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Health goals<span className="text-red-500">*</span>
              </label>
              <Textarea
                name="healthGoals"
                placeholder="What are your main health and wellness goals?"
                value={formData.healthGoals}
                onChange={handleInputChange}
                className="min-h-[100px] border-gray-300 rounded-lg resize-none"
                required
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-orange-50">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="min-h-screen p-6 w-80 bg-gradient-to-b from-blue-300 via-blue-100 to-orange-300">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="mb-8">
              <Link href="/">
                <Image src="/logo.png" width={150} height={150} className="object-cover h-auto w-36" alt="Logo" />
              </Link>
            </div>
            {/* Steps */}
            <div className="flex-1 space-y-6">
              {steps.map((step, index) => (
                <div key={step.id} className="relative flex items-start gap-4">
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

            <div className="">
              <div className="flex items-center justify-between gap-2 p-4 rounded-lg">
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">Need a help?</h4>
                  <p className="mb-3 text-sm text-gray-700">chat with live support</p>
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
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="px-8 py-3 text-gray-700 bg-transparent border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </Button>
                )}
                <Button onClick={handleContinue} className="px-8 py-3 ml-auto text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  {currentStep === 3 ? "Complete" : "Continue"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
