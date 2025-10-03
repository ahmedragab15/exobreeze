"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Bounce } from "react-toastify";
import axiosInstance from "@/config/axios.config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function IndividualQuestionnaireSettings() {
  const router = useRouter();
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

      await axiosInstance.post("/auth/individual/step1", {
        fullName: formData.fullName,
        age: Number(formData.age),
        gender: formData.gender,
        sensitiveToWeatherOrAllergies: formData.sensitiveToWeatherOrAllergies,
      });

      await axiosInstance.post("/auth/individual/step2", {
        timeOutdoorsDaily: formData.timeOutdoorsDaily,
        publicTransport: formData.publicTransport,
        exerciseOutdoors: {
          doExercise: formData.doExercise,
          frequency: formData.frequency,
        },
      });

      await axiosInstance.post("/auth/individual/step3", {
        mainGoal: formData.mainGoal,
        healthGoals: formData.healthGoals,
        improvements: formData.improvements,
      });

      toast.success("Settings updated 🎉", { autoClose: 1000, transition: Bounce });
      setTimeout(() => router.push("/home"), 500);
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Complete all questions");
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-2xl space-y-10">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
            <Input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-11 border rounded-md px-3">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <label className="flex items-center gap-2 mt-3 text-gray-700">
            <input type="checkbox" name="sensitiveToWeatherOrAllergies" checked={formData.sensitiveToWeatherOrAllergies} onChange={handleChange} />
            Sensitive to Weather or Allergies?
          </label>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Daily Routine & Exposure</h2>
          <Input name="timeOutdoorsDaily" placeholder="Hours outdoors" value={formData.timeOutdoorsDaily} onChange={handleChange} />
          <label className="flex items-center gap-2 mt-3 text-gray-700">
            <input type="checkbox" name="publicTransport" checked={formData.publicTransport} onChange={handleChange} />
            Use Public Transport?
          </label>
          <label className="flex items-center gap-2 mt-3 text-gray-700">
            <input type="checkbox" name="doExercise" checked={formData.doExercise} onChange={handleChange} />
            Exercise Outdoors?
          </label>
          {formData.doExercise && (
            <Input name="frequency" placeholder="Frequency" value={formData.frequency} onChange={handleChange} className="mt-3" />
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Preferences & Goals</h2>
          <Input name="mainGoal" placeholder="Main Goal" value={formData.mainGoal} onChange={handleChange} />
          <Input name="healthGoals" placeholder="Health Goals" value={formData.healthGoals} onChange={handleChange} className="mt-3" />
          <Textarea
            name="improvements"
            placeholder="What would you like to improve?"
            value={formData.improvements}
            onChange={handleChange}
            className="mt-3 min-h-[100px]"
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={isLoading} className="px-8 py-3 text-white bg-blue-600 hover:bg-blue-700">
            {isLoading ? "Submitting..." : "Submit Questionnaire"}
          </Button>
        </div>
      </div>
    </div>
  );
}
