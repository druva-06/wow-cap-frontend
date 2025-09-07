"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, User, BookOpen } from "lucide-react"

interface LeadFormProps {
  universityName?: string
  courses?: string[]
  className?: string
}

export function LeadForm({ universityName, courses = [], className = "" }: LeadFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    interestedCourse: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      interestedCourse: "",
    })
    setIsSubmitting(false)

    // Show success message (you can implement toast notification here)
    alert("Thank you! We'll contact you soon for free consultation.")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const defaultCourses = [
    "Computer Science",
    "Business Administration",
    "Engineering",
    "Medicine",
    "Law",
    "Arts & Humanities",
    "Sciences",
    "Other",
  ]

  const availableCourses = courses.length > 0 ? courses : defaultCourses

  return (
    <Card
      className={`bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white border-0 shadow-2xl ${className}`}
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-center">Quick Admission Form</CardTitle>
        {universityName && (
          <p className="text-purple-100 text-center text-sm">Get personalized guidance for {universityName}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-purple-100 flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-white focus:ring-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-purple-100 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-white focus:ring-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-purple-100 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-white focus:ring-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course" className="text-purple-100 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Interested Course
            </Label>
            <Select
              value={formData.interestedCourse}
              onValueChange={(value) => handleInputChange("interestedCourse", value)}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-white focus:ring-white">
                <SelectValue placeholder="Select your interested course" />
              </SelectTrigger>
              <SelectContent>
                {availableCourses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-purple-700 hover:bg-purple-50 font-semibold py-3 text-lg transition-all duration-200 transform hover:scale-105"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-700 border-t-transparent"></div>
                Submitting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Get Free Consultation
              </div>
            )}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-purple-200">
            By submitting this form, you agree to our Terms & Conditions and Privacy Policy
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
