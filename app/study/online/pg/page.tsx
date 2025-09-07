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
  Clock,
  Target,
  Play,
  BookOpen,
  Zap,
  Shield,
  CheckCircle,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Calculator,
  PiggyBank,
} from "lucide-react"

const keyStats = [
  { icon: <Users className="h-8 w-8" />, label: "Students Enrolled", value: "1.5M+" },
  { icon: <GraduationCap className="h-8 w-8" />, label: "Master's Programs", value: "300+" },
  { icon: <TrendingUp className="h-8 w-8" />, label: "Salary Increase", value: "40%" },
  { icon: <Globe className="h-8 w-8" />, label: "Countries", value: "190+" },
]

const whyStudyOnlinePG = [
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Career Advancement",
    description: "Advance your career while working full-time with evening and weekend classes",
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "Higher ROI",
    description: "Master's degree holders earn 40% more on average with faster career progression",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Accelerated Programs",
    description: "Complete your master's degree in 12-24 months with intensive online formats",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Networking",
    description: "Connect with professionals worldwide and build valuable industry networks",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Specialized Skills",
    description: "Develop advanced expertise in your field with cutting-edge curriculum",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Industry Leaders",
    description: "Learn from practicing professionals and thought leaders in your industry",
  },
]

const popularPGCourses = [
  {
    id: "mba-online-manipal",
    title: "MBA Online",
    provider: "Manipal University Online",
    image: "/manipal-mba-online.png",
    duration: "2 years",
    fee: "₹1,20,000/year",
    rating: 4.9,
    students: "15,000+",
  },
  {
    id: "ms-computer-science-jain",
    title: "MS Computer Science",
    provider: "Jain University Online",
    image: "/jain-ms-cs-online.png",
    duration: "2 years",
    fee: "₹1,50,000 total",
    rating: 4.8,
    students: "10,000+",
  },
  {
    id: "ms-data-science",
    title: "MS Data Science",
    provider: "University of Illinois",
    image: "/ms-data-science-course.png",
    duration: "2 years",
    fee: "$22,000 total",
    rating: 4.7,
    students: "8,500+",
  },
  {
    id: "ms-cybersecurity",
    title: "MS Cybersecurity",
    provider: "Penn State",
    image: "/ms-cybersecurity-course.png",
    duration: "2 years",
    fee: "$28,000 total",
    rating: 4.6,
    students: "6,200+",
  },
  {
    id: "ms-marketing",
    title: "MS Digital Marketing",
    provider: "Southern New Hampshire",
    image: "/ms-marketing-course.png",
    duration: "18 months",
    fee: "$18,000 total",
    rating: 4.5,
    students: "5,800+",
  },
  {
    id: "ms-finance",
    title: "MS Finance",
    provider: "University of Maryland",
    image: "/ms-finance-course.png",
    duration: "2 years",
    fee: "$32,000 total",
    rating: 4.7,
    students: "7,200+",
  },
  {
    id: "ms-healthcare",
    title: "MS Healthcare Management",
    provider: "Johns Hopkins",
    image: "/ms-healthcare-course.png",
    duration: "2 years",
    fee: "$35,000 total",
    rating: 4.8,
    students: "4,500+",
  },
  {
    id: "ms-engineering",
    title: "MS Engineering Management",
    provider: "Stanford Online",
    image: "/ms-engineering-course.png",
    duration: "2 years",
    fee: "$45,000 total",
    rating: 4.9,
    students: "3,200+",
  },
]

const allPGPartners = [
  { name: "Manipal University Online", logo: "/manipal-university-online-logo.png" },
  { name: "Jain University Online", logo: "/jain-university-online-logo.png" },
  { name: "Georgia Institute of Technology", logo: "/georgia-tech-logo.png" },
  { name: "Arizona State University", logo: "/asu-logo.png" },
  { name: "University of Illinois", logo: "/uiuc-logo.png" },
  { name: "Penn State University", logo: "/penn-state-logo.png" },
  { name: "Stanford University", logo: "/stanford-logo.png" },
  { name: "Johns Hopkins University", logo: "/johns-hopkins-logo.png" },
  { name: "University of Maryland", logo: "/umd-logo.png" },
  { name: "Southern New Hampshire University", logo: "/snhu-logo.png" },
  { name: "University of Southern California", logo: "/usc-logo.png" },
  { name: "Northeastern University", logo: "/northeastern-logo.png" },
  { name: "Boston University", logo: "/bu-logo.png" },
  { name: "Carnegie Mellon University", logo: "/cmu-logo.png" },
]

