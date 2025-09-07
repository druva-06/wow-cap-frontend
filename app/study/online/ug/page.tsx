"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ModernLeadForm } from "@/components/modern-lead-form"
import {
  Users,
  GraduationCap,
  TrendingUp,
  Globe,
  DollarSign,
  Star,
  Phone,
  Mail,
  Laptop,
  Clock,
  Target,
  Play,
  BookOpen,
  Zap,
  Shield,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Calculator,
  PiggyBank,
} from "lucide-react"

const keyStats = [
  { icon: <Users className="h-8 w-8" />, label: "Students Enrolled", value: "2M+" },
  { icon: <GraduationCap className="h-8 w-8" />, label: "Course Options", value: "500+" },
  { icon: <TrendingUp className="h-8 w-8" />, label: "Job Placement", value: "85%" },
  { icon: <Globe className="h-8 w-8" />, label: "Countries", value: "190+" },
]

const whyStudyOnline = [
  {
    icon: <Laptop className="h-6 w-6" />,
    title: "Flexible Learning",
    description: "Study at your own pace from anywhere in the world with 24/7 access to course materials",
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "Cost-Effective",
    description: "Save up to 60% compared to traditional on-campus programs with no hidden fees",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Work While You Study",
    description: "Balance your career and education with flexible scheduling and part-time options",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Recognition",
    description: "Earn degrees from accredited universities recognized worldwide by employers",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Industry-Relevant",
    description: "Curriculum designed with industry experts to meet current market demands",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Expert Faculty",
    description: "Learn from experienced professors and industry professionals from top universities",
  },
]

const popularUGCourses = [
  {
    id: "bca-online-manipal",
    title: "BCA Online",
    provider: "Manipal University Online",
    image: "/manipal-bca-online.png",
    duration: "3 years",
    fee: "₹80,000/year",
    rating: 4.8,
    students: "12,000+",
  },
  {
    id: "bba-online-jain",
    title: "BBA Online",
    provider: "Jain University Online",
    image: "/jain-bba-online.png",
    duration: "3 years",
    fee: "₹75,000/year",
    rating: 4.7,
    students: "8,500+",
  },
  {
    id: "computer-science-ug",
    title: "Bachelor of Computer Science",
    provider: "Arizona State University Online",
    image: "/computer-science-course.png",
    duration: "4 years",
    fee: "$15,000/year",
    rating: 4.9,
    students: "6,200+",
  },
  {
    id: "business-administration-ug",
    title: "Bachelor of Business Administration",
    provider: "Penn State World Campus",
    image: "/business-admin-course.png",
    duration: "4 years",
    fee: "$18,000/year",
    rating: 4.6,
    students: "5,800+",
  },
  {
    id: "data-science-ug",
    title: "Bachelor of Data Science",
    provider: "University of London Online",
    image: "/data-science-course.png",
    duration: "3 years",
    fee: "£12,000/year",
    rating: 4.9,
    students: "4,500+",
  },
  {
    id: "digital-marketing-ug",
    title: "Bachelor of Digital Marketing",
    provider: "SNHU Online",
    image: "/digital-marketing-course.png",
    duration: "4 years",
    fee: "$12,500/year",
    rating: 4.6,
    students: "3,200+",
  },
  {
    id: "psychology-ug",
    title: "Bachelor of Psychology",
    provider: "University of Arizona Online",
    image: "/psychology-course.png",
    duration: "4 years",
    fee: "$14,000/year",
    rating: 4.5,
    students: "7,200+",
  },
  {
    id: "nursing-ug",
    title: "Bachelor of Nursing (RN-BSN)",
    provider: "Chamberlain University",
    image: "/nursing-course.png",
    duration: "2 years",
    fee: "$16,500/year",
    rating: 4.8,
    students: "9,800+",
  },
  {
    id: "cybersecurity-ug",
    title: "Bachelor of Cybersecurity",
    provider: "UMGC Online",
    image: "/cybersecurity-course.png",
    duration: "4 years",
    fee: "$13,200/year",
    rating: 4.7,
    students: "4,500+",
  },
  {
    id: "graphic-design-ug",
    title: "Bachelor of Graphic Design",
    provider: "SNHU Online",
    image: "/graphic-design-course.png",
    duration: "4 years",
    fee: "$11,800/year",
    rating: 4.4,
    students: "3,200+",
  },
  {
    id: "accounting-ug",
    title: "Bachelor of Accounting",
    provider: "Penn State World Campus",
    image: "/accounting-course.png",
    duration: "4 years",
    fee: "$17,200/year",
    rating: 4.6,
    students: "6,800+",
  },
  {
    id: "education-ug",
    title: "Bachelor of Education",
    provider: "ASU Online",
    image: "/education-course.png",
    duration: "4 years",
    fee: "$15,800/year",
    rating: 4.5,
    students: "5,400+",
  },
]

