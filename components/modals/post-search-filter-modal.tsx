"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, DollarSign, Target, CheckCircle, Sparkles } from "lucide-react"

interface PostSearchFilterModalProps {
  isOpen: boolean
  onClose: () => void
  vertical: "study-abroad" | "study-india" | "study-online"
  onComplete: (filterData: any) => void
}

export function PostSearchFilterModal({ isOpen, onClose, vertical, onComplete }: PostSearchFilterModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [filterData, setFilterData] = useState({
    // Preferences
    preferredCountries: [] as string[],
    studyLevel: "",
    fieldOfStudy: "",
    intakePreference: "",

    // Budget & Timeline
    budgetRange: "",
    timelineToStart: "",

    // Goals
    careerGoals: "",
    specificRequirements: "",
  })

  const totalSteps = 2
  const countries = [
    "USA",
    "UK",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Netherlands",
    "Ireland",
    "New Zealand",
    "Singapore",
  ]
  const studyFields = [
    "Computer Science",
    "Engineering",
    "Business Administration",
    "Medicine",
    "Law",
    "Arts & Design",
    "Sciences",
    "Social Sciences",
    "Education",
    "Other",
  ]

  const handleInputChange = (field: string, value: string | string[]) => {
    setFilterData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCountryToggle = (country: string) => {
    const currentCountries = filterData.preferredCountries
    if (currentCountries.includes(country)) {
      handleInputChange(
        "preferredCountries",
        currentCountries.filter((c) => c !== country),
      )
    } else if (currentCountries.length < 3) {
      handleInputChange("preferredCountries", [...currentCountries, country])
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    onComplete(filterData)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return filterData.preferredCountries.length > 0 && filterData.studyLevel
      case 2:
        return filterData.budgetRange && filterData.timelineToStart
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Study Preferences</h3>
              <p className="text-gray-600">Help us find your perfect match</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Preferred Countries * (Select up to 3)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {countries.map((country) => (
                    <Button
                      key={country}
                      type="button"
                      variant={filterData.preferredCountries.includes(country) ? "default" : "outline"}
                      onClick={() => handleCountryToggle(country)}
                      className="justify-start text-sm"
                      disabled={
                        !filterData.preferredCountries.includes(country) && filterData.preferredCountries.length >= 3
                      }
                    >
                      <MapPin className="w-3 h-3 mr-2" />
                      {country}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">Selected: {filterData.preferredCountries.length}/3</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Study Level *</Label>
                <Select value={filterData.studyLevel} onValueChange={(value) => handleInputChange("studyLevel", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select study level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="undergraduate">Undergraduate (Bachelor's)</SelectItem>
                    <SelectItem value="postgraduate">Postgraduate (Master's)</SelectItem>
                    <SelectItem value="phd">PhD/Doctorate</SelectItem>
                    <SelectItem value="diploma">Diploma/Certificate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Field of Study</Label>
                <Select
                  value={filterData.fieldOfStudy}
                  onValueChange={(value) => handleInputChange("fieldOfStudy", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select field of study" />
                  </SelectTrigger>
                  <SelectContent>
                    {studyFields.map((field) => (
                      <SelectItem key={field} value={field.toLowerCase().replace(/\s+/g, "-")}>
                        {field}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Preferred Intake</Label>
                <Select
                  value={filterData.intakePreference}
                  onValueChange={(value) => handleInputChange("intakePreference", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select intake preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fall-2024">Fall 2024</SelectItem>
                    <SelectItem value="spring-2025">Spring 2025</SelectItem>
                    <SelectItem value="fall-2025">Fall 2025</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Budget & Timeline</h3>
              <p className="text-gray-600">Help us find options within your budget</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Annual Budget Range *</Label>
                <Select
                  value={filterData.budgetRange}
                  onValueChange={(value) => handleInputChange("budgetRange", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-10k">Under $10,000</SelectItem>
                    <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                    <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                    <SelectItem value="50k-75k">$50,000 - $75,000</SelectItem>
                    <SelectItem value="75k-100k">$75,000 - $100,000</SelectItem>
                    <SelectItem value="above-100k">Above $100,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">When do you want to start? *</Label>
                <Select
                  value={filterData.timelineToStart}
                  onValueChange={(value) => handleInputChange("timelineToStart", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately (Next intake)</SelectItem>
                    <SelectItem value="3-months">Within 3 months</SelectItem>
                    <SelectItem value="6-months">Within 6 months</SelectItem>
                    <SelectItem value="1-year">Within 1 year</SelectItem>
                    <SelectItem value="flexible">I'm flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Career Goals</Label>
                <Input
                  placeholder="e.g., Software Engineer, Data Scientist, Business Analyst"
                  value={filterData.careerGoals}
                  onChange={(e) => handleInputChange("careerGoals", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Any Specific Requirements?</Label>
                <Input
                  placeholder="e.g., Scholarships, Part-time work, Specific location"
                  value={filterData.specificRequirements}
                  onChange={(e) => handleInputChange("specificRequirements", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-2xl">
        <DialogHeader>
          <div className="text-center mb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Perfect Match Questions
            </DialogTitle>
            <p className="text-gray-600 mt-2">Help us find your ideal universities</p>
          </div>
        </DialogHeader>

        <div className="py-4">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">{renderStep()}</CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
            >
              Skip Questions
            </Button>

            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
                >
                  Back
                </Button>
              )}

              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6"
              >
                {currentStep === totalSteps ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Find Perfect Match
                  </>
                ) : (
                  <>
                    Next Step
                    <Sparkles className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">These preferences help us show you the most relevant universities</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
