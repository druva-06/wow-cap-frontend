"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
  CheckCircle,
  Star,
  Building,
  ArrowRight,
  MessageCircle,
  Zap,
  Sparkles,
  AlertCircle,
  Timer,
  Code,
  Cpu,
  Database,
  Wrench,
  Lightbulb,
  Rocket,
  Brain,
  Briefcase,
} from "lucide-react"
import Image from "next/image"

export default function EngineeringCoursePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    budget: "",
  })
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 12,
  })
  const [recentEnrollments, setRecentEnrollments] = useState([
    { name: "Arjun S.", location: "Delhi", time: "3 minutes ago" },
    { name: "Priya K.", location: "Mumbai", time: "7 minutes ago" },
    { name: "Rohit M.", location: "Bangalore", time: "12 minutes ago" },
  ])
  const [enrollmentCount, setEnrollmentCount] = useState(1247)

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Simulate live enrollments
  useEffect(() => {
    const interval = setInterval(() => {
      setEnrollmentCount((prev) => prev + 1)
      setRecentEnrollments((prev) => [
        { name: "New Student", location: "India", time: "Just now" },
        ...prev.slice(0, 2),
      ])
    }, 22000) // Every 22 seconds

    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const engineeringSpecializations = [
    {
      title: "Computer Science Engineering",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      description: "Software development, AI, machine learning, and data structures",
      avgPackage: "₹8-50 LPA",
      topRecruiters: ["Google", "Microsoft", "Amazon", "Meta"],
      colleges: "500+ Colleges",
    },
    {
      title: "Electronics & Communication",
      icon: Cpu,
      color: "from-green-500 to-emerald-500",
      description: "Circuit design, telecommunications, embedded systems",
      avgPackage: "₹6-35 LPA",
      topRecruiters: ["Intel", "Qualcomm", "Samsung", "ISRO"],
      colleges: "400+ Colleges",
    },
    {
      title: "Mechanical Engineering",
      icon: Wrench,
      color: "from-orange-500 to-red-500",
      description: "Manufacturing, automotive, aerospace, robotics",
      avgPackage: "₹5-30 LPA",
      topRecruiters: ["Tata Motors", "Mahindra", "L&T", "Boeing"],
      colleges: "600+ Colleges",
    },
    {
      title: "Civil Engineering",
      icon: Building,
      color: "from-purple-500 to-violet-500",
      description: "Construction, infrastructure, urban planning",
      avgPackage: "₹4-25 LPA",
      topRecruiters: ["L&T", "DLF", "Godrej", "NTPC"],
      colleges: "450+ Colleges",
    },
    {
      title: "Electrical Engineering",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-500",
      description: "Power systems, renewable energy, automation",
      avgPackage: "₹5-28 LPA",
      topRecruiters: ["BHEL", "Siemens", "ABB", "Tesla"],
      colleges: "380+ Colleges",
    },
    {
      title: "Aerospace Engineering",
      icon: Rocket,
      color: "from-indigo-500 to-blue-500",
      description: "Aircraft design, space technology, defense systems",
      avgPackage: "₹7-40 LPA",
      topRecruiters: ["ISRO", "HAL", "Boeing", "Airbus"],
      colleges: "50+ Colleges",
    },
  ]

  const topColleges = [
    {
      name: "Indian Institute of Technology Delhi",
      ranking: "#1 Engineering College",
      location: "New Delhi",
      fees: "₹2-8 Lakhs",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=200&fit=crop",
      badge: "IIT Premier",
      placementRate: "100%",
      avgPackage: "₹25 LPA",
    },
    {
      name: "Indian Institute of Technology Bombay",
      ranking: "#2 Engineering College",
      location: "Mumbai",
      fees: "₹2-8 Lakhs",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=200&fit=crop",
      badge: "IIT Elite",
      placementRate: "100%",
      avgPackage: "₹23 LPA",
    },
    {
      name: "Indian Institute of Technology Madras",
      ranking: "#3 Engineering College",
      location: "Chennai",
      fees: "₹2-8 Lakhs",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
      badge: "IIT Premier",
      placementRate: "100%",
      avgPackage: "₹22 LPA",
    },
    {
      name: "National Institute of Technology Trichy",
      ranking: "#4 Engineering College",
      location: "Tiruchirappalli",
      fees: "₹1-5 Lakhs",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=300&h=200&fit=crop",
      badge: "NIT Excellence",
      placementRate: "95%",
      avgPackage: "₹18 LPA",
    },
  ]

  const careerPaths = [
    {
      title: "Software Engineer",
      icon: Code,
      description: "Develop applications, websites, and software systems",
      avgSalary: "₹8-50 LPA",
      companies: ["Google", "Microsoft", "Amazon", "Meta"],
      skills: ["Programming", "Data Structures", "System Design"],
    },
    {
      title: "Data Scientist",
      icon: Database,
      description: "Analyze data to derive business insights and predictions",
      avgSalary: "₹12-60 LPA",
      companies: ["Netflix", "Uber", "Flipkart", "Zomato"],
      skills: ["Python", "Machine Learning", "Statistics"],
    },
    {
      title: "Product Manager",
      icon: Briefcase,
      description: "Lead product development and strategy",
      avgSalary: "₹15-80 LPA",
      companies: ["Google", "Amazon", "Microsoft", "Swiggy"],
      skills: ["Strategy", "Analytics", "Communication"],
    },
    {
      title: "Research Scientist",
      icon: Brain,
      description: "Conduct research in cutting-edge technologies",
      avgSalary: "₹10-45 LPA",
      companies: ["ISRO", "DRDO", "Google AI", "Microsoft Research"],
      skills: ["Research", "Innovation", "Technical Writing"],
    },
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      course: "Computer Science Engineering - IIT Delhi",
      achievement: "Senior Software Engineer at Google",
      company: "Google",
      salary: "₹45 LPA",
      graduationYear: "2020",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      quote:
        "The rigorous curriculum at IIT Delhi and the competitive environment prepared me for the challenges at Google. The problem-solving skills I developed are invaluable.",
    },
    {
      name: "Priya Sharma",
      course: "Electronics Engineering - IIT Bombay",
      achievement: "Hardware Engineer at Apple",
      company: "Apple",
      salary: "₹55 LPA",
      graduationYear: "2019",
      image: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e5?w=100&h=100&fit=crop&crop=face",
      quote:
        "IIT Bombay's focus on innovation and hands-on learning gave me the foundation to work on cutting-edge hardware at Apple. The faculty mentorship was exceptional.",
    },
    {
      name: "Arjun Patel",
      course: "Mechanical Engineering - IIT Madras",
      achievement: "Aerospace Engineer at ISRO",
      company: "ISRO",
      salary: "₹25 LPA",
      graduationYear: "2021",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      quote:
        "My dream of contributing to India's space program became reality thanks to IIT Madras. The research opportunities and lab facilities were world-class.",
    },
    {
      name: "Sneha Reddy",
      course: "Civil Engineering - NIT Trichy",
      achievement: "Project Manager at L&T",
      company: "Larsen & Toubro",
      salary: "₹18 LPA",
      graduationYear: "2020",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      quote:
        "NIT Trichy's industry connections and practical approach to civil engineering helped me land my dream job at L&T. The campus placements were excellent.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
      <div className="fixed top-40 right-20 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="fixed bottom-40 left-20 w-12 h-12 bg-cyan-200 rounded-full opacity-20 animate-bounce delay-1000"></div>

      {/* Urgent Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 text-center animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <div className="flex items-center justify-center space-x-2 relative z-10">
          <Zap className="w-5 h-5" />
          <span className="font-bold text-lg">⚡ ENGINEERING ADMISSION RUSH - 75% OFF Processing Fees!</span>
          <Timer className="w-5 h-5" />
        </div>
        <div className="text-sm mt-1 relative z-10">
          Ends in: {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 text-sm font-semibold mb-6 border border-blue-200">
                  🚀 Build the Future
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Engineering
                  </span>{" "}
                  Courses
                  <br />
                  <span className="text-3xl md:text-4xl text-gray-700">Shape Tomorrow's World</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Join 2.5 million+ engineering students across India. From IITs to NITs, discover 1000+ top engineering
                  colleges. Your gateway to innovation, technology, and global career opportunities!
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      1000+
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Engineering Colleges</div>
                  </div>
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      25L+
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Engineering Students</div>
                  </div>
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      95%
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Placement Rate</div>
                  </div>
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      ₹15L
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Avg Package</div>
                  </div>
                </div>

                {/* Value Props */}
                <div className="space-y-4 mb-10">
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-green-100">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">
                      ✅ Guaranteed Engineering Admission or 100% Money Back
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-green-100">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">
                      ✅ Personal Engineering Career Counselor + Industry Mentorship
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-green-100">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">
                      ✅ JEE/BITSAT/VITEEE Preparation Support + Mock Tests
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-green-100">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">✅ Internship Placement + Job Guarantee Programs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Lead Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <Card className="border-2 border-blue-200 shadow-2xl bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Code className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Get FREE Engineering Guide</h3>
                      <p className="text-gray-600">Complete college list + career roadmap</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <Input
                          placeholder="Your Full Name *"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-12 text-base"
                          required
                        />
                      </div>

                      <div>
                        <Input
                          type="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-12 text-base"
                          required
                        />
                      </div>

                      <div>
                        <Input
                          type="tel"
                          placeholder="Phone Number *"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-12 text-base"
                          required
                        />
                      </div>

                      <div>
                        <Select
                          value={formData.specialization}
                          onValueChange={(value) => handleInputChange("specialization", value)}
                        >
                          <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-12 text-base">
                            <SelectValue placeholder="Engineering Specialization *" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="computer-science">Computer Science Engineering</SelectItem>
                            <SelectItem value="electronics">Electronics & Communication</SelectItem>
                            <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                            <SelectItem value="civil">Civil Engineering</SelectItem>
                            <SelectItem value="electrical">Electrical Engineering</SelectItem>
                            <SelectItem value="aerospace">Aerospace Engineering</SelectItem>
                            <SelectItem value="other">Other Specialization</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                          <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-12 text-base">
                            <SelectValue placeholder="Budget Range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-2">Under ₹2 Lakhs</SelectItem>
                            <SelectItem value="2-5">₹2-5 Lakhs</SelectItem>
                            <SelectItem value="5-10">₹5-10 Lakhs</SelectItem>
                            <SelectItem value="10-20">₹10-20 Lakhs</SelectItem>
                            <SelectItem value="above-20">Above ₹20 Lakhs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 h-14"
                      >
                        <Sparkles className="w-6 h-6 mr-2" />
                        GET FREE ENGINEERING GUIDE
                      </Button>
                    </form>

                    <div className="mt-8 space-y-3 text-center">
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Engineering Expert Counselor</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>JEE Preparation Support</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Career Roadmap Included</span>
                      </div>
                    </div>

                    {/* Live Stats */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">🔥 Live Activity</div>
                        <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          {enrollmentCount} students
                        </div>
                        <div className="text-sm text-gray-600">got engineering guidance this month</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Specializations Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">🎯 Engineering Specializations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from diverse engineering fields that shape the future
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {engineeringSpecializations.map((spec, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white group"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${spec.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <spec.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{spec.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{spec.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Avg Package:</span>
                      <span className="font-semibold text-green-600">{spec.avgPackage}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Colleges:</span>
                      <span className="font-semibold text-blue-600">{spec.colleges}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Top Recruiters:</p>
                    <div className="flex flex-wrap gap-1">
                      {spec.topRecruiters.map((recruiter, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {recruiter}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                    Explore {spec.title.split(" ")[0]}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">🌟 Engineering Success Stories</h2>
            <p className="text-xl text-gray-600">From classrooms to global corporations</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white"
              >
                <CardContent className="p-8 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover rounded-full border-4 border-blue-100"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{testimonial.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2 text-sm">{testimonial.course}</p>
                  <Badge className="bg-green-100 text-green-800 mb-3 text-xs">{testimonial.achievement}</Badge>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Company:</span>
                      <span className="font-semibold text-gray-900">{testimonial.company}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Package:</span>
                      <span className="font-semibold text-green-600">{testimonial.salary}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Graduated:</span>
                      <span className="font-semibold text-gray-900">{testimonial.graduationYear}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 italic text-sm mb-4">"{testimonial.quote}"</p>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Enrollments */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">🔥 Recent Engineering Enrollments</h3>
            <div className="space-y-3">
              {recentEnrollments.map((enrollment, index) => (
                <div key={index} className="text-sm text-gray-600 bg-white p-3 rounded-lg shadow-sm">
                  <span className="font-semibold">{enrollment.name}</span> from{" "}
                  <span className="text-blue-600 font-medium">{enrollment.location}</span> got engineering guidance{" "}
                  <span className="text-green-600 font-medium">{enrollment.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Colleges Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">🏆 Top Engineering Colleges</h2>
            <p className="text-xl text-gray-600">Premier institutions that shape engineering leaders</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topColleges.map((college, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white group"
              >
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={college.image || "/placeholder.svg"}
                      alt={college.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      {college.badge}
                    </Badge>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-green-600">
                      {college.placementRate} Placement
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900">{college.name}</h3>
                    <p className="text-blue-600 font-semibold mb-1 text-sm">{college.ranking}</p>
                    <p className="text-gray-600 text-sm mb-3">{college.location}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Fees:</span>
                        <span className="font-semibold text-green-600">{college.fees}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Avg Package:</span>
                        <span className="font-semibold text-blue-600">{college.avgPackage}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                    >
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              View All 1000+ Engineering Colleges
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">🚀 Engineering Career Paths</h2>
            <p className="text-xl text-gray-600">Diverse opportunities await engineering graduates</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {careerPaths.map((career, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white group"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <career.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{career.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{career.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Avg Salary:</span>
                      <span className="font-semibold text-green-600">{career.avgSalary}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Top Companies:</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {career.companies.slice(0, 2).map((company, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Key Skills:</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {career.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-sm">
                    Explore Career Path
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">⚠️ Engineering Admission Season Started!</h2>
            <p className="text-xl mb-10">Limited seats in top engineering colleges. Secure your future now!</p>

            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
                <div className="text-4xl font-bold mb-2">{enrollmentCount}</div>
                <div className="text-sm opacity-90">Students got engineering guidance</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
                <div className="text-4xl font-bold mb-2">156</div>
                <div className="text-sm opacity-90">Seats left in top colleges</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
                <div className="text-4xl font-bold mb-2">18</div>
                <div className="text-sm opacity-90">Days left for JEE applications</div>
              </div>
            </div>

            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-2xl">
              <AlertCircle className="w-6 h-6 mr-2" />
              SECURE MY ENGINEERING ADMISSION NOW
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">📞 Engineering Expert Support</h2>
            <p className="text-xl text-gray-600">Dedicated engineering counselors with industry experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
              <CardContent className="p-10">
                <Phone className="w-16 h-16 text-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-3 text-gray-900">Call Engineering Experts</h3>
                <p className="text-gray-600 mb-6">Direct line to engineering admission specialists</p>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3">+91-11-4567-8901</Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
              <CardContent className="p-10">
                <MessageCircle className="w-16 h-16 text-green-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-3 text-gray-900">Engineering WhatsApp</h3>
                <p className="text-gray-600 mb-6">Quick engineering guidance on WhatsApp</p>
                <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3">
                  Chat Engineering Expert
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
              <CardContent className="p-10">
                <Mail className="w-16 h-16 text-orange-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-3 text-gray-900">Engineering Email</h3>
                <p className="text-gray-600 mb-6">Detailed engineering college guidance</p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3">
                  engineering@wowcap.com
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">🚀 Ready to Engineer Your Future?</h2>
            <p className="text-xl mb-12">Join millions who chose engineering to build tomorrow's world</p>

            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-10 mb-12 border border-white/30">
              <h3 className="text-3xl font-bold mb-8">🎁 Your FREE Engineering Package:</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                  <span className="text-lg">Complete engineering college database</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                  <span className="text-lg">JEE preparation strategy & mock tests</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                  <span className="text-lg">Engineering career roadmap & specializations</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                  <span className="text-lg">Industry mentor connections</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                  <span className="text-lg">Internship & job placement support</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                  <span className="text-lg">Scholarship & education loan guidance</span>
                </div>
              </div>
            </div>

            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-16 py-8 text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-3xl">
              <Sparkles className="w-8 h-8 mr-4" />
              GET FREE ENGINEERING GUIDANCE
              <ArrowRight className="w-8 h-8 ml-4" />
            </Button>

            <p className="text-lg mt-6 opacity-90">
              ✅ 100% Free Service ✅ Engineering Experts ✅ Trusted by 100,000+ Students
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
