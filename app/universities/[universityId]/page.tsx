"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LeadForm } from "@/components/lead-form"
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Award,
  BookOpen,
  GraduationCap,
  Building,
  Trophy,
  Microscope,
  CheckCircle,
  ExternalLink,
  Phone,
  Mail,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { studyAbroadUniversities } from "@/lib/sample-data"

interface UniversityPageProps {
  params: {
    universityId: string
  }
}

export default function UniversityPage({ params }: UniversityPageProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedImage, setSelectedImage] = useState(0)

  console.log("[v0] Looking for university with ID:", params.universityId)
  console.log(
    "[v0] Available universities:",
    studyAbroadUniversities.map((u) => ({ id: u.id, name: u.name })),
  )

  // Find the university
  const foundUniversity = studyAbroadUniversities.find((u) => u.id === params.universityId)

  console.log("[v0] Found university:", foundUniversity ? foundUniversity.name : "Not found")

  if (!foundUniversity) {
    console.log("[v0] University not found, calling notFound()")
    notFound()
  }

  const university = {
    ...foundUniversity,
    accreditations: foundUniversity.accreditations || [],
    courses: foundUniversity.courses || [],
    campusImages: foundUniversity.campusImages || [],
    studentReviews: foundUniversity.studentReviews || [],
  }

  console.log("[v0] University data after defaults:", {
    hasAccreditations: !!university.accreditations.length,
    hasCourses: !!university.courses.length,
    hasCampusImages: !!university.campusImages.length,
    hasStudentReviews: !!university.studentReviews.length,
  })

  const carouselImages =
    university.campusImages && university.campusImages.length > 0
      ? university.campusImages
      : ["/university-campus-aerial.png", "/university-library-students.png"]

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const getIconForStat = (icon: string) => {
    switch (icon) {
      case "trophy":
        return <Trophy className="h-6 w-6" />
      case "users":
        return <Users className="h-6 w-6" />
      case "microscope":
        return <Microscope className="h-6 w-6" />
      case "award":
        return <Award className="h-6 w-6" />
      default:
        return <Star className="h-6 w-6" />
    }
  }

  // Extract course names for the lead form
  const courseNames = university.courses.map((course) => course.name)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section with Lead Form */}
      <div className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={university.image || university.campusImages?.[0] || "/placeholder.svg"}
            alt={university.name}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-indigo-900/80" />
        </div>

        {/* Hero Content with Lead Form */}
        <div className="relative z-10 container mx-auto px-2 py-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-2 text-white pl-2">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={university.logo || "/placeholder.svg"}
                  alt={`${university.name} logo`}
                  width={80}
                  height={80}
                  className="bg-white p-2 rounded-lg shadow-lg"
                />
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-2">{university.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-lg">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {university.city}, {university.country}
                    </span>
                    <span className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      World Rank #{university.ranking}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xl mb-6 max-w-3xl leading-relaxed text-blue-100">
                {university.description || university.about}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                  <div className="text-2xl font-bold text-white">{university.courses?.length || 150}+</div>
                  <div className="text-sm text-blue-200">Courses Offered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-purple-200" />
                  <div className="text-2xl font-bold text-white">45,000+</div>
                  <div className="text-sm text-purple-200">Students</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                  <Building className="h-8 w-8 mx-auto mb-2 text-indigo-200" />
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-sm text-indigo-200">Campus Facilities</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-200" />
                  <div className="text-2xl font-bold text-white">95%</div>
                  <div className="text-sm text-yellow-200">Employment Rate</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                  <Phone className="h-5 w-5 mr-2" />
                  Get Free Counseling
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Download Brochure
                </Button>
              </div>
            </div>

            {/* Right Side - Lead Form */}
            <div className="lg:col-span-1">
              <LeadForm universityName={university.name} courses={courseNames} className="sticky top-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex w-full h-12 items-center justify-evenly rounded-full bg-gradient-to-r from-violet-700 to-purple-800 p-1 shadow-lg border border-white/20 text-white">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white/30 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:backdrop-blur-sm data-[state=inactive]:text-white/80 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/20 transition-all duration-300 rounded-full font-medium px-6 py-2 flex-1"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-white/30 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:backdrop-blur-sm data-[state=inactive]:text-white/80 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/20 transition-all duration-300 rounded-full font-medium px-6 py-2 flex-1"
            >
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="admissions"
              className="data-[state=active]:bg-white/30 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:backdrop-blur-sm data-[state=inactive]:text-white/80 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/20 transition-all duration-300 rounded-full font-medium px-6 py-2 flex-1"
            >
              Admissions
            </TabsTrigger>
            <TabsTrigger
              value="success-stories"
              className="data-[state=active]:bg-white/30 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:backdrop-blur-sm data-[state=inactive]:text-white/80 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/20 transition-all duration-300 rounded-full font-medium px-6 py-2 flex-1"
            >
              Success Stories
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="data-[state=active]:bg-white/30 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:backdrop-blur-sm data-[state=inactive]:text-white/80 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/20 transition-all duration-300 rounded-full font-medium px-6 py-2 flex-1"
            >
              FAQ
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* About Section - SEO Optimized */}
                <Card className="shadow-lg" id="about-university">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Building className="h-6 w-6" />
                      About {university.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="max-w-md mx-auto mb-6">
                      <div className="relative rounded-xl overflow-hidden shadow-lg">
                        <div className="relative h-64 w-full">
                          <Image
                            src={carouselImages[selectedImage] || "/placeholder.svg"}
                            alt={`${university.name} campus ${selectedImage + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                          {/* Navigation Arrows */}
                          {carouselImages.length > 1 && (
                            <>
                              <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-1.5 transition-all duration-200"
                              >
                                <ChevronLeft className="h-4 w-4 text-white" />
                              </button>
                              <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-1.5 transition-all duration-200"
                              >
                                <ChevronRight className="h-4 w-4 text-white" />
                              </button>
                            </>
                          )}
                        </div>

                        {/* Small indicator dots */}
                        {carouselImages.length > 1 && (
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {carouselImages.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                                  index === selectedImage ? "bg-white" : "bg-white/50"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Why Choose {university.name}?</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {university.about ||
                          `${university.name} stands as one of the world's premier educational institutions, consistently ranked among the top universities globally. Established in ${university.establishedYear}, our university has been shaping future leaders and innovators for over ${new Date().getFullYear() - university.establishedYear} years through academic excellence and groundbreaking research.`}
                      </p>

                      <h3 className="text-xl font-semibold text-gray-800 mb-3">World-Class Facilities and Resources</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Our campus features state-of-the-art laboratories, extensive digital libraries, modern student
                        accommodation, and comprehensive recreational facilities. Students benefit from cutting-edge
                        technology, research opportunities, and access to industry partnerships that enhance their
                        learning experience and career prospects.
                      </p>

                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Global Alumni Network and Career Success
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {university.name} graduates join an elite network of over 500,000 alumni worldwide, including
                        Nobel Prize winners, Fortune 500 CEOs, government leaders, and innovative entrepreneurs. Our
                        career services team maintains strong relationships with top employers, ensuring excellent job
                        placement rates and internship opportunities.
                      </p>

                      <h3 className="text-xl font-semibold text-gray-800 mb-3">International Student Experience</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Located in the vibrant city of {university.city}, {university.country}, our diverse campus
                        welcomes students from over 100 countries. We provide comprehensive support services including
                        orientation programs, academic advising, career counseling, and cultural integration activities
                        to ensure international students thrive academically and socially.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Info */}
                <Card className="shadow-lg" id="quick-information">
                  <CardHeader>
                    <CardTitle>Quick Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">
                          {university.city}, {university.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Established {university.establishedYear}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">World Rank #{university.ranking}</p>
                      </div>
                    </div>
                    {university.rating && (
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="font-medium">{university.rating}/5.0</p>
                          <p className="text-sm text-gray-500">({university.reviewCount} reviews)</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Accreditations */}
                <Card className="shadow-lg" id="accreditations">
                  <CardHeader>
                    <CardTitle>Accreditations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {(university.accreditations && university.accreditations.length > 0
                        ? university.accreditations
                        : [
                            "AACSB Accredited",
                            "QS 5-Star Rating",
                            "Times Higher Education Ranked",
                            "Regional Accreditation",
                          ]
                      ).map((accreditation, index) => (
                        <Badge key={index} variant="outline">
                          {accreditation}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact CTA */}
                <Card className="bg-blue-50 border-blue-200 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">Need Guidance?</h3>
                    <p className="text-sm text-gray-600 mb-4">Get personalized counseling from our education experts</p>
                    <Button className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Get Free Counseling
                    </Button>
                  </CardContent>
                </Card>

                {/* Table of Contents */}
                <Card className="shadow-lg border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                      <BookOpen className="h-4 w-4" />
                      Table of Contents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <a
                        href="#about-university"
                        className="flex items-center gap-2 p-2 rounded hover:bg-blue-100 text-blue-700 hover:text-blue-800 transition-colors"
                      >
                        <ChevronRight className="h-3 w-3" />
                        About {university.name}
                      </a>
                      <a
                        href="#quick-information"
                        className="flex items-center gap-2 p-2 rounded hover:bg-blue-100 text-blue-700 hover:text-blue-800 transition-colors"
                      >
                        <ChevronRight className="h-3 w-3" />
                        Quick Information
                      </a>
                      <a
                        href="#accreditations"
                        className="flex items-center gap-2 p-2 rounded hover:bg-blue-100 text-blue-700 hover:text-blue-800 transition-colors"
                      >
                        <ChevronRight className="h-3 w-3" />
                        Accreditations & Rankings
                      </a>
                      <a
                        href="#admission-requirements"
                        className="flex items-center gap-2 p-2 rounded hover:bg-blue-100 text-blue-700 hover:text-blue-800 transition-colors"
                      >
                        <ChevronRight className="h-3 w-3" />
                        Admission Requirements
                      </a>
                      <a
                        href="#available-programs"
                        className="flex items-center gap-2 p-2 rounded hover:bg-blue-100 text-blue-700 hover:text-blue-800 transition-colors"
                      >
                        <ChevronRight className="h-3 w-3" />
                        Available Programs
                      </a>
                      <a
                        href="#student-life"
                        className="flex items-center gap-2 p-2 rounded hover:bg-blue-100 text-blue-700 hover:text-blue-800 transition-colors"
                      >
                        <ChevronRight className="h-3 w-3" />
                        Student Life & Campus
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <BookOpen className="h-6 w-6" />
                  Available Programs
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Explore our comprehensive range of academic programs designed to prepare you for success.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {university.courses.slice(0, 5).map((course, index) => (
                    <Card
                      key={index}
                      className="border-l-4 border-l-blue-500 hover:shadow-md transition-all duration-200 hover:border-l-blue-600"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">{course.name}</h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant="secondary" className="text-xs">
                                {course.level || "Graduate"}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {course.duration}
                              </Badge>
                              {course.scholarshipAvailable && (
                                <Badge className="bg-green-100 text-green-800 text-xs">Scholarship Available</Badge>
                              )}
                            </div>
                          </div>
                          <Button size="sm" asChild className="ml-4">
                            <Link href={`/universities/${university.id}/courses/${course.id}`}>
                              View Details
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admissions Tab */}
          <TabsContent value="admissions" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <GraduationCap className="h-6 w-6" />
                  Admission Requirements & Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-blue-600">Academic Requirements</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Bachelor's degree with minimum 3.0 GPA
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Official transcripts from all institutions
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Letters of recommendation (2-3)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Statement of Purpose
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-blue-600">Test Score Requirements</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        TOEFL: 100+ (iBT) or IELTS: 7.0+
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        GRE: 320+ (for graduate programs)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        GMAT: 700+ (for MBA programs)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Portfolio (for design/arts programs)
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3 text-blue-800">Application Deadlines</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">Fall Intake</div>
                      <div className="text-sm text-gray-600">January 15</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">Spring Intake</div>
                      <div className="text-sm text-gray-600">September 15</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">Summer Intake</div>
                      <div className="text-sm text-gray-600">March 1</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Success Stories Tab */}
          <TabsContent value="success-stories" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Star className="h-6 w-6" />
                  Success Stories & Testimonials
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Hear from our successful alumni and current students about their transformative experiences.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Image
                          src="/professional-headshot.png"
                          alt="Alumni"
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold text-lg">Sarah Johnson</h4>
                          <p className="text-sm text-blue-600 mb-2">Class of 2020, Computer Science</p>
                          <p className="text-gray-700 text-sm italic">
                            "The rigorous curriculum and world-class faculty at {university.name} prepared me
                            exceptionally well for my career at Google. The research opportunities were invaluable."
                          </p>
                          <div className="mt-3">
                            <Badge className="bg-green-100 text-green-800 text-xs">Software Engineer at Google</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Image
                          src="/diverse-business-professionals.png"
                          alt="Alumni"
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold text-lg">Michael Chen</h4>
                          <p className="text-sm text-purple-600 mb-2">Class of 2019, MBA</p>
                          <p className="text-gray-700 text-sm italic">
                            "The MBA program's emphasis on innovation and entrepreneurship helped me launch my own
                            startup. The alumni network has been incredibly supportive."
                          </p>
                          <div className="mt-3">
                            <Badge className="bg-purple-100 text-purple-800 text-xs">CEO & Founder</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Image
                          src="/placeholder-y9gkf.png"
                          alt="Alumni"
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold text-lg">Dr. Emily Rodriguez</h4>
                          <p className="text-sm text-green-600 mb-2">Class of 2018, PhD Biology</p>
                          <p className="text-gray-700 text-sm italic">
                            "The research facilities and mentorship I received were world-class. I'm now leading
                            groundbreaking research in biotechnology."
                          </p>
                          <div className="mt-3">
                            <Badge className="bg-green-100 text-green-800 text-xs">Research Scientist</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Image
                          src="/current-student.png"
                          alt="Current Student"
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold text-lg">Alex Kumar</h4>
                          <p className="text-sm text-orange-600 mb-2">Current Student, Engineering</p>
                          <p className="text-gray-700 text-sm italic">
                            "The diversity of opportunities here is amazing. From internships at top companies to
                            research projects, every day brings new learning experiences."
                          </p>
                          <div className="mt-3">
                            <Badge className="bg-orange-100 text-orange-800 text-xs">Current Student</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What are the admission requirements?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        Admission requirements vary by program. Generally, you'll need academic transcripts, language
                        proficiency scores, and letters of recommendation. Our counselors can provide detailed
                        requirements for your specific program of interest.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Are scholarships available for international students?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        Yes, we offer various merit-based and need-based scholarships for international students. These
                        can cover partial to full tuition fees based on academic excellence and financial need.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What is campus life like?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        Our campus offers a vibrant community with numerous clubs, societies, and cultural activities.
                        Students enjoy modern facilities, diverse dining options, and a supportive international
                        community.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I apply for accommodation?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        On-campus accommodation applications are typically submitted along with your academic
                        application. We offer various housing options including shared rooms, single rooms, and
                        apartment-style living.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Final CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Take the first step towards your dream education at {university.name}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-blue-600">
              <Phone className="h-5 w-5 mr-2" />
              Get Free Counseling
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Mail className="h-5 w-5 mr-2" />
              Download Brochure
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
