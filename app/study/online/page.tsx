"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Monitor,
  Clock,
  Star,
  Award,
  Users,
  Globe,
  Play,
  CheckCircle,
  GraduationCap,
  BookOpen,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function StudyOnlinePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/study/online/search?q=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push("/study/online/search")
    }
  }

  const undergraduateCourses = [
    {
      id: 2,
      title: "Bachelor of Computer Applications (BCA)",
      provider: "Tech University Online",
      duration: "36 months",
      rating: 4.6,
      students: 1800,
      price: "₹1,20,000",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
      badges: ["Industry Relevant", "Live Projects"],
      level: "Undergraduate",
    },
    {
      id: 7,
      title: "Bachelor of Business Administration (BBA)",
      provider: "Business School Online",
      duration: "36 months",
      rating: 4.5,
      students: 1500,
      price: "₹1,00,000",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      badges: ["Management Focus", "Industry Connect"],
      level: "Undergraduate",
    },
    {
      id: 8,
      title: "Bachelor of Science in Data Science",
      provider: "Data University Online",
      duration: "36 months",
      rating: 4.7,
      students: 2200,
      price: "₹1,50,000",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
      badges: ["High Demand", "Practical Learning"],
      level: "Undergraduate",
    },
  ]

  const postgraduateCourses = [
    {
      id: 1,
      title: "Master of Business Administration (MBA)",
      provider: "IIM Online",
      duration: "24 months",
      rating: 4.8,
      students: 2500,
      price: "₹2,50,000",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      badges: ["Top Rated", "Placement Assistance"],
      level: "Postgraduate",
    },
    {
      id: 5,
      title: "Master of Computer Applications (MCA)",
      provider: "Virtual Tech University",
      duration: "24 months",
      rating: 4.5,
      students: 1600,
      price: "₹1,80,000",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop",
      badges: ["UGC Approved", "Industry Connect"],
      level: "Postgraduate",
    },
    {
      id: 9,
      title: "Master of Science in Artificial Intelligence",
      provider: "AI Institute Online",
      duration: "24 months",
      rating: 4.9,
      students: 1900,
      price: "₹2,20,000",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop",
      badges: ["Future Skills", "Research Focus"],
      level: "Postgraduate",
    },
  ]

  const certificateCourses = [
    {
      id: 3,
      title: "Data Science & Analytics",
      provider: "Analytics Institute",
      duration: "12 months",
      rating: 4.9,
      students: 3200,
      price: "₹85,000",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f2d?w=300&h=200&fit=crop",
      badges: ["High Demand", "Job Guarantee"],
      level: "Certificate",
    },
    {
      id: 4,
      title: "Digital Marketing Mastery",
      provider: "Marketing Pro Academy",
      duration: "8 months",
      rating: 4.7,
      students: 2100,
      price: "₹45,000",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
      badges: ["Practical Training", "Google Certified"],
      level: "Certificate",
    },
    {
      id: 6,
      title: "Artificial Intelligence & Machine Learning",
      provider: "AI Learning Hub",
      duration: "10 months",
      rating: 4.8,
      students: 2800,
      price: "₹95,000",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop",
      badges: ["Future Skills", "Hands-on Labs"],
      level: "Certificate",
    },
  ]

  const universityPartners = [
    {
      id: "iim-online",
      name: "IIM Online",
      logo: "/iim-logo.png",
      description: "Premier management education online",
      programs: ["MBA", "Executive Programs"],
    },
    {
      id: "tech-university-online",
      name: "Tech University Online",
      logo: "/tech-university-logo.png",
      description: "Leading technology education platform",
      programs: ["BCA", "MCA", "B.Tech"],
    },
    {
      id: "business-school-online",
      name: "Business School Online",
      logo: "/business-school-logo.png",
      description: "Comprehensive business education",
      programs: ["BBA", "MBA", "PGDM"],
    },
    {
      id: "data-university-online",
      name: "Data University Online",
      logo: "/data-university-logo.png",
      description: "Specialized in data science education",
      programs: ["B.Sc Data Science", "M.Sc AI"],
    },
  ]

  const categories = [
    { name: "Business & Management", count: 45, icon: "💼" },
    { name: "Technology & IT", count: 38, icon: "💻" },
    { name: "Data Science", count: 25, icon: "📊" },
    { name: "Digital Marketing", count: 32, icon: "📱" },
    { name: "Design & Creative", count: 28, icon: "🎨" },
    { name: "Healthcare", count: 22, icon: "🏥" },
    { name: "Finance & Banking", count: 35, icon: "💰" },
    { name: "Education", count: 18, icon: "📚" },
  ]

  const benefits = [
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Study at your own pace, anytime, anywhere",
    },
    {
      icon: Award,
      title: "Industry-Recognized Certificates",
      description: "Get certificates valued by top employers",
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description: "Learn from industry experts and experienced professors",
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Access courses from top universities worldwide",
    },
  ]

  const stats = [
    { number: "50,000+", label: "Students Enrolled" },
    { number: "500+", label: "Online Courses" },
    { number: "95%", label: "Completion Rate" },
    { number: "4.8/5", label: "Average Rating" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Monitor className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Study Online</h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Learn from anywhere with flexible online courses from top universities and institutions
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-xl">
                <div className="flex-1 flex items-center px-4">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <Input
                    type="text"
                    placeholder="Search online courses, programs, skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-0 text-gray-800 bg-transparent focus:ring-0 focus:outline-none text-lg"
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-green-100 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-xl p-1 my-4">
              <Link href="#undergraduate" className="scroll-smooth">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 data-[active=true]:bg-white data-[active=true]:shadow-md"
                >
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-700">Undergraduate Programs</span>
                </Button>
              </Link>
              <Link href="#postgraduate" className="scroll-smooth">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-700">Postgraduate Programs</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular Categories</h2>
            <p className="text-xl text-gray-600">Explore courses across various domains</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-0 shadow-lg"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-green-600 font-semibold">{category.count} Courses</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Online Programs</h2>
            <p className="text-xl text-gray-600">Choose from undergraduate and postgraduate programs</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="undergraduate" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-14 bg-gray-100 rounded-2xl p-2">
                <TabsTrigger
                  value="undergraduate"
                  className="flex items-center space-x-2 text-lg font-semibold py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-600 transition-all duration-300"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Undergraduate Programs</span>
                </TabsTrigger>
                <TabsTrigger
                  value="postgraduate"
                  className="flex items-center space-x-2 text-lg font-semibold py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-purple-600 transition-all duration-300"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Postgraduate Programs</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="undergraduate" id="undergraduate">
                <div className="mb-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-blue-600 mb-4">Bachelor's Degree Programs</h3>
                    <p className="text-lg text-gray-600">
                      Start your career with industry-relevant undergraduate programs
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {undergraduateCourses.map((course) => (
                      <Card
                        key={course.id}
                        className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                      >
                        <CardContent className="p-0">
                          <div className="relative h-48">
                            <Image
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              fill
                              className="object-cover rounded-t-lg"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-blue-600 text-white">{course.level}</Badge>
                            </div>
                            <div className="absolute top-4 right-4">
                              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                                <Play className="w-4 h-4 text-blue-600" />
                              </div>
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <Badge variant="outline" className="text-blue-600 border-blue-600">
                                {course.provider}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{course.rating}</span>
                              </div>
                            </div>

                            <h3 className="font-bold text-lg mb-3 line-clamp-2 text-gray-800">{course.title}</h3>

                            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{course.students.toLocaleString()} students</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {course.badges.map((badge, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-2xl font-bold text-blue-600">{course.price}</div>
                              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Enroll Now</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="text-center mt-8">
                    <Link href="/study/online/ug">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg">
                        View All Undergraduate Programs
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="postgraduate" id="postgraduate">
                <div className="mb-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-purple-600 mb-4">Master's Degree Programs</h3>
                    <p className="text-lg text-gray-600">Advance your career with specialized postgraduate programs</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postgraduateCourses.map((course) => (
                      <Card
                        key={course.id}
                        className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                      >
                        <CardContent className="p-0">
                          <div className="relative h-48">
                            <Image
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              fill
                              className="object-cover rounded-t-lg"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-purple-600 text-white">{course.level}</Badge>
                            </div>
                            <div className="absolute top-4 right-4">
                              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                                <Play className="w-4 h-4 text-purple-600" />
                              </div>
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <Badge variant="outline" className="text-purple-600 border-purple-600">
                                {course.provider}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{course.rating}</span>
                              </div>
                            </div>

                            <h3 className="font-bold text-lg mb-3 line-clamp-2 text-gray-800">{course.title}</h3>

                            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{course.students.toLocaleString()} students</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {course.badges.map((badge, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-2xl font-bold text-purple-600">{course.price}</div>
                              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Enroll Now</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="text-center mt-8">
                    <Link href="/study/online/pg">
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg">
                        View All Postgraduate Programs
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Our University Partners</h3>
                <p className="text-xl text-gray-600">Learn from India's leading online education providers</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {universityPartners.map((university) => (
                  <Link key={university.id} href={`/universities/${university.id}`} className="group">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Image
                            src={university.logo || "/placeholder.svg?height=64&width=64&text=Logo"}
                            alt={`${university.name} logo`}
                            width={64}
                            height={64}
                            className="object-contain"
                          />
                        </div>
                        <h4 className="font-bold text-lg mb-2 group-hover:text-green-600 transition-colors">
                          {university.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">{university.description}</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {university.programs.slice(0, 2).map((program, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Courses Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Professional Certificate Courses</h2>
            <p className="text-xl text-gray-600">Skill-focused programs for career advancement</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {certificateCourses.map((course) => (
              <Card
                key={course.id}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-600 text-white">{course.level}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <Play className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {course.provider}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg mb-3 line-clamp-2 text-gray-800">{course.title}</h3>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.badges.map((badge, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-green-600">{course.price}</div>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">Enroll Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Online Learning?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the advantages of flexible, accessible, and quality online education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-gray-800">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Real students, real achievements</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Priya Sharma",
                course: "MBA Online",
                achievement: "Promoted to Senior Manager",
                image: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e5?w=100&h=100&fit=crop&crop=face",
                quote: "The flexibility of online learning allowed me to advance my career while working full-time.",
              },
              {
                name: "Rahul Kumar",
                course: "Data Science Certificate",
                achievement: "Landed Data Analyst Role",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                quote: "The practical projects and industry mentorship helped me transition into tech successfully.",
              },
              {
                name: "Sneha Patel",
                course: "Digital Marketing",
                achievement: "Started Own Agency",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                quote: "The comprehensive curriculum gave me the confidence to start my own digital marketing agency.",
              },
            ].map((story, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{story.name}</h3>
                  <p className="text-green-600 font-semibold mb-2">{story.course}</p>
                  <div className="flex items-center justify-center mb-4">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">{story.achievement}</span>
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">"{story.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-xl mb-8 text-green-100">
              Join thousands of students who are advancing their careers through online education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/study/online/search")}
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-xl"
              >
                Find Your Course
              </Button>
              <Link href="/study/online/search">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold rounded-xl bg-transparent"
                >
                  Browse All Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
