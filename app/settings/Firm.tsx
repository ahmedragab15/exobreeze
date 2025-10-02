"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Bounce } from "react-toastify";
import axiosInstance from "@/config/axios.config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FirmQuestionnaireSettings() {
  const router = useRouter();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      await axiosInstance.post("/auth/firm/step1", {
        companyName: formData.companyName,
        email: formData.email,
        location: formData.location,
        projectType: formData.projectType,
        employeesPerSite: Number(formData.employeesPerSite),
      });

      await axiosInstance.post("/auth/firm/step2", {
        airQualityAssessment: formData.airQualityAssessment,
        greenMaterials: formData.greenMaterials,
        lowPollutionInterest: formData.lowPollutionInterest,
        concernedPollutants: formData.concernedPollutants,
      });

      await axiosInstance.post("/auth/firm/step3", {
        greenSpacesPlan: formData.greenSpacesPlan,
        monthlyAQIReports: formData.monthlyAQIReports,
        certifications: formData.certifications,
        sustainabilityEfforts: formData.sustainabilityEfforts,
      });

      await axiosInstance.post("/auth/firm/submit");

      toast.success("Firm Questionnaire completed 🎉", { autoClose: 2000, transition: Bounce });
      setTimeout(() => router.push("/home"), 1500);
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

  return (
    <div className="min-h-screen ">

        <div className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <div className="p-8 bg-white shadow-lg rounded-2xl space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">Company Info</h3>
                <Input name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} />
                <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <Input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
                <Input name="projectType" placeholder="Project Type" value={formData.projectType} onChange={handleChange} />
                <Input
                  name="employeesPerSite"
                  type="number"
                  placeholder="Employees per site"
                  value={formData.employeesPerSite}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">Environmental Concerns</h3>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="airQualityAssessment" checked={formData.airQualityAssessment} onChange={handleChange} />
                  Air Quality Assessment
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="greenMaterials" checked={formData.greenMaterials} onChange={handleChange} />
                  Use of Green Materials
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="lowPollutionInterest" checked={formData.lowPollutionInterest} onChange={handleChange} />
                  Interest in Low-Pollution Solutions
                </label>
                <Input
                  name="concernedPollutants"
                  placeholder="Concerned Pollutants (e.g., NO2, PM2.5)"
                  value={formData.concernedPollutants}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">Sustainability Goals</h3>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="greenSpacesPlan" checked={formData.greenSpacesPlan} onChange={handleChange} />
                  Plan for Green Spaces
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="monthlyAQIReports" checked={formData.monthlyAQIReports} onChange={handleChange} />
                  Monthly AQI Reports
                </label>
                <Input name="certifications" placeholder="Certifications (e.g., LEED)" value={formData.certifications} onChange={handleChange} />
                <Textarea
                  name="sustainabilityEfforts"
                  placeholder="Describe your sustainability efforts"
                  value={formData.sustainabilityEfforts}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSubmit} disabled={isLoading} className="px-8 py-3 text-white bg-green-600 hover:bg-green-700">
                  {isLoading ? "Submitting..." : "Submit Questionnaire"}
                </Button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