const allUGPartners = [
  { name: "Manipal University Online", logo: "/manipal-university-online-logo.png" },
  { name: "Jain University Online", logo: "/jain-university-online-logo.png" },
  { name: "Arizona State University", logo: "/asu-logo.png" },
  { name: "Penn State World Campus", logo: "/penn-state-logo.png" },
  { name: "University of London", logo: "/university-london-logo.png" },
  { name: "Southern New Hampshire University", logo: "/snhu-logo.png" },
  { name: "University of Maryland Global Campus", logo: "/umgc-logo.png" },
  { name: "Chamberlain University", logo: "/chamberlain-logo.png" },
  { name: "Colorado State University", logo: "/csu-logo.png" },
  { name: "University of Arizona", logo: "/ua-logo.png" },
  { name: "Purdue University Global", logo: "/purdue-global-logo.png" },
  { name: "Liberty University", logo: "/liberty-logo.png" },
  { name: "Western Governors University", logo: "/wgu-logo.png" },
  { name: "Grand Canyon University", logo: "/gcu-logo.png" },
]

const featuredSuccessStory = {
  name: "Rahul Sharma",
  title: "Software Engineer",
  company: "Infosys",
  program: "BCA Online",
  university: "Manipal University Online",
  image: "/student-rahul-featured.png",
  quote:
    "The online BCA program allowed me to work part-time while studying. Within 6 months of graduation, I landed a software engineer role at Infosys with a 200% salary increase. The flexibility and quality education changed my life completely.",
  achievements: [
    { label: "Salary Increase", value: "200%", color: "text-green-600" },
    { label: "Job Timeline", value: "6 months", color: "text-blue-600" },
    { label: "Career Switch", value: "Success", color: "text-purple-600" },
    { label: "Work Experience", value: "2+ years", color: "text-orange-600" },
  ],
  rating: 5,
}

const smallSuccessStories = [
  {
    name: "Priya Patel",
    program: "BBA Online",
    image: "/student-priya-ug.png",
    achievement: "Marketing Manager at TCS",
    rating: 5,
  },
  {
    name: "Amit Kumar",
    program: "BCA Online",
    image: "/student-amit.png",
    achievement: "Full Stack Developer",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    program: "Bachelor of Psychology",
    image: "/student-sarah-ug.png",
    achievement: "HR Director",
    rating: 5,
  },
  {
    name: "David Chen",
    program: "Bachelor of Data Science",
    image: "/student-david.png",
    achievement: "Data Analyst at Google",
    rating: 5,
  },
]