const featuredSuccessStory = {
  name: "Sarah Johnson",
  title: "Senior Director of Strategy",
  company: "Microsoft",
  program: "Executive MBA Online",
  university: "Arizona State University",
  image: "/student-sarah-featured.png",
  quote:
    "The online MBA program transformed my career trajectory. Within 8 months of graduation, I was promoted to Senior Director with a 120% salary increase. The flexibility allowed me to apply learnings immediately while the global network opened doors I never imagined.",
  achievements: [
    { label: "Salary Increase", value: "120%", color: "text-green-600" },
    { label: "Promotion Timeline", value: "8 months", color: "text-blue-600" },
    { label: "Team Size", value: "50+ people", color: "text-purple-600" },
    { label: "Global Projects", value: "15 countries", color: "text-orange-600" },
  ],
  rating: 5,
}

const smallSuccessStories = [
  {
    name: "Michael Chen",
    program: "MS Data Science",
    image: "/student-michael.png",
    achievement: "Lead Data Scientist at Google",
    rating: 5,
  },
  {
    name: "Dr. Priya Sharma",
    program: "MS Cybersecurity",
    image: "/student-priya.png",
    achievement: "CISO at Fortune 500 Company",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    program: "MS Computer Science",
    image: "/student-james.png",
    achievement: "Tech Startup Founder",
    rating: 5,
  },
  {
    name: "Lisa Wang",
    program: "MBA Online",
    image: "/student-lisa.png",
    achievement: "VP of Operations",
    rating: 5,
  },
]

