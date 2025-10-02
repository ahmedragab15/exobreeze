"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast, Bounce } from "react-toastify";
import axiosInstance from "@/config/axios.config";
import { getCookie, setCookie } from "cookies-next";

const steps = [
  { id: 1, title: "Company Info", description: "Key details about your company." },
  { id: 2, title: "Environmental Concerns", description: "Your current practices & challenges." },
  { id: 3, title: "Sustainability Goals", description: "Your future environmental efforts." },
];

export default function ConstructionQuestionnairePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    location: "",
    projectType: "",
    employeesPerSite: "",
    airQualityAssessment: false,
    greenMaterials: false,
    lowPollutionInterest: false,
    concernedPollutants: "",
    greenSpacesPlan: false,
    monthlyAQIReports: false,
    certifications: "",
    sustainabilityEfforts: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCheckbox = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmitStep = async () => {
    try {
      setIsLoading(true);
      const storedUser = localStorage.getItem("user");
      const token = storedUser ? JSON.parse(storedUser).token : null;

      if (!token) {
        toast.error("You must be logged in first!");
        return;
      }

      if (currentStep === 1) {
        await axiosInstance.post(
          "/auth/firm/step1",
          {
            companyName: formData.companyName,
            email: formData.email,
            location: formData.location,
            projectType: formData.projectType,
            employeesPerSite: Number(formData.employeesPerSite),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Step 1 completed ✅", { transition: Bounce });
        setCurrentStep(2);
      }

      if (currentStep === 2) {
        await axiosInstance.post(
          "/auth/firm/step2",
          {
            airQualityAssessment: formData.airQualityAssessment,
            greenMaterials: formData.greenMaterials,
            lowPollutionInterest: formData.lowPollutionInterest,
            concernedPollutants: formData.concernedPollutants,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Step 2 completed ✅", { transition: Bounce });
        setCurrentStep(3);
      }

      if (currentStep === 3) {
        await axiosInstance.post(
          "/auth/firm/step3",
          {
            greenSpacesPlan: formData.greenSpacesPlan,
            monthlyAQIReports: formData.monthlyAQIReports,
            certifications: formData.certifications,
            sustainabilityEfforts: formData.sustainabilityEfforts,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        await axiosInstance.post("/auth/firm/submit");

        const userCookie = JSON.parse(getCookie("user") as string);
        const updatedUser = { ...userCookie, hasCompletedQuestionnaire: true };
        setCookie("user", JSON.stringify(updatedUser), { maxAge: 60 * 60 * 24 * 30 });

        toast.success("Questionnaire completed 🎉", { autoClose: 2000, transition: Bounce });
        setTimeout(() => router.replace("/home"), 1500);
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
          <div className="space-y-4">
            <Input placeholder="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
            <Input placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
            <Input placeholder="Location" name="location" value={formData.location} onChange={handleChange} />
            <Input placeholder="Project Type" name="projectType" value={formData.projectType} onChange={handleChange} />
            <Input type="number" placeholder="Employees per Site" name="employeesPerSite" value={formData.employeesPerSite} onChange={handleChange} />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <Checkbox checked={formData.airQualityAssessment} onCheckedChange={(val) => handleCheckbox("airQualityAssessment", Boolean(val))} />
              Air Quality Assessment
            </label>
            <label className="flex items-center gap-2">
              <Checkbox checked={formData.greenMaterials} onCheckedChange={(val) => handleCheckbox("greenMaterials", Boolean(val))} />
              Use of Green Materials
            </label>
            <label className="flex items-center gap-2">
              <Checkbox checked={formData.lowPollutionInterest} onCheckedChange={(val) => handleCheckbox("lowPollutionInterest", Boolean(val))} />
              Interest in Low-Pollution Projects
            </label>
            <Textarea
              placeholder="Concerned Pollutants (e.g., NO2, PM2.5)"
              name="concernedPollutants"
              value={formData.concernedPollutants}
              onChange={handleChange}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <Checkbox checked={formData.greenSpacesPlan} onCheckedChange={(val) => handleCheckbox("greenSpacesPlan", Boolean(val))} />
              Plan for Green Spaces
            </label>
            <label className="flex items-center gap-2">
              <Checkbox checked={formData.monthlyAQIReports} onCheckedChange={(val) => handleCheckbox("monthlyAQIReports", Boolean(val))} />
              Receive Monthly AQI Reports
            </label>
            <Input placeholder="Certifications (e.g., LEED)" name="certifications" value={formData.certifications} onChange={handleChange} />
            <Textarea
              placeholder="Sustainability Efforts (e.g., install solar panels)"
              name="sustainabilityEfforts"
              value={formData.sustainabilityEfforts}
              onChange={handleChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-80 p-6 bg-gradient-to-b from-blue-200 via-blue-100 to-orange-100">
        <div className="mb-8">
          <Link href="/">
            <Image src="/logo.png" width={150} height={150} className="object-cover h-auto w-36" alt="Logo" />
          </Link>
        </div>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${
                  currentStep === step.id ? "bg-blue-600 text-white" : currentStep > step.id ? "bg-green-500 text-white" : "bg-white text-gray-500"
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
      </div>

      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          {renderStepContent()}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button onClick={() => setCurrentStep((prev) => prev - 1)} variant="outline">
                Back
              </Button>
            )}
            <Button onClick={handleSubmitStep} disabled={isLoading} className="ml-auto">
              {isLoading ? "Loading..." : currentStep === 3 ? "Submit" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