export default function StudyOnlineUGPage() {
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0)
  const [currentPartnerPage, setCurrentPartnerPage] = useState(0)
  const router = useRouter()

  const coursesPerView = 4
  const partnersPerPage = 12
  const totalPartnerPages = Math.ceil(allUGPartners.length / partnersPerPage)

  const nextCourses = () => {
    setCurrentCourseIndex((prev) => (prev + coursesPerView >= popularUGCourses.length ? 0 : prev + coursesPerView))
  }

  const prevCourses = () => {
    setCurrentCourseIndex((prev) =>
      prev === 0 ? Math.max(0, popularUGCourses.length - coursesPerView) : prev - coursesPerView,
    )
  }

  const nextPartnerPage = () => {
    setCurrentPartnerPage((prev) => (prev + 1 >= totalPartnerPages ? 0 : prev + 1))
  }

  const prevPartnerPage = () => {
    setCurrentPartnerPage((prev) => (prev - 1 < 0 ? totalPartnerPages - 1 : prev - 1))
  }

  const currentPartners = allUGPartners.slice(
    currentPartnerPage * partnersPerPage,
    (currentPartnerPage + 1) * partnersPerPage,
  )

  const visibleCourses = popularUGCourses.slice(currentCourseIndex, currentCourseIndex + coursesPerView)

  const handleGetCounseling = () => {
    router.push("/contact")
  }

  const handleDownloadGuide = () => {
    const link = document.createElement("a")
    link.href = "/program-guide-online-ug.pdf"
    link.download = "Online-UG-Program-Guide.pdf"
    link.click()
  }

  const handleStartApplication = () => {
    router.push("/apply")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/online-learning-pattern.svg')] bg-repeat"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-2 text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Earn Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Bachelor's Degree
                </span>
                <span className="block">Online</span>
              </h1>

              <p className="text-xl mb-8 text-blue-100 leading-relaxed max-w-2xl">
                Join millions of students worldwide earning accredited undergraduate degrees from top universities.
                Study at your own pace, work while you learn, and advance your career with flexible online education.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {keyStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2 text-blue-300">{stat.icon}</div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100" onClick={handleGetCounseling}>
                  <Phone className="h-5 w-5 mr-2" />
                  Get Free Counseling
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
                  onClick={() => window.open("https://www.youtube.com/watch?v=demo", "_blank")}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Right Side - Lead Form */}
            <div className="lg:col-span-1">
              <ModernLeadForm countryName="Online Undergraduate" />
            </div>
          </div>
        </div>
      </div>

      {/* Why Study Online */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Study Undergraduate Online?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the advantages of earning your bachelor's degree through flexible online learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyStudyOnline.map((point, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">{point.icon}</div>
                    <h3 className="text-xl font-semibold">{point.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Popular Undergraduate Programs</h2>
            <p className="text-xl text-gray-600">Explore high-demand bachelor's degree programs</p>
          </div>

          <div className="relative">
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={prevCourses}
                className="flex items-center gap-2 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextCourses}
                className="flex items-center gap-2 bg-transparent"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {visibleCourses.map((course, index) => (
                <Link key={index} href={`/courses/${course.id}`} className="block">
                  <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative h-24">
                      <Image
                        src={course.image || `/placeholder.svg?height=96&width=200&query=${course.title} course`}
                        alt={course.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className="absolute top-1 right-1">
                        <Badge className="bg-green-500 text-white text-xs px-1 py-0">
                          <Star className="w-2 h-2 mr-1" />
                          {course.rating}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-bold text-base mb-1 line-clamp-2">{course.title}</h3>
                      <p className="text-xs text-blue-600 mb-2">{course.provider}</p>
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          {course.duration}
                        </Badge>
                        <span className="text-xs text-gray-500">{course.students}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-green-600">{course.fee}</span>
                        <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-6 bg-transparent">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top University Partners */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Top University Partners</h2>
            <p className="text-xl text-gray-600">Study with world-renowned institutions</p>
          </div>

          <div className="grid grid-cols-6 gap-6 mb-8">
            {currentPartners.map((partner, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-20 h-20 mx-auto mb-2 relative group-hover:scale-105 transition-transform">
                  <Image
                    src={partner.logo || `/placeholder.svg?height=80&width=80&query=${partner.name} university logo`}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-medium text-sm text-center">{partner.name}</h3>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4">
            <Button variant="outline" size="sm" onClick={prevPartnerPage}>
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {currentPartnerPage + 1} of {totalPartnerPages}
            </span>
            <Button variant="outline" size="sm" onClick={nextPartnerPage}>
              Next
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Online Courses */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Online Undergraduate Courses?</h2>
            <p className="text-xl text-gray-600">Experience the future of higher education</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Accelerated Learning</h3>
                <p className="text-gray-600 mb-6">
                  Complete your degree faster with intensive courses and year-round enrollment options
                </p>
                <ul className="text-left space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">8-week course format</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Multiple start dates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Credit for experience</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Accredited Programs</h3>
                <p className="text-gray-600 mb-6">
                  All programs are fully accredited and recognized by employers worldwide
                </p>
                <ul className="text-left space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Regional accreditation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Industry recognition</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Transfer credits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Career Support</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive career services to help you land your dream job after graduation
                </p>
                <ul className="text-left space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Resume building</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Interview preparation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Job placement assistance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cost and Planning */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Investment & Financial Planning</h2>
            <p className="text-xl text-gray-600">Smart investment strategies for your bachelor's degree in India</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calculator className="h-5 w-5" />
                    Program Costs (India)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Average Investment</p>
                      <p className="text-2xl font-bold text-blue-600">₹80,000 - ₹1,20,000</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Tuition & Fees</span>
                        <span className="font-semibold">80%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Technology & Resources</span>
                        <span className="font-semibold">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Books & Materials</span>
                        <span className="font-semibold">5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5" />
                    Career ROI (India)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Salary Increase</p>
                      <p className="text-2xl font-bold text-green-600">65-85%</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>Job Placement</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>Career Growth</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>Skill Enhancement</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <PiggyBank className="h-5 w-5" />
                    Education Loan Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Loan Approval Rate</p>
                      <p className="text-2xl font-bold text-purple-600">85%</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>SBI Education Loan</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>HDFC Credila</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>Axis Bank Education Loan</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 mb-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Education Loan Support</h3>
                  <p className="text-gray-600">Get financial assistance for your online bachelor's degree</p>
                </div>

                <div className="flex justify-center items-center gap-8 mb-6">
                  <Image src="/sbi-logo.png" alt="SBI" width={80} height={50} className="object-contain" />
                  <Image src="/hdfc-bank-logo.png" alt="HDFC" width={80} height={50} className="object-contain" />
                  <Image src="/axis-bank-logo.png" alt="Axis Bank" width={80} height={50} className="object-contain" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-semibold">Quick Approval</p>
                      <p className="text-xs text-gray-600">10-15 days</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-semibold">No Collateral</p>
                      <p className="text-xs text-gray-600">Up to ₹4L</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-semibold">Flexible EMI</p>
                      <p className="text-xs text-gray-600">After graduation</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-semibold">Tax Benefits</p>
                      <p className="text-xs text-gray-600">Section 80E</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Hear from graduates who transformed their careers</p>
          </div>

          <Card className="mb-12 shadow-xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-8 text-white">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <Image
                    src={featuredSuccessStory.image || "/placeholder.svg?height=120&width=120&text=Student"}
                    alt={featuredSuccessStory.name}
                    width={120}
                    height={120}
                    className="rounded-full mx-auto mb-4 border-4 border-white"
                  />
                  <h3 className="text-2xl font-bold mb-1">{featuredSuccessStory.name}</h3>
                  <p className="text-blue-200 mb-1">{featuredSuccessStory.title}</p>
                  <p className="text-blue-100 text-sm">{featuredSuccessStory.company}</p>
                  <div className="flex justify-center mt-2">
                    {[...Array(featuredSuccessStory.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <blockquote className="text-xl italic mb-6 leading-relaxed">
                    "{featuredSuccessStory.quote}"
                  </blockquote>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {featuredSuccessStory.achievements.map((achievement, index) => (
                      <div key={index} className="text-center">
                        <p className="text-2xl font-bold mb-1" style={{ color: achievement.color }}>
                          {achievement.value}
                        </p>
                        <p className="text-sm text-blue-200">{achievement.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {smallSuccessStories.map((story, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <Image
                    src={story.image || "/placeholder.svg?height=80&width=80&text=Student"}
                    alt={story.name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-bold mb-1">{story.name}</h3>
                  <p className="text-sm text-blue-600 mb-2">{story.program}</p>
                  <p className="text-sm text-gray-700 mb-3">{story.achievement}</p>
                  <div className="flex justify-center">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Online Bachelor's Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students who chose flexible online education to advance their careers. Start your
            application today and take the first step towards your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-blue-600" onClick={handleGetCounseling}>
              <Phone className="h-5 w-5 mr-2" />
              Get Free Counseling
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              onClick={handleDownloadGuide}
            >
              <Mail className="h-5 w-5 mr-2" />
              Download Program Guide
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              onClick={handleStartApplication}
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Start Application
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
