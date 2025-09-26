"use client"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Headphones } from "lucide-react"
import Image from "next/image"

const steps = [
  {
    id: 1,
    title: "Company info",
    description: "Key details about your projects.",
    active: true,
  },
  {
    id: 2,
    title: "Environmental Concerns",
    description: "Share your current practices and challenges.",
    active: false,
  },
  {
    id: 3,
    title: "Sustainability Goals",
    description: "Plan for greener, healthier developments.",
    active: false,
  },
]

export default function ConstructionQuestionnairePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Company info
    companyName: "",
    email: "",
    location: "",
    projectTypes: "",
    employeeCount: "",

    // Step 2: Environmental Concerns
    currentPractices: "",
    mainChallenges: "",
    airQualityAwareness: "",
    complianceRequirements: "",

    // Step 3: Sustainability Goals
    sustainabilityGoals: "",
    budgetAllocation: "",
    timeframe: "",
    successMetrics: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.companyName && formData.email && formData.location && formData.projectTypes && formData.employeeCount
        )
      case 2:
        return (
          formData.currentPractices &&
          formData.mainChallenges &&
          formData.airQualityAwareness &&
          formData.complianceRequirements
        )
      case 3:
        return (
          formData.sustainabilityGoals && formData.budgetAllocation && formData.timeframe && formData.successMetrics
        )
      default:
        return false
    }
  }

  const handleContinue = () => {
    if (!validateCurrentStep()) {
      alert("Please fill in all required fields before continuing.")
      return
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      console.log("Construction questionnaire completed:", formData)
      localStorage.setItem("userType", "construction")
      localStorage.setItem("questionnaireData", JSON.stringify(formData))
      router.push("/home")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Company info</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Company Name<span className="text-red-500">*</span>
                </label>
                <Input
                  name="companyName"
                  placeholder="Exp. John Carter"
                  value={formData.companyName}
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
                  placeholder="Enter your company's email"
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
                  Location<span className="text-red-500">*</span>
                </label>
                <Input
                  name="location"
                  placeholder="Enter your company's location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Type of projects<span className="text-red-500">*</span>
                </label>
                <Input
                  name="projectTypes"
                  placeholder="Commercial / Hospital / School"
                  value={formData.projectTypes}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Approximate number of employees working on each project site<span className="text-red-500">*</span>
              </label>
              <Select onValueChange={(value) => handleSelectChange("employeeCount", value)}>
                <SelectTrigger className="h-12 border-gray-300 rounded-lg">
                  <SelectValue placeholder="Select employee count range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-25">11-25 employees</SelectItem>
                  <SelectItem value="26-50">26-50 employees</SelectItem>
                  <SelectItem value="51-100">51-100 employees</SelectItem>
                  <SelectItem value="100+">100+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Environmental concerns</h2>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Current environmental practices<span className="text-red-500">*</span>
              </label>
              <Textarea
                name="currentPractices"
                placeholder="Describe your current environmental practices and initiatives"
                value={formData.currentPractices}
                onChange={handleInputChange}
                className="min-h-[100px] border-gray-300 rounded-lg resize-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Main environmental challenges<span className="text-red-500">*</span>
              </label>
              <Textarea
                name="mainChallenges"
                placeholder="What are the biggest environmental challenges you face in your projects?"
                value={formData.mainChallenges}
                onChange={handleInputChange}
                className="min-h-[100px] border-gray-300 rounded-lg resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Air quality awareness level<span className="text-red-500">*</span>
                </label>
                <Select onValueChange={(value) => handleSelectChange("airQualityAwareness", value)}>
                  <SelectTrigger className="h-12 border-gray-300 rounded-lg">
                    <SelectValue placeholder="Select awareness level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High - We actively monitor</SelectItem>
                    <SelectItem value="medium">Medium - We're somewhat aware</SelectItem>
                    <SelectItem value="low">Low - We need more information</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Compliance requirements<span className="text-red-500">*</span>
                </label>
                <Input
                  name="complianceRequirements"
                  placeholder="e.g., EPA, OSHA, Local regulations"
                  value={formData.complianceRequirements}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Sustainability goals</h2>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Sustainability goals<span className="text-red-500">*</span>
              </label>
              <Textarea
                name="sustainabilityGoals"
                placeholder="What are your company's sustainability and environmental goals?"
                value={formData.sustainabilityGoals}
                onChange={handleInputChange}
                className="min-h-[100px] border-gray-300 rounded-lg resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Budget allocation for sustainability<span className="text-red-500">*</span>
                </label>
                <Select onValueChange={(value) => handleSelectChange("budgetAllocation", value)}>
                  <SelectTrigger className="h-12 border-gray-300 rounded-lg">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-5">Under 5% of project budget</SelectItem>
                    <SelectItem value="5-10">5-10% of project budget</SelectItem>
                    <SelectItem value="10-20">10-20% of project budget</SelectItem>
                    <SelectItem value="over-20">Over 20% of project budget</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Implementation timeframe<span className="text-red-500">*</span>
                </label>
                <Select onValueChange={(value) => handleSelectChange("timeframe", value)}>
                  <SelectTrigger className="h-12 border-gray-300 rounded-lg">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (0-6 months)</SelectItem>
                    <SelectItem value="short-term">Short-term (6-12 months)</SelectItem>
                    <SelectItem value="medium-term">Medium-term (1-2 years)</SelectItem>
                    <SelectItem value="long-term">Long-term (2+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Success metrics<span className="text-red-500">*</span>
              </label>
              <Textarea
                name="successMetrics"
                placeholder="How will you measure the success of your sustainability initiatives?"
                value={formData.successMetrics}
                onChange={handleInputChange}
                className="min-h-[100px] border-gray-300 rounded-lg resize-none"
                required
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-orange-50">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="min-h-screen p-6 w-80 bg-gradient-to-b from-blue-200 via-blue-100 to-orange-100">
          {/* Header */}
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
          <div className="pt-12 mt-auto">
            <div className="p-4 rounded-lg bg-gradient-to-r from-orange-200 to-pink-200">
              <h4 className="mb-2 font-semibold text-gray-900">Need a help?</h4>
              <p className="mb-3 text-sm text-gray-700">chat with live support</p>
              <Button size="sm" className="w-10 h-10 p-0 text-gray-700 bg-white rounded-full hover:bg-gray-50">
                <Headphones className="w-4 h-4" />
              </Button>
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
