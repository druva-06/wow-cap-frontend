"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, Globe, User, Mail, Phone, GraduationCap, Calendar, MapPin } from "lucide-react"
import { PostSearchFilterModal } from "@/components/modals/post-search-filter-modal"

interface StudyAbroadModalProps {
  isOpen: boolean
  onClose: () => void
  country?: string
}

export function StudyAbroadModal({ isOpen, onClose, country }: StudyAbroadModalProps) {
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studyLevel: "",
    intakeYear: "",
    budget: "",
    preferredCountry: country || "",
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
    localStorage.setItem("study_abroad_basic_form", JSON.stringify(formData))

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
    localStorage.setItem("study_abroad_complete_data", JSON.stringify(combinedData))

    // Navigate to results page
    router.push(`/search-results?vertical=study-abroad&country=${formData.preferredCountry}`)
    setShowFilterModal(false)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      studyLevel: "",
      intakeYear: "",
      budget: "",
      preferredCountry: country || "",
    })
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
          <DialogHeader className="relative">
            <button
              onClick={handleClose}
              className="absolute right-0 top-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <DialogTitle className="flex items-center space-x-3 text-xl font-bold text-gray-800">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span>Study Abroad</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            <div className="text-center">
              <p className="text-gray-600">Quick form to find your perfect study destination</p>
            </div>

            <div className="space-y-4">
              {/* Name - Mandatory */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Email - Mandatory */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-600" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Study Level - Optional */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                  Study Level <span className="text-gray-400 ml-1">(Optional)</span>
                </Label>
                <Select value={formData.studyLevel} onValueChange={(value) => handleInputChange("studyLevel", value)}>
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-200 rounded-xl">
                    <SelectValue placeholder="Select study level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="postgraduate">Postgraduate</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Intake Year - Optional */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  Preferred Intake <span className="text-gray-400 ml-1">(Optional)</span>
                </Label>
                <Select value={formData.intakeYear} onValueChange={(value) => handleInputChange("intakeYear", value)}>
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-200 rounded-xl">
                    <SelectValue placeholder="Select intake year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Country - Optional */}
              {!country && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    Preferred Country <span className="text-gray-400 ml-1">(Optional)</span>
                  </Label>
                  <Select
                    value={formData.preferredCountry}
                    onValueChange={(value) => handleInputChange("preferredCountry", value)}
                  >
                    <SelectTrigger className="w-full px-4 py-3 border border-gray-200 rounded-xl">
                      <SelectValue placeholder="Select preferred country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usa">USA</SelectItem>
                      <SelectItem value="uk">UK</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="france">France</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
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
        vertical="study-abroad"
        onComplete={handleFilterComplete}
      />
    </>
  )
}