export default function StudyOnlinePGPage() {
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0)
  const [currentPartnerPage, setCurrentPartnerPage] = useState(0)
  const router = useRouter()

  const coursesPerView = 4
  const partnersPerPage = 12
  const totalPartnerPages = Math.ceil(allPGPartners.length / partnersPerPage)

  const nextCourses = () => {
    setCurrentCourseIndex((prev) => (prev + coursesPerView >= popularPGCourses.length ? 0 : prev + coursesPerView))
  }

  const prevCourses = () => {
    setCurrentCourseIndex((prev) =>
      prev === 0 ? Math.max(0, popularPGCourses.length - coursesPerView) : prev - coursesPerView,
    )
  }

  const nextPartnerPage = () => {
    setCurrentPartnerPage((prev) => (prev + 1 >= totalPartnerPages ? 0 : prev + 1))
  }

  const prevPartnerPage = () => {
    setCurrentPartnerPage((prev) => (prev - 1 < 0 ? totalPartnerPages - 1 : prev - 1))
  }

  const currentPartners = allPGPartners.slice(
    currentPartnerPage * partnersPerPage,
    (currentPartnerPage + 1) * partnersPerPage,
  )

  const visibleCourses = popularPGCourses.slice(currentCourseIndex, currentCourseIndex + coursesPerView)

  const handleGetCounseling = () => {
    router.push("/contact")
  }

  const handleDownloadGuide = () => {
    const link = document.createElement("a")
    link.href = "/program-guide-online-pg.pdf"
    link.download = "Online-PG-Program-Guide.pdf"
    link.click()
  }

  const handleStartApplication = () => {
    router.push("/apply")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
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
                Advance Your Career
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Master's Degree
                </span>
                <span className="block">Online</span>
              </h1>

              <p className="text-xl mb-8 text-purple-100 leading-relaxed max-w-2xl">
                Take your career to the next level with a master's degree from top-ranked universities. Study while you
                work, learn from industry experts, and join a global network of professionals.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {keyStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2 text-purple-300">{stat.icon}</div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-purple-200">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100" onClick={handleGetCounseling}>
                  <Phone className="h-5 w-5 mr-2" />
                  Get Free Counseling
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-900 bg-transparent"
                  onClick={() => window.open("https://www.youtube.com/watch?v=demo", "_blank")}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Right Side - Lead Form */}
            <div className="lg:col-span-1">
              <ModernLeadForm countryName="Online Postgraduate" />
            </div>
          </div>
        </div>
      </div>

      {/* Why Study Postgraduate Online */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Study Postgraduate Online?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how an online master's degree can accelerate your career growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyStudyOnlinePG.map((point, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-purple-100 p-3 rounded-full text-purple-600">{point.icon}</div>
                    <h3 className="text-xl font-semibold">{point.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Postgraduate Programs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Popular Master's Programs</h2>
            <p className="text-xl text-gray-600">Explore high-demand postgraduate degree programs</p>
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
                      <p className="text-xs text-purple-600 mb-2">{course.provider}</p>
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

      {/* Why Choose Online Postgraduate Courses */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Online Master's Programs?</h2>
            <p className="text-xl text-gray-600">Advanced education designed for working professionals</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Executive Format</h3>
                <p className="text-gray-600 mb-6">
                  Designed for working professionals with evening and weekend classes
                </p>
                <ul className="text-left space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Flexible scheduling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Cohort-based learning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Industry projects</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Top-Tier Faculty</h3>
                <p className="text-gray-600 mb-6">Learn from renowned professors and industry practitioners</p>
                <ul className="text-left space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">PhD faculty</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Industry experts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Research leaders</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Career Impact</h3>
                <p className="text-gray-600 mb-6">Immediate application of learning to your current role</p>
                <ul className="text-left space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Leadership development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Strategic thinking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Executive presence</span>
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
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Investment & Financial Planning</h2>
            <p className="text-xl text-gray-600">Smart investment strategies for your master's degree in India</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Investment Overview */}
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
                      <p className="text-2xl font-bold text-blue-600">₹1,20,000 - ₹1,50,000</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Tuition & Fees</span>
                        <span className="font-semibold">85%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Technology & Resources</span>
                        <span className="font-semibold">10%</span>
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
                      <p className="text-2xl font-bold text-green-600">50-80%</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Promotion Rate</span>
                        <span className="font-semibold">70%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Leadership Roles</span>
                        <span className="font-semibold">65%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Job Security</span>
                        <span className="font-semibold">85%</span>
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
                      <p className="text-2xl font-bold text-purple-600">90%</p>
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

            {/* Education Loan Support */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 mb-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Education Loan Support</h3>
                  <p className="text-gray-600">Get financial assistance for your online master's degree</p>
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
                      <p className="text-xs text-gray-600">7-10 days</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-semibold">No Collateral</p>
                      <p className="text-xs text-gray-600">Up to ₹7.5L</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-semibold">Flexible EMI</p>
                      <p className="text-xs text-gray-600">After completion</p>
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
            <p className="text-xl text-gray-600">Hear from professionals who advanced their careers</p>
          </div>

          {/* Featured Success Story */}
          <Card className="mb-12 shadow-xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-700 p-8 text-white">
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
                  <p className="text-purple-200 mb-1">{featuredSuccessStory.title}</p>
                  <p className="text-purple-100 text-sm">{featuredSuccessStory.company}</p>
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
                        <p className="text-2xl font-bold mb-1 ${achievement.color}">{achievement.value}</p>
                        <p className="text-sm text-purple-200">{achievement.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Smaller Success Stories */}
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
                  <p className="text-sm text-purple-600 mb-2">{story.program}</p>
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
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Advance Your Career?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Take the next step in your professional journey with a master's degree from a top-ranked university. Start
            your application today and unlock new opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-purple-600" onClick={handleGetCounseling}>
              <Phone className="h-5 w-5 mr-2" />
              Get Free Counseling
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              onClick={handleDownloadGuide}
            >
              <Mail className="h-5 w-5 mr-2" />
              Download Program Guide
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
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
