"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Clock,
  Calendar,
  Award,
  Users,
  Globe,
  BookOpen,
  Mail,
  Download,
  Building,
  CheckCircle,
  MessageCircle,
  Heart,
  FileText,
  Shield,
  Network,
  Trophy,
  Music,
  Map,
  ArrowRight,
  ExternalLink,
  Video,
  Star,
  Info,
  PlusCircle,
  MinusCircle,
  Car,
} from "lucide-react"
import Image from "next/image"
import { studyAbroadUniversities, studyIndiaColleges } from "@/lib/sample-data"

export default function UniversityDetailPage() {
  const params = useParams()
  const universityId = params.id as string
  const courseSlug = params.course as string
  const [activeTab, setActiveTab] = useState("overview")
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState(1)
  const [showCostCalculator, setShowCostCalculator] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Find university and course data
  const findUniversityAndCourse = () => {
    const createSlug = (text: string) => {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
    }

    // Search in study abroad universities
    for (const uni of studyAbroadUniversities) {
      if (uni.id === universityId || createSlug(uni.name) === universityId) {
        for (const course of uni.courses) {
          const generatedSlug = createSlug(course.name)
          if (generatedSlug === courseSlug || course.id === courseSlug) {
            return { university: uni, course, type: "abroad" }
          }
        }
        if (uni.courses.length > 0) {
          return { university: uni, course: uni.courses[0], type: "abroad" }
        }
      }
    }

    // Search in study india colleges
    for (const college of studyIndiaColleges) {
      if (college.id === universityId || createSlug(college.name) === universityId) {
        for (const course of college.courses) {
          const generatedSlug = createSlug(course.name)
          if (generatedSlug === courseSlug || course.id === courseSlug) {
            return { university: college, course, type: "india" }
          }
        }
        if (college.courses.length > 0) {
          return { university: college, course: college.courses[0], type: "india" }
        }
      }
    }

    return null
  }

  const data = findUniversityAndCourse()

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white p-8 rounded-lg shadow-sm border">
          <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">University Not Found</h1>
          <p className="text-gray-600 mb-6">The requested university or course could not be found.</p>
          <div className="text-sm text-gray-500 mb-6 p-4 bg-gray-50 rounded border">
            <p className="font-medium mb-1">Looking for:</p>
            <p className="break-all">University ID: {universityId}</p>
            <p className="break-all">Course Slug: {courseSlug}</p>
          </div>
          <Button onClick={() => window.history.back()} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const { university, course } = data

  // Sample data
  const facultyMembers = [
    {
      name: "Dr. Sarah Johnson",
      title: "Professor of Computer Science",
      specialization: "Artificial Intelligence & Machine Learning",
      image: "/placeholder.svg?height=80&width=80&text=SJ",
      publications: 150,
      experience: "15 years",
      awards: ["IEEE Fellow", "ACM Distinguished Scientist"],
      rating: 4.9,
    },
    {
      name: "Dr. Michael Chen",
      title: "Associate Professor",
      specialization: "Cybersecurity & Cryptography",
      image: "/placeholder.svg?height=80&width=80&text=MC",
      publications: 89,
      experience: "12 years",
      awards: ["NSF CAREER Award", "Best Paper Award"],
      rating: 4.8,
    },
    {
      name: "Dr. Emily Rodriguez",
      title: "Assistant Professor",
      specialization: "Data Science & Analytics",
      image: "/placeholder.svg?height=80&width=80&text=ER",
      publications: 45,
      experience: "8 years",
      awards: ["Rising Star Award", "Google Research Award"],
      rating: 4.9,
    },
  ]

  const curriculum = {
    semester1: [
      { code: "CS 601", name: "Advanced Algorithms", credits: 3, type: "Core", difficulty: "Advanced" },
      { code: "CS 602", name: "Computer Systems Architecture", credits: 3, type: "Core", difficulty: "Intermediate" },
      { code: "CS 603", name: "Mathematical Foundations", credits: 3, type: "Core", difficulty: "Advanced" },
      { code: "CS 604", name: "Research Methods", credits: 2, type: "Core", difficulty: "Beginner" },
    ],
    semester2: [
      { code: "CS 611", name: "Machine Learning", credits: 3, type: "Core", difficulty: "Advanced" },
      { code: "CS 612", name: "Database Systems", credits: 3, type: "Core", difficulty: "Intermediate" },
      { code: "CS 613", name: "Software Engineering", credits: 3, type: "Core", difficulty: "Intermediate" },
      { code: "CS 614", name: "Elective I", credits: 3, type: "Elective", difficulty: "Variable" },
    ],
    semester3: [
      { code: "CS 621", name: "Distributed Systems", credits: 3, type: "Core", difficulty: "Advanced" },
      { code: "CS 622", name: "Computer Networks", credits: 3, type: "Core", difficulty: "Intermediate" },
      { code: "CS 623", name: "Elective II", credits: 3, type: "Elective", difficulty: "Variable" },
      { code: "CS 624", name: "Thesis Research I", credits: 3, type: "Research", difficulty: "Advanced" },
    ],
    semester4: [
      { code: "CS 631", name: "Advanced Topics Seminar", credits: 2, type: "Core", difficulty: "Advanced" },
      { code: "CS 632", name: "Industry Capstone Project", credits: 4, type: "Project", difficulty: "Advanced" },
      { code: "CS 633", name: "Thesis Research II", credits: 6, type: "Research", difficulty: "Advanced" },
    ],
  }

  const scholarships = [
    {
      name: "Merit-Based Scholarship",
      amount: "$25,000",
      eligibility: "GPA 3.8+, GRE 325+",
      deadline: "March 15, 2024",
      coverage: "50% tuition",
      recipients: 45,
      competitive: "High",
    },
    {
      name: "International Student Grant",
      amount: "$15,000",
      eligibility: "International students",
      deadline: "April 1, 2024",
      coverage: "Partial tuition",
      recipients: 120,
      competitive: "Medium",
    },
    {
      name: "Research Assistantship",
      amount: "$20,000 + tuition waiver",
      eligibility: "Research experience",
      deadline: "February 28, 2024",
      coverage: "Full tuition + stipend",
      recipients: 30,
      competitive: "Very High",
    },
  ]

  const careerOutcomes = [
    {
      role: "Software Engineer",
      companies: ["Google", "Microsoft", "Apple"],
      avgSalary: "$145,000",
      percentage: 35,
      growth: "+12%",
      satisfaction: 4.6,
    },
    {
      role: "Data Scientist",
      companies: ["Meta", "Netflix", "Uber"],
      avgSalary: "$155,000",
      percentage: 25,
      growth: "+18%",
      satisfaction: 4.7,
    },
    {
      role: "Research Scientist",
      companies: ["OpenAI", "DeepMind", "IBM"],
      avgSalary: "$180,000",
      percentage: 20,
      growth: "+25%",
      satisfaction: 4.8,
    },
    {
      role: "Product Manager",
      companies: ["Amazon", "Tesla", "Spotify"],
      avgSalary: "$165,000",
      percentage: 15,
      growth: "+15%",
      satisfaction: 4.5,
    },
    {
      role: "Entrepreneur",
      companies: ["Startup Founder"],
      avgSalary: "$200,000+",
      percentage: 5,
      growth: "+30%",
      satisfaction: 4.9,
    },
  ]

  const studentTestimonials = [
    {
      name: "Raj Patel",
      country: "India",
      year: "Class of 2023",
      image: "/placeholder.svg?height=60&width=60&text=RP",
      quote:
        "The program exceeded my expectations. The faculty's expertise and industry connections opened doors I never imagined.",
      currentRole: "ML Engineer at Google",
      rating: 5,
      program: "Computer Science",
    },
    {
      name: "Maria Garcia",
      country: "Spain",
      year: "Class of 2022",
      image: "/placeholder.svg?height=60&width=60&text=MG",
      quote: "Oxford's research opportunities and collaborative environment prepared me for a successful career in AI.",
      currentRole: "Research Scientist at OpenAI",
      rating: 5,
      program: "Artificial Intelligence",
    },
    {
      name: "James Wilson",
      country: "Canada",
      year: "Class of 2023",
      image: "/placeholder.svg?height=60&width=60&text=JW",
      quote: "The interdisciplinary approach and access to cutting-edge labs made this program unique.",
      currentRole: "Senior Data Scientist at Microsoft",
      rating: 5,
      program: "Data Science",
    },
  ]

  const admissionTimeline = [
    {
      phase: "Application Opens",
      date: "September 1, 2023",
      status: "completed",
      description: "Online application portal opens",
    },
    {
      phase: "Application Deadline",
      date: "December 15, 2023",
      status: "completed",
      description: "Final deadline for all materials",
    },
    {
      phase: "Interview Period",
      date: "January 15 - February 28, 2024",
      status: "current",
      description: "Virtual and in-person interviews",
    },
    {
      phase: "Admission Results",
      date: "March 15, 2024",
      status: "upcoming",
      description: "Admission decisions released",
    },
    {
      phase: "Enrollment Deadline",
      date: "April 30, 2024",
      status: "upcoming",
      description: "Confirm enrollment and pay deposit",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Banner Image Section with Overlays */}
      <div className="relative h-60 overflow-hidden bg-gray-100">
        <Image
          src="/oxford-campus.jpg"
          alt={`${university.name} campus - Computer Science Department`}
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30" />

        {/* Gradient overlay at bottom for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Bottom Left Content Overlay */}
        <div className="absolute bottom-6 left-6 text-white max-w-2xl">
          <h1 className="text-3xl font-bold mb-2 drop-shadow-lg">{course.name}</h1>
          <h2 className="text-xl font-medium mb-3 drop-shadow-md">{university.name}</h2>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <MapPin className="w-4 h-4" />
              <span>
                {university.city}, {university.country}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Calendar className="w-4 h-4" />
              <span>Est. {university.establishedYear}</span>
            </div>
            {university.ranking && (
              <div className="flex items-center gap-1 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4" />
                <span>Ranked #{university.ranking}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Right Action Buttons Overlay */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 shadow-lg backdrop-blur-sm">
            Apply Now
          </Button>
          <Button
            variant="outline"
            className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-6 py-2 bg-black/20"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact Advisor
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-6 py-2 bg-black/20"
          >
            <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? "fill-current text-red-400" : ""}`} />
            {isWishlisted ? "Saved" : "Save"}
          </Button>
        </div>

        {/* Mobile responsive adjustments */}
        <div className="absolute bottom-6 left-6 right-6 md:hidden">
          <div className="text-white mb-4">
            <h1 className="text-2xl font-bold mb-2 drop-shadow-lg">{course.name}</h1>
            <h2 className="text-lg font-medium mb-3 drop-shadow-md">{university.name}</h2>
            <div className="flex flex-wrap items-center gap-2 text-xs mb-4">
              <div className="flex items-center gap-1 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                <MapPin className="w-3 h-3" />
                <span>
                  {university.city}, {university.country}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                <Calendar className="w-3 h-3" />
                <span>Est. {university.establishedYear}</span>
              </div>
              {university.ranking && (
                <div className="flex items-center gap-1 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Trophy className="w-3 h-3" />
                  <span>#{university.ranking}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm shadow-lg backdrop-blur-sm flex-1">
              Apply Now
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-4 py-2 bg-black/20"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current text-red-400" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Tab Navigation - Updated with blue background and white text */}
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-blue-600 border border-blue-600 rounded-lg p-1 mb-8">
                <TabsTrigger
                  value="overview"
                  className="text-sm py-2 text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="curriculum"
                  className="text-sm py-2 text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Curriculum
                </TabsTrigger>
                <TabsTrigger
                  value="admissions"
                  className="text-sm py-2 text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Admissions
                </TabsTrigger>
                <TabsTrigger
                  value="financial"
                  className="text-sm py-2 text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Financial Aid
                </TabsTrigger>
                <TabsTrigger
                  value="campus"
                  className="text-sm py-2 text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Campus
                </TabsTrigger>
                <TabsTrigger
                  value="outcomes"
                  className="text-sm py-2 text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  Outcomes
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                {/* Program Overview */}
                <Card className="border border-gray-200">
                  <CardHeader className="border-b border-gray-200 bg-blue-50">
                    <CardTitle className="text-lg font-semibold text-gray-900">Program Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        The <strong>{course.name}</strong> at <strong>{university.name}</strong> is a rigorous,
                        research-oriented program designed to prepare students for leadership roles in technology and
                        academia. Our curriculum combines theoretical foundations with cutting-edge research in
                        artificial intelligence, systems, and computational theory.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Students work closely with world-renowned faculty on groundbreaking research projects, with
                        access to state-of-the-art laboratories and computing resources. The program emphasizes both
                        depth and breadth, allowing students to specialize while maintaining a strong foundation across
                        core areas.
                      </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Program Highlights</h4>
                        <div className="space-y-3">
                          {[
                            "Research-focused curriculum with thesis option",
                            "Access to cutting-edge AI and ML labs",
                            "Industry partnerships with tech giants",
                            "Optional 3-year PhD pathway",
                          ].map((highlight, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Specialization Areas</h4>
                        <div className="space-y-3">
                          {[
                            "Artificial Intelligence & Machine Learning",
                            "Cybersecurity & Privacy",
                            "Data Science & Analytics",
                            "Distributed Systems & Networks",
                          ].map((spec, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                              <span className="text-gray-700">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Faculty */}
                <Card className="border border-gray-200">
                  <CardHeader className="border-b border-gray-200 bg-blue-50">
                    <CardTitle className="text-lg font-semibold text-gray-900">Faculty</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {facultyMembers.map((faculty, index) => (
                        <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                          <Image
                            src={faculty.image || "/placeholder.svg"}
                            alt={faculty.name}
                            width={80}
                            height={80}
                            className="rounded-full mx-auto mb-3 border-2 border-gray-200"
                          />
                          <h4 className="font-semibold text-gray-900 mb-1">{faculty.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{faculty.title}</p>
                          <p className="text-sm text-blue-600 mb-3">{faculty.specialization}</p>
                          <div className="flex justify-center gap-4 text-xs text-gray-500">
                            <span>{faculty.publications} Publications</span>
                            <span>{faculty.experience}</span>
                          </div>
                          <div className="flex justify-center items-center gap-1 mt-2">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs font-medium">{faculty.rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Student Testimonials */}
                <Card className="border border-gray-200">
                  <CardHeader className="border-b border-gray-200 bg-blue-50">
                    <CardTitle className="text-lg font-semibold text-gray-900">Student Success Stories</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {studentTestimonials.slice(0, 2).map((testimonial, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              width={60}
                              height={60}
                              className="rounded-full border-2 border-gray-200"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                              <p className="text-sm text-gray-600">
                                {testimonial.country} • {testimonial.year}
                              </p>
                              <p className="text-sm text-blue-600">{testimonial.currentRole}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <blockquote className="text-gray-700 italic">"{testimonial.quote}"</blockquote>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Curriculum Tab */}
              <TabsContent value="curriculum" className="space-y-8">
                <Card className="border border-gray-200">
                  <CardHeader className="border-b border-gray-200 bg-blue-50">
                    <CardTitle className="text-lg font-semibold text-gray-900">Course Structure</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Semester Selector */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                      {[1, 2, 3, 4].map((sem) => (
                        <Button
                          key={sem}
                          variant={selectedSemester === sem ? "default" : "outline"}
                          onClick={() => setSelectedSemester(sem)}
                          className={`p-3 text-center ${
                            selectedSemester === sem
                              ? "bg-blue-600 text-white"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div>
                            <div className="font-medium">Semester {sem}</div>
                            <div className="text-xs opacity-75">
                              {curriculum[`semester${sem}` as keyof typeof curriculum].reduce(
                                (sum, course) => sum + course.credits,
                                0,
                              )}{" "}
                              Credits
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>

                    {/* Course List */}
                    <div className="space-y-3">
                      {curriculum[`semester${selectedSemester}` as keyof typeof curriculum].map((course, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-medium text-sm">
                              {index + 1}
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <Badge variant="outline" className="text-xs font-mono">
                                  {course.code}
                                </Badge>
                                <h4 className="font-medium text-gray-900">{course.name}</h4>
                              </div>
                              <div className="flex gap-2">
                                <Badge
                                  className={`text-xs ${
                                    course.type === "Core"
                                      ? "bg-blue-100 text-blue-800"
                                      : course.type === "Elective"
                                        ? "bg-green-100 text-green-800"
                                        : course.type === "Research"
                                          ? "bg-purple-100 text-purple-800"
                                          : "bg-orange-100 text-orange-800"
                                  }`}
                                >
                                  {course.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {course.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">{course.credits}</div>
                            <div className="text-xs text-gray-600">Credits</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total Credits */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">Total Credits (Semester {selectedSemester}):</span>
                        <span className="font-semibold text-blue-600 text-lg">
                          {curriculum[`semester${selectedSemester}` as keyof typeof curriculum].reduce(
                            (sum, course) => sum + course.credits,
                            0,
                          )}{" "}
                          Credits
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Admissions Tab */}
              <TabsContent value="admissions" className="space-y-8">
                {/* Application Timeline */}
                <Card className="border border-gray-200">
                  <CardHeader className="border-b border-gray-200 bg-blue-50">
                    <CardTitle className="text-lg font-semibold text-gray-900">Application Timeline 2024</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {admissionTimeline.map((phase, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                              phase.status === "completed"
                                ? "bg-green-100 text-green-600"
                                : phase.status === "current"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {phase.status === "completed" ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : phase.status === "current" ? (
                              <Clock className="w-6 h-6" />
                            ) : (
                              <Calendar className="w-6 h-6" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-medium text-gray-900">{phase.phase}</h4>
                              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{phase.date}</span>
                            </div>
                            <p className="text-gray-600">{phase.description}</p>
                            {phase.status === "current" && (
                              <p className="text-blue-600 font-medium mt-1">Currently in progress</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card className="border border-gray-200">
                  <CardHeader className="border-b border-gray-200 bg-blue-50">
                    <CardTitle className="text-lg font-semibold text-gray-900">Admission Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Academic Requirements</h4>
                        <div className="space-y-3">
                          {[
                            "Bachelor's degree in Computer Science or related field",
                            "Minimum GPA of 3.5/4.0",
                            "Strong mathematical background",
                            "Programming experience (Python, Java, C++)",
                          ].map((req, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{req}</span>
                            </div>
                          ))}
                        </div>

                        <h4 className="font-medium text-gray-900 mb-4 mt-6">Test Scores</h4>
                        <div className="space-y-3">
                          {[
                            { test: "GRE General", score: "320+ (Recommended)" },
                            { test: "TOEFL iBT", score: "100+ (International)" },
                            { test: "IELTS", score: "7.0+ (International)" },
                          ].map((test, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 bg-gray-50 rounded border"
                            >
                              <span className="font-medium text-gray-900">{test.test}</span>
                              <span className="text-gray-600">{test.score}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Application Documents</h4>
                        <div className="space-y-3">
                          {[
                            { doc: "Statement of Purpose", detail: "(2-3 pages)" },
                            { doc: "Letters of Recommendation", detail: "(3 required)" },
                            { doc: "Official Transcripts", detail: "(All institutions)" },
                            { doc: "Resume/CV", detail: "(Updated)" },
                            { doc: "Portfolio", detail: "(if applicable)" },
                          ].map((doc, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded border">
                              <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />
                              <div>
                                <span className="text-gray-900 font-medium">{doc.doc}</span>
                                <span className="text-gray-600 text-sm ml-2">{doc.detail}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-900">Application Fee</span>
                            <span className="font-semibold text-blue-600 text-lg">$105</span>
                          </div>
                          <p className="text-gray-600 text-sm">Fee waivers available for eligible candidates</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Financial Aid Tab */}
              <TabsContent value="financial" className="space-y-8">
                <Card className="border border-gray-200">
                  <CardHeader className="border-b border-gray-200 bg-blue-50">
                    <CardTitle className="text-lg font-semibold text-gray-900">Financial Aid Options</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {scholarships.map((scholarship, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Award className="w-5 h-5 text-blue-600" />
                            <h4 className="font-medium text-gray-900">{scholarship.name}</h4>
                          </div>
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Amount:</span>
                              <span className="font-semibold text-green-600">{scholarship.amount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Coverage:</span>
                              <span className="font-medium text-gray-900">{scholarship.coverage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Recipients:</span>
                              <span className="font-medium text-gray-900">{scholarship.recipients}</span>
                            </div>
                          </div>
                          <div className="pt-3 border-t border-gray-200">
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Eligibility:</strong> {scholarship.eligibility}
                            </p>
                            <p className="text-sm text-red-600 font-medium mb-2">
                              <strong>Deadline:</strong> {scholarship.deadline}
                            </p>
                            <Badge
                              className={`text-xs ${
                                scholarship.competitive === "Very High"
                                  ? "bg-red-100 text-red-800"
                                  : scholarship.competitive === "High"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {scholarship.competitive} Competition
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Cost Calculator */}
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-gray-900">Cost Calculator</h4>
                        <Button
                          variant="outline"
                          onClick={() => setShowCostCalculator(!showCostCalculator)}
                          className="border-gray-300"
                        >
                          {showCostCalculator ? (
                            <>
                              <MinusCircle className="w-4 h-4 mr-2" />
                              Hide Calculator
                            </>
                          ) : (
                            <>
                              <PlusCircle className="w-4 h-4 mr-2" />
                              Show Calculator
                            </>
                          )}
                        </Button>
                      </div>

                      {showCostCalculator && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-3">Estimated Costs (Annual)</h5>
                            <div className="space-y-2">
                              {[
                                { item: "Tuition Fee", amount: "$50,000" },
                                { item: "Living Expenses", amount: "$15,000" },
                                { item: "Books & Supplies", amount: "$2,000" },
                                { item: "Health Insurance", amount: "$3,000" },
                              ].map((cost, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center p-2 bg-white rounded border"
                                >
                                  <span className="text-gray-700">{cost.item}</span>
                                  <span className="font-medium text-gray-900">{cost.amount}</span>
                                </div>
                              ))}
                              <div className="border-t border-gray-300 pt-2">
                                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                                  <span className="font-medium text-gray-900">Total Annual Cost</span>
                                  <span className="font-semibold text-blue-600">$70,000</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 mb-3">Potential Savings</h5>
                            <div className="space-y-3">
                              <div className="p-3 bg-white rounded border">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-gray-700">Merit Scholarship</span>
                                  <span className="font-medium text-green-600">-$25,000</span>
                                </div>
                                <Progress value={50} className="h-2" />
                                <p className="text-xs text-gray-600 mt-1">50% tuition coverage</p>
                              </div>
                              <div className="p-3 bg-white rounded border">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-gray-700">Research Assistantship</span>
                                  <span className="font-medium text-green-600">-$20,000</span>
                                </div>
                                <Progress value={40} className="h-2" />
                                <p className="text-xs text-gray-600 mt-1">Includes stipend</p>
                              </div>
                            </div>
                            <div className="border-t border-gray-300 pt-3 mt-3">
                              <div className="p-3 bg-green-50 rounded border border-green-200">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-gray-900">Net Cost (with aid)</span>
                                  <span className="font-semibold text-green-600">$25,000</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">64% reduction from total cost</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Campus Tab */}
              <TabsContent value="campus" className="space-y-8">
                <Card className="border border-gray-200">
                  <CardHeader className="border-b border-gray-200 bg-blue-50">
                    <CardTitle className="text-lg font-semibold text-gray-900">Campus Life & Facilities</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Campus Facilities</h4>
                        <div className="space-y-3">
                          {[
                            { icon: Building, text: "Modern Academic Buildings" },
                            { icon: BookOpen, text: "Bodleian Libraries (11 million items)" },
                            { icon: Network, text: "High-Speed Campus Wi-Fi" },
                            { icon: Car, text: "Transportation & Parking" },
                          ].map((facility, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded border">
                              <facility.icon className="w-5 h-5 text-gray-600 flex-shrink-0" />
                              <span className="text-gray-700">{facility.text}</span>
                            </div>
                          ))}
                        </div>

                        <h4 className="font-medium text-gray-900 mb-4 mt-6">Accommodation</h4>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-700">Graduate Colleges</span>
                              <span className="font-medium text-gray-900">38 Options</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">Average Cost</span>
                              <span className="font-medium text-gray-900">£150-300/week</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">Guaranteed Housing</span>
                              <span className="font-medium text-green-600">1st Year Students</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Student Activities</h4>
                        <div className="space-y-3">
                          {[
                            { icon: Trophy, text: "Sports & Recreation Centers" },
                            { icon: Music, text: "Music & Performance Societies" },
                            { icon: Globe, text: "International Student Groups" },
                            { icon: Users, text: "Academic & Professional Clubs" },
                          ].map((activity, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded border">
                              <activity.icon className="w-5 h-5 text-gray-600 flex-shrink-0" />
                              <span className="text-gray-700">{activity.text}</span>
                            </div>
                          ))}
                        </div>

                        <h4 className="font-medium text-gray-900 mb-4 mt-6">Student Support</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border">
                            <Shield className="w-5 h-5 text-gray-600 flex-shrink-0" />
                            <span className="text-gray-700">24/7 Security & Safety</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border">
                            <Heart className="w-5 h-5 text-gray-600 flex-shrink-0" />
                            <span className="text-gray-700">Health & Counseling Services</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border">
                            <Users className="w-5 h-5 text-gray-600 flex-shrink-0" />
                            <span className="text-gray-700">Academic Support Centers</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Outcomes Tab */}
              <TabsContent value="outcomes" className="space-y-8">
                <Card className="border border-gray-200">
                  <CardHeader className="border-b border-gray-200 bg-blue-50">
                    <CardTitle className="text-lg font-semibold text-gray-900">Career Outcomes</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Employment Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-2xl font-semibold text-green-600 mb-1">95%</div>
                        <div className="text-gray-700 font-medium">Employment Rate</div>
                        <div className="text-sm text-gray-600">Within 6 months</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-2xl font-semibold text-blue-600 mb-1">$155K</div>
                        <div className="text-gray-700 font-medium">Average Salary</div>
                        <div className="text-sm text-gray-600">Starting position</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-2xl font-semibold text-purple-600 mb-1">85%</div>
                        <div className="text-gray-700 font-medium">Global Placement</div>
                        <div className="text-sm text-gray-600">International opportunities</div>
                      </div>
                    </div>

                    {/* Career Paths */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Top Career Paths</h4>
                      <div className="space-y-4">
                        {careerOutcomes.map((outcome, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-medium text-sm">
                                  {outcome.percentage}%
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-900">{outcome.role}</h5>
                                  <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span>
                                      Avg Salary:{" "}
                                      <span className="font-medium text-green-600">{outcome.avgSalary}</span>
                                    </span>
                                    <span>
                                      Growth: <span className="font-medium text-blue-600">{outcome.growth}</span>
                                    </span>
                                    <div className="flex items-center gap-1">
                                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                      <span className="font-medium">{outcome.satisfaction}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <Progress value={outcome.percentage} className="w-24 h-2 mb-1" />
                                <div className="text-xs text-gray-600">{outcome.percentage}% of graduates</div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {outcome.companies.map((company, companyIndex) => (
                                <Badge key={companyIndex} variant="outline" className="text-xs">
                                  {company}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Quick Actions */}
              <Card className="border border-gray-200">
                <CardHeader className="border-b border-gray-200 bg-blue-50">
                  <CardTitle className="text-base font-semibold text-gray-900">Schedule & Connect</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <Button variant="outline" className="w-full border-gray-300 py-2 bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Call
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300 py-2 bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    Schedule Interview
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300 py-2 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </Button>
                </CardContent>
              </Card>

              {/* Key Information */}
              <Card className="border border-gray-200">
                <CardHeader className="border-b border-gray-200 bg-blue-50">
                  <CardTitle className="text-base font-semibold text-gray-900">Program Details</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium text-gray-900">{course.duration}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Annual Fee</span>
                    <span className="font-medium text-gray-900">$50,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Next Intake</span>
                    <span className="font-medium text-gray-900">
                      {course.intake && course.intake.length > 0 ? `${course.intake[0]} 2024` : "Contact for Details"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Class Size</span>
                    <span className="font-medium text-gray-900">120 Students</span>
                  </div>
                </CardContent>
              </Card>

              {/* Campus Preview - Updated with moderate banner size */}
              <Card className="border border-gray-200">
                <CardHeader className="border-b border-gray-200 bg-blue-50">
                  <CardTitle className="text-base font-semibold text-gray-900">Campus</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                    <Image src="/oxford-campus.jpg" alt={`${university.name} campus`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-20" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <h4 className="font-medium text-sm">Historic Oxford Campus</h4>
                      <p className="text-xs opacity-90">Computer Science Department</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-gray-300 py-2 bg-transparent">
                    <Video className="w-4 h-4 mr-2" />
                    Virtual Tour
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="border border-gray-200">
                <CardHeader className="border-b border-gray-200 bg-blue-50">
                  <CardTitle className="text-base font-semibold text-gray-900">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  {[
                    { icon: ExternalLink, text: "University Website" },
                    { icon: Mail, text: "Contact Admissions" },
                    { icon: Map, text: "Campus Map" },
                    { icon: Info, text: "Student Handbook" },
                  ].map((link, index) => (
                    <Button key={index} variant="ghost" className="w-full justify-start p-2 h-auto text-left">
                      <link.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span className="text-sm">{link.text}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
