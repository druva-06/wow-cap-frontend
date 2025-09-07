"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, Monitor, User, Phone, Clock, Briefcase, Calendar, DollarSign } from "lucide-react"
import { PostSearchFilterModal } from "@/components/modals/post-search-filter-modal"

interface StudyOnlineModalProps {
  isOpen: boolean
  onClose: () => void
}

export function StudyOnlineModal({ isOpen, onClose }: StudyOnlineModalProps) {
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    duration: "",
    workStatus: "",
    workExperience: "",
    studyPreference: "",
    budgetRange: "",
    placementAssistance: "",
  })
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // Validate only mandatory fields
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Please fill in all required fields")
      return
    }

    // Save basic form data
    localStorage.setItem("study_online_basic_form", JSON.stringify(formData))

    // Close this modal and show filter modal
    onClose()
    setShowFilterModal(true)
  }

  const handleFilterComplete = (filterData: any) => {
    // Combine basic form data with filter data
    const combinedData = {
      basicInfo: formData,
      filterData: filterData,
    }

    // Save combined data
    localStorage.setItem("study_online_complete_data", JSON.stringify(combinedData))

    // Navigate to results page
    router.push("/search-results?vertical=study-online")
    setShowFilterModal(false)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      duration: "",
      workStatus: "",
      workExperience: "",
      studyPreference: "",
      budgetRange: "",
      placementAssistance: "",
    })
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
          <DialogHeader className="relative">
            <button
              onClick={handleClose}
              className="absolute right-0 top-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <DialogTitle className="flex items-center space-x-3 text-xl font-bold text-gray-800">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <span>Study Online</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            <div className="text-center">
              <p className="text-gray-600">Quick form to find online courses</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <User className="w-5 h-5 mr-2 text-green-600" />
                  Basic Information
                </h3>

                {/* Name - Mandatory */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Email - Mandatory */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Phone - Optional */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    Phone Number <span className="text-gray-400 ml-1">(Optional)</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Course Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-green-600" />
                  Course Preferences
                </h3>

                {/* Duration - Optional */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    Duration <span className="text-gray-400 ml-1">(Optional)</span>
                  </Label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                    <SelectTrigger className="w-full px-4 py-3 border border-gray-200 rounded-xl">
                      <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6months">6 months</SelectItem>
                      <SelectItem value="1year">1 year</SelectItem>
                      <SelectItem value="2years">2 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Work Status - Optional */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                    Are you working or fresher? <span className="text-gray-400 ml-1">(Optional)</span>
                  </Label>
                  <RadioGroup
                    value={formData.workStatus}
                    onValueChange={(value) => handleInputChange("workStatus", value)}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="working" id="working" />
                      <Label htmlFor="working">Working</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fresher" id="fresher" />
                      <Label htmlFor="fresher">Fresher</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Budget Range - Optional */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                    Budget Range <span className="text-gray-400 ml-1">(Optional)</span>
                  </Label>
                  <Input
                    placeholder="Enter your budget range (e.g., 1-3 Lacs)"
                    value={formData.budgetRange}
                    onChange={(e) => handleInputChange("budgetRange", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Post Search Filter Modal */}
      <PostSearchFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        vertical="study-online"
        onComplete={handleFilterComplete}
      />
    </>
  )
}
