"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Phone,
  GraduationCap,
  Edit3,
  ArrowLeft,
  Award,
  Camera,
  MapPin,
  Calendar,
  Loader2,
  ChevronDown,
  Building2,
  TrendingUp,
} from "lucide-react"
import { getStudentEducation } from "@/lib/api/client"
import type { StudentEducation } from "@/lib/api/types"

interface EducationDisplay {
  id: string
  degree: string
  field: string
  institution: string
  institutionAddress: string
  startYear: string
  graduationYear: string
  cgpa: string
  percentage: string
  level: "Undergraduate" | "Postgraduate" | "High School" | "Doctorate"
}

export default function ViewProfilePage() {
  const router = useRouter()
  const [educationHistory, setEducationHistory] = useState<EducationDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Fetch education data on component mount
  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch education data from API (userId retrieved from localStorage wowcap_user)
        const response = await getStudentEducation()

        if (response.success && Array.isArray(response.response)) {
          // Map API response to display format
          const mappedEducation: EducationDisplay[] = response.response.map((edu: StudentEducation) => {
            // Map education level to display format
            let level: EducationDisplay["level"] = "Undergraduate"
            if (edu.educationLevel === "POSTGRADUATE") level = "Postgraduate"
            else if (edu.educationLevel === "HIGH_SCHOOL") level = "High School"
            else if (edu.educationLevel === "DOCTORATE") level = "Doctorate"
            else if (edu.educationLevel === "UNDERGRADUATE") level = "Undergraduate"

            // Extract year from date string (format: "01/08/2018")
            const extractYear = (dateString: string) => {
              if (!dateString) return ""
              const parts = dateString.split("/")
              return parts.length === 3 ? parts[2] : dateString
            }

            // If end year is empty or not available, mark as "Present" (ongoing)
            const endYear = extractYear(edu.endYear)
            const graduationYear = endYear || "Present"

            return {
              id: edu.educationId.toString(),
              degree: edu.degree || "N/A",
              field: edu.fieldOfStudy || "N/A",
              institution: edu.institutionName || "N/A",
              institutionAddress: edu.institutionAddress || "N/A",
              startYear: extractYear(edu.startYear),
              graduationYear: graduationYear,
              cgpa: edu.cgpa ? edu.cgpa.toString() : "N/A",
              percentage: edu.percentage ? edu.percentage.toString() : "N/A",
              level: level,
            }
          })

          // Sort by graduation year (end date) in descending order (most recent first)
          // "Present" (ongoing) should appear at the top
          const sortedEducation = mappedEducation.sort((a, b) => {
            // If either is "Present", it should come first
            if (a.graduationYear === "Present") return -1
            if (b.graduationYear === "Present") return 1

            const yearA = parseInt(a.graduationYear) || 0
            const yearB = parseInt(b.graduationYear) || 0
            return yearB - yearA // Descending order
          })

          setEducationHistory(sortedEducation)
        } else {
          throw new Error(response.message || "Failed to fetch education data")
        }
      } catch (err: any) {
        console.error("Error fetching education:", err)
        setError(err.message || "Failed to load education data")
        // Set empty array so the UI doesn't break
        setEducationHistory([])
      } finally {
        setLoading(false)
      }
    }

    fetchEducationData()
  }, [])

  const user = {
    name: "Shiva Mantri",
    email: "mantrishivaramakrishna1@gmail.com",
    phone: "9849943319",
    dateOfBirth: "1995-15-06",
    nationality: "Indian",
    address: "Hyderabad, Telangana, India",
    profileImage: "/placeholder.svg?height=120&width=120",
    joinedDate: "2024-01-15",
    preferences: {
      studyDestination: "USA, Canada, UK",
      interestedFields: "Computer Science, Data Science, AI/ML",
      budgetRange: "$40,000 - $60,000",
      intakePreference: "Fall 2024, Spring 2025",
    },
    stats: {
      applicationsSubmitted: 5,
      universitiesShortlisted: 12,
      documentsCompleted: 85,
      profileStrength: 92,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
                  alt="Profile"
                  className="w-24 h-24 lg:w-28 lg:h-28 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{user.name}</h1>
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-700 rounded-full shadow-md">
                    <div className="w-8 h-8 relative">
                      <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="14" stroke="rgb(219 234 254)" strokeWidth="3" fill="none" />
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          stroke="rgb(255 255 255)"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray={`${(user.stats.profileStrength / 100) * 87.96} 87.96`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{user.stats.profileStrength}%</span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-white">Complete</span>
                  </div>
                </div>
                <p className="text-lg text-gray-600 mb-2">
                  {educationHistory.length > 0 ? `${educationHistory[0].field} Graduate` : "Student"}
                </p>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Member since{" "}
                      {new Date(user.joinedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user.address.split(",")[0]}</span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => router.push("/dashboard/profile/edit")}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-0 border-l-4 border-l-blue-500">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Full Name</label>
                <p className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{user.name}</p>
              </div>
              <div className="group">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Email Address</label>
                <p className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors break-all">{user.email}</p>
              </div>
              <div className="group">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Phone Number</label>
                <p className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{user.phone}</p>
              </div>
              <div className="group">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Date of Birth</label>
                <p className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{new Date(user.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div className="group">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Nationality</label>
                <p className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{user.nationality}</p>
              </div>
              <div className="group">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Address</label>
                <p className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{user.address}</p>
              </div>
            </div>
          </div>

          {/* Education Background */}
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-0 border-l-4 border-l-purple-500">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                </div>
                Education History
              </h3>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
                <span className="text-sm font-semibold text-purple-700">
                  {educationHistory.length} {educationHistory.length === 1 ? 'Qualification' : 'Qualifications'}
                </span>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                <span className="ml-3 text-gray-600">Loading education data...</span>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">{error}</div>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-purple-300 text-purple-700"
                >
                  Retry
                </Button>
              </div>
            )}

            {/* Education List */}
            {!loading && !error && educationHistory.length === 0 && (
              <div className="text-center py-12">
                <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No education records found</p>
                <Button
                  onClick={() => router.push("/dashboard/profile/edit")}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </div>
            )}

            {/* Timeline Container with proper spacing */}
            <div className="relative ml-20">
              {/* Continuous Vertical Timeline Line - Fixed positioning */}
              {educationHistory.length > 0 && (
                <div
                  className="absolute w-1 bg-gradient-to-b from-purple-400 via-blue-400 to-green-400 rounded-full"
                  style={{
                    left: '-50px',
                    top: '8px',
                    bottom: '8px'
                  }}
                />
              )}

              <div className="space-y-4">
                {!loading && !error && educationHistory.map((education, index) => {
                  // Get CGPA and Percentage values
                  const cgpaValue = Number.parseFloat(education.cgpa) || 0
                  const percentageValue = Number.parseFloat(education.percentage) || 0
                  const isExpanded = expandedId === education.id
                  const isFirst = index === 0
                  const isLast = index === educationHistory.length - 1

                  // Define gradient colors for each level
                  const levelColors = {
                    "Postgraduate": {
                      from: "from-purple-500", to: "to-indigo-500",
                      bg: "bg-purple-50", text: "text-purple-700",
                      border: "border-purple-200", badge: "bg-purple-100",
                      hover: "hover:bg-purple-50", ring: "ring-purple-300",
                      yearBg: "bg-purple-600"
                    },
                    "Undergraduate": {
                      from: "from-blue-500", to: "to-cyan-500",
                      bg: "bg-blue-50", text: "text-blue-700",
                      border: "border-blue-200", badge: "bg-blue-100",
                      hover: "hover:bg-blue-50", ring: "ring-blue-300",
                      yearBg: "bg-blue-600"
                    },
                    "High School": {
                      from: "from-green-500", to: "to-emerald-500",
                      bg: "bg-green-50", text: "text-green-700",
                      border: "border-green-200", badge: "bg-green-100",
                      hover: "hover:bg-green-50", ring: "ring-green-300",
                      yearBg: "bg-green-600"
                    },
                    "Doctorate": {
                      from: "from-indigo-500", to: "to-purple-500",
                      bg: "bg-indigo-50", text: "text-indigo-700",
                      border: "border-indigo-200", badge: "bg-indigo-100",
                      hover: "hover:bg-indigo-50", ring: "ring-indigo-300",
                      yearBg: "bg-indigo-600"
                    },
                  }
                  const colors = levelColors[education.level as keyof typeof levelColors] || levelColors["Undergraduate"]

                  // Check if education is ongoing (Present)
                  const isOngoing = education.graduationYear === "Present"

                  return (
                    <div
                      key={education.id}
                      className={`relative bg-white rounded-xl border-2 ${colors.border} transition-all duration-300 ${isExpanded ? 'shadow-lg ring-2 ' + colors.ring : 'shadow-sm hover:shadow-md'
                        }`}
                    >
                      {/* Timeline Year Badge - Centered on line */}
                      <div className="absolute -left-[62px] top-6 flex items-center justify-center">
                        {/* Year Badge - Centered */}
                        <div className={`${isOngoing ? 'bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse' : colors.yearBg} text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-md whitespace-nowrap z-20 ${isOngoing ? 'ring-2 ring-green-300' : ''}`}>
                          {isOngoing ? "Ongoing" : education.graduationYear}
                        </div>
                      </div>

                      {/* Clickable Header */}
                      <div
                        onClick={() => setExpandedId(isExpanded ? null : education.id)}
                        className={`p-4 cursor-pointer ${colors.hover} rounded-t-lg transition-colors`}
                      >
                        <div className="flex items-center justify-between">
                          {/* Left Side - Education Info */}
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {/* Icon Circle */}
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors.from} ${colors.to} flex items-center justify-center flex-shrink-0 shadow-md`}>
                              <GraduationCap className="w-5 h-5 text-white" />
                            </div>

                            {/* Education Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <h4 className="text-base font-bold text-gray-900 truncate">
                                  {education.degree}
                                </h4>
                                <span className={`text-xs font-bold ${colors.text} px-2 py-0.5 ${colors.badge} rounded-full whitespace-nowrap`}>
                                  {education.level}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 truncate">
                                {education.field}
                              </p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Building2 className="w-3 h-3" />
                                  {education.institution}
                                </span>
                                {(education.startYear && education.startYear !== "N/A") ? (
                                  <span className={`text-xs flex items-center gap-1 ${isOngoing ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
                                    <Calendar className="w-3 h-3" />
                                    {education.startYear} - {isOngoing ? "Present" : education.graduationYear}
                                  </span>
                                ) : (
                                  <span className={`text-xs flex items-center gap-1 ${isOngoing ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
                                    <Calendar className="w-3 h-3" />
                                    {isOngoing ? "Present" : education.graduationYear}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right Side - Score & Expand Icon */}
                          <div className="flex items-center gap-3 ml-3">
                            {/* Score Display */}
                            <div className="flex flex-col items-end gap-1">
                              {cgpaValue > 0 && (
                                <div className={`flex items-center gap-1 px-2.5 py-1 ${colors.bg} rounded-md`}>
                                  <TrendingUp className={`w-3 h-3 ${colors.text}`} />
                                  <span className={`text-sm font-bold ${colors.text}`}>
                                    {cgpaValue}
                                  </span>
                                  <span className="text-xs text-gray-500">/10</span>
                                </div>
                              )}
                              {percentageValue > 0 && (
                                <div className={`flex items-center gap-1 px-2.5 py-1 ${colors.bg} rounded-md`}>
                                  <span className={`text-sm font-bold ${colors.text}`}>
                                    {percentageValue}%
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Expand/Collapse Icon */}
                            <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''
                              }`}>
                              <ChevronDown className={`w-4 h-4 ${colors.text}`} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expandable Content */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                      >
                        <div className={`p-4 pt-0 border-t ${colors.border} bg-gradient-to-br from-gray-50 to-white`}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {/* Institution Details */}
                            <div className="space-y-2">
                              <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Institution</h5>
                              <div className="flex items-start gap-2">
                                <MapPin className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">{education.institution}</p>
                                  {education.institutionAddress !== "N/A" && (
                                    <p className="text-xs text-gray-500 mt-0.5">{education.institutionAddress}</p>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Academic Performance */}
                            <div className="space-y-2">
                              <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Academic Performance</h5>
                              <div className="space-y-2">
                                {cgpaValue > 0 && (
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">CGPA</span>
                                    <div className="flex items-center gap-2">
                                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                          className={`h-2 bg-gradient-to-r ${colors.from} ${colors.to} rounded-full transition-all duration-700`}
                                          style={{ width: `${(cgpaValue / 10) * 100}%` }}
                                        />
                                      </div>
                                      <span className={`text-sm font-bold ${colors.text} min-w-[50px] text-right`}>
                                        {cgpaValue}/10
                                      </span>
                                    </div>
                                  </div>
                                )}
                                {percentageValue > 0 && (
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Percentage</span>
                                    <div className="flex items-center gap-2">
                                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                          className={`h-2 bg-gradient-to-r ${colors.from} ${colors.to} rounded-full transition-all duration-700`}
                                          style={{ width: `${percentageValue}%` }}
                                        />
                                      </div>
                                      <span className={`text-sm font-bold ${colors.text} min-w-[50px] text-right`}>
                                        {percentageValue}%
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Timeline */}
                            <div className="space-y-2">
                              <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Timeline</h5>
                              <div className="flex items-center gap-3">
                                <Calendar className={`w-4 h-4 ${isOngoing ? 'text-green-600' : colors.text}`} />
                                <div className="text-sm">
                                  {education.startYear && education.startYear !== "N/A" ? (
                                    <div>
                                      <span className="text-gray-600">Started:</span>{" "}
                                      <span className="font-semibold text-gray-900">{education.startYear}</span>
                                      <span className="text-gray-400 mx-2">→</span>
                                      <span className={isOngoing ? "text-green-600" : "text-gray-600"}>{isOngoing ? "Ongoing" : "Ended"}:</span>{" "}
                                      <span className={`font-semibold ${isOngoing ? 'text-green-600' : 'text-gray-900'}`}>
                                        {isOngoing ? "Present" : education.graduationYear}
                                      </span>
                                      {isOngoing && (
                                        <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-semibold">
                                          Currently Studying
                                        </span>
                                      )}
                                    </div>
                                  ) : (
                                    <div>
                                      <span className={isOngoing ? "text-green-600" : "text-gray-600"}>
                                        {isOngoing ? "Status:" : "Graduated:"}
                                      </span>{" "}
                                      <span className={`font-semibold ${isOngoing ? 'text-green-600' : 'text-gray-900'}`}>
                                        {isOngoing ? "Currently Studying" : education.graduationYear}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Field of Study */}
                            <div className="space-y-2">
                              <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Specialization</h5>
                              <div className="flex items-center gap-2">
                                <Award className={`w-4 h-4 ${colors.text}`} />
                                <span className="text-sm font-semibold text-gray-900">{education.field}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Add Education Button */}
            <button
              onClick={() => router.push("/dashboard/profile/edit")}
              className="mt-6 w-full py-3 px-4 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border-2 border-dashed border-purple-300 rounded-xl text-purple-700 font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-md group"
            >
              <div className="p-1 bg-purple-200 rounded-full group-hover:bg-purple-300 transition-colors">
                <GraduationCap className="w-4 h-4" />
              </div>
              Add More Education
            </button>
          </div>

          {/* Study Preferences */}
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-0 border-l-4 border-l-green-500">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              Study Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Preferred Destinations</label>
                <p className="text-base font-semibold text-gray-900 group-hover:text-green-600 transition-colors">{user.preferences.studyDestination}</p>
              </div>
              <div className="group">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Interested Fields</label>
                <p className="text-base font-semibold text-gray-900 group-hover:text-green-600 transition-colors">{user.preferences.interestedFields}</p>
              </div>
              <div className="group">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Budget Range</label>
                <p className="text-base font-semibold text-gray-900 group-hover:text-green-600 transition-colors">{user.preferences.budgetRange}</p>
              </div>
              <div className="group md:col-span-2 lg:col-span-3">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Intake Preference</label>
                <p className="text-base font-semibold text-gray-900 group-hover:text-green-600 transition-colors">{user.preferences.intakePreference}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
