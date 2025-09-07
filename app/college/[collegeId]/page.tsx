"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
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
import { studyIndiaColleges } from "@/lib/sample-data"

interface CollegePageProps {
  params: {
    collegeId: string
  }
}

export default function CollegePage({ params }: CollegePageProps) {
  console.log("[v0] College page loading with collegeId:", params.collegeId)
  console.log(
    "[v0] Available colleges:",
    studyIndiaColleges.map((c) => ({ id: c.id, name: c.name })),
  )

  const [activeTab, setActiveTab] = useState("overview")
  const [selectedImage, setSelectedImage] = useState(0)

  const foundCollege = studyIndiaColleges.find((c) => c.id === params.collegeId)

  console.log("[v0] Found college:", foundCollege ? foundCollege.name : "Not found")

  if (!foundCollege) {
    console.log("[v0] College not found, calling notFound()")
    notFound()
  }

  const college = {
    ...foundCollege,
    location: foundCollege.location || `${foundCollege.city}, India`,
    state: foundCollege.state || "India",
    about:
      foundCollege.description ||
      foundCollege.highlights?.join(". ") ||
      `${foundCollege.name} is a premier educational institution in India.`,
    rating: foundCollege.rating || 4.5,
    reviewCount: foundCollege.reviewCount || 500,
    accreditations: foundCollege.accreditation || ["NAAC A+ Grade", "UGC Approved", "AICTE Approved"],
    campusImages: foundCollege.campusImages || [foundCollege.image],
    studentReviews: foundCollege.studentReviews || [],
    students: foundCollege.studentPopulation || foundCollege.studentCount || "15,000+",
    campuses: foundCollege.campuses || 1,
    placementRate: foundCollege.placementRate || "92",
  }

  const carouselImages =
    college.campusImages && college.campusImages.length > 0
      ? college.campusImages
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

  const courseNames = college.courses?.map((course) => course.name) || [college.defaultCourse || "General Program"]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-purple-900 via-violet-900 to-indigo-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={college.image || college.campusImages?.[0] || "/placeholder.svg"}
            alt={college.name}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-violet-900/80 to-indigo-900/80" />
        </div>

        {/* Hero Content with Lead Form */}
        <div className="relative z-10 container mx-auto px-2 py-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-2 text-white pl-2">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={college.logo || "/placeholder.svg"}
                  alt={`${college.name} logo`}
                  width={80}
                  height={80}
                  className="bg-white p-2 rounded-lg shadow-lg"
                />
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-2">{college.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-lg">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {college.location}
                    </span>
                    {college.ranking && (
                      <span className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        {typeof college.ranking === "string" ? college.ranking : `India Rank #${college.ranking}`}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xl mb-6 max-w-3xl leading-relaxed text-purple-100">{college.about}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-purple-200" />
                  <div className="text-2xl font-bold text-white">{college.courses?.length || 50}+</div>
                  <div className="text-sm text-purple-200">Courses Offered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-violet-200" />
                  <div className="text-2xl font-bold text-white">{college.students}</div>
                  <div className="text-sm text-violet-200">Students</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                  <Building className="h-8 w-8 mx-auto mb-2 text-indigo-200" />
                  <div className="text-2xl font-bold text-white">{college.campuses}</div>
                  <div className="text-sm text-indigo-200">Campus{college.campuses > 1 ? "es" : ""}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-200" />
                  <div className="text-2xl font-bold text-white">{college.placementRate}%</div>
                  <div className="text-sm text-yellow-200">Placement Rate</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
                  <Phone className="h-5 w-5 mr-2" />
                  Get Free Counseling
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-900 bg-transparent"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Download Brochure
                </Button>
              </div>
            </div>

            {/* Right Side - Lead Form */}
            <div className="lg:col-span-1">
              <LeadForm universityName={college.name} courses={courseNames} className="sticky top-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex w-full h-12 items-center justify-evenly rounded-full bg-gradient-to-r from-purple-700 to-violet-800 p-1 shadow-lg border border-white/20 text-white">
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
                {/* About Section */}
                <Card className="shadow-lg" id="about-college">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Building className="h-6 w-6" />
                      About {college.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="max-w-md mx-auto mb-6">
                      <div className="relative rounded-xl overflow-hidden shadow-lg">
                        <div className="relative h-64 w-full">
                          <Image
                            src={carouselImages[selectedImage] || "/placeholder.svg"}
                            alt={`${college.name} campus ${selectedImage + 1}`}
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
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Why Choose {college.name}?</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">{college.about}</p>

                      {college.highlights && college.highlights.length > 0 && (
                        <>
                          <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Highlights</h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                            {college.highlights.map((highlight, index) => (
                              <li key={index}>{highlight}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      {college.facilities && college.facilities.length > 0 && (
                        <>
                          <h3 className="text-xl font-semibold text-gray-800 mb-3">World-Class Facilities</h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                            {college.facilities.map((facility, index) => (
                              <li key={index}>{facility}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Student Life and Campus Experience</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Located in {college.city || college.location}, our vibrant campus welcomes students from across
                        India. We provide comprehensive support services including orientation programs, academic
                        advising, career counseling, and cultural activities to ensure students thrive academically and
                        personally.
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
                        <p className="font-medium">{college.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Established {college.establishedYear}</p>
                      </div>
                    </div>
                    {college.ranking && (
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">
                            {typeof college.ranking === "string" ? college.ranking : `India Rank #${college.ranking}`}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">{college.rating}/5.0</p>
                        <p className="text-sm text-gray-500">({college.reviewCount} reviews)</p>
                      </div>
                    </div>
                    {college.acceptanceRate && (
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Acceptance Rate: {college.acceptanceRate}</p>
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
                      {college.accreditations.map((accreditation, index) => (
                        <Badge key={index} variant="outline">
                          {accreditation}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">Need Guidance?</h3>
                    <p className="text-sm text-gray-600 mb-4">Get personalized counseling from our education experts</p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Get Free Counseling
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-purple-200 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-purple-800">
                      <BookOpen className="h-4 w-4" />
                      Table of Contents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <a
                        href="#about-college"
                        className="flex items-center gap-2 p-2 rounded hover:bg-purple-100 text-purple-700 hover:text-purple-800 transition-colors"
                      >
                        <ChevronRight className="h-3 w-3" />
                        About {college.name}
                      </a>
                      <a
                        href="#quick-information"
                        className="flex items-center gap-2 p-2 rounded hover:bg-purple-100 text-purple-700 hover:text-purple-800 transition-colors"
                      >
                        <ChevronRight className="h-3 w-3" />
                        Quick Information
                      </a>
                      <a
                        href="#accreditations"
                        className="flex items-center gap-2 p-2 rounded hover:bg-purple-100 text-purple-700 hover:text-purple-800 transition-colors"
                      >
                        <ChevronRight className="h-3 w-3" />
                        Accreditations & Rankings
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
                  {(college.courses && college.courses.length > 0
                    ? college.courses
                    : [
                        {
                          name: college.defaultCourse || "Computer Science Engineering",
                          degree: "Undergraduate",
                          duration: "4 years",
                          id: "default",
                        },
                      ]
                  )
                    .slice(0, 5)
                    .map((course, index) => (
                      <Card
                        key={index}
                        className="border-l-4 border-l-purple-500 hover:shadow-md transition-all duration-200 hover:border-l-purple-600"
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-2 text-gray-900">{course.name}</h3>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="secondary" className="text-xs">
                                  {course.degree || "Undergraduate"}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {course.duration || "4 years"}
                                </Badge>
                                {course.scholarshipAvailable && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">Scholarship Available</Badge>
                                )}
                                {course.fees && (
                                  <Badge variant="outline" className="text-xs">
                                    ₹{typeof course.fees === "number" ? course.fees.toLocaleString() : course.fees}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Button size="sm" className="ml-4 bg-purple-600 hover:bg-purple-700">
                              View Details
                              <ChevronRight className="h-4 w-4 ml-1" />
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
                    <h4 className="font-semibold text-lg mb-3 text-purple-600">Academic Requirements</h4>
                    <ul className="space-y-2 text-gray-700">
                      {(
                        college.admissionRequirements || [
                          "12th standard with minimum 75% marks",
                          "Valid entrance exam scores",
                          "Original certificates and transcripts",
                          "Character certificate from previous institution",
                        ]
                      ).map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-purple-600">Contact Information</h4>
                    <div className="space-y-3">
                      {college.contactInfo?.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{college.contactInfo.email}</span>
                        </div>
                      )}
                      {college.contactInfo?.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{college.contactInfo.phone}</span>
                        </div>
                      )}
                      {college.contactInfo?.website && (
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-gray-500" />
                          <a
                            href={college.contactInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Official Website
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {college.averageFees && (
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3 text-purple-800">Fee Structure</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="font-semibold text-purple-600">Tuition Fees</div>
                        <div className="text-sm text-gray-600">
                          ₹{college.averageFees.tuition?.toLocaleString()}/year
                        </div>
                      </div>
                      {college.averageFees.living && (
                        <div className="text-center">
                          <div className="font-semibold text-purple-600">Living Expenses</div>
                          <div className="text-sm text-gray-600">
                            ₹{college.averageFees.living.toLocaleString()}/year
                          </div>
                        </div>
                      )}
                      <div className="text-center">
                        <div className="font-semibold text-purple-600">Total Cost</div>
                        <div className="text-sm text-gray-600">₹{college.averageFees.total?.toLocaleString()}/year</div>
                      </div>
                    </div>
                  </div>
                )}
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
                  <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
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
                          <h4 className="font-semibold text-lg">Priya Sharma</h4>
                          <p className="text-sm text-purple-600 mb-2">Class of 2020, Computer Science</p>
                          <p className="text-gray-700 text-sm italic">
                            "The rigorous curriculum and excellent faculty at {college.name} prepared me exceptionally
                            well for my career at TCS. The placement support was outstanding."
                          </p>
                          <div className="mt-3">
                            <Badge className="bg-green-100 text-green-800 text-xs">Software Engineer at TCS</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
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
                          <h4 className="font-semibold text-lg">Rahul Kumar</h4>
                          <p className="text-sm text-indigo-600 mb-2">Class of 2019, MBA</p>
                          <p className="text-gray-700 text-sm italic">
                            "The MBA program's focus on practical learning and industry exposure helped me secure a
                            leadership role at Infosys. The alumni network is incredibly supportive."
                          </p>
                          <div className="mt-3">
                            <Badge className="bg-indigo-100 text-indigo-800 text-xs">Project Manager at Infosys</Badge>
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
                          <h4 className="font-semibold text-lg">Dr. Anjali Patel</h4>
                          <p className="text-sm text-green-600 mb-2">Class of 2018, Biotechnology</p>
                          <p className="text-gray-700 text-sm italic">
                            "The research opportunities and mentorship I received were exceptional. I'm now pursuing my
                            PhD and working on groundbreaking research in biotechnology."
                          </p>
                          <div className="mt-3">
                            <Badge className="bg-green-100 text-green-800 text-xs">PhD Researcher</Badge>
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
                          <h4 className="font-semibold text-lg">Arjun Singh</h4>
                          <p className="text-sm text-orange-600 mb-2">Current Student, Mechanical Engineering</p>
                          <p className="text-gray-700 text-sm italic">
                            "The hands-on learning approach and industry partnerships provide amazing opportunities.
                            I've already secured an internship at Mahindra through campus placements."
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
                        Admission requirements vary by program. Generally, you'll need 12th standard marks, entrance
                        exam scores, and original certificates. Our counselors can provide detailed requirements for
                        your specific program of interest.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Are scholarships available for students?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        Yes, we offer various merit-based and need-based scholarships for deserving students. These can
                        cover partial to full tuition fees based on academic excellence and financial need.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What is campus life like?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        Our campus offers a vibrant community with numerous clubs, societies, and cultural activities.
                        Students enjoy modern facilities, diverse dining options, and a supportive academic environment.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I apply for hostel accommodation?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        Hostel accommodation applications are typically submitted along with your academic application.
                        We offer separate hostels for boys and girls with modern amenities and security.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-violet-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Take the first step towards your dream education at {college.name}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-purple-600">
              <Phone className="h-5 w-5 mr-2" />
              Get Free Counseling
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
            >
              <Mail className="h-5 w-5 mr-2" />
              Download Brochure
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
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
