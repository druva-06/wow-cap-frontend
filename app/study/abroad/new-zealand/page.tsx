"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModernLeadForm } from "@/components/modern-lead-form"
import {
  Users,
  GraduationCap,
  TrendingUp,
  Globe,
  Award,
  DollarSign,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Building,
  Heart,
  Target,
  ChevronLeft,
  ChevronRight,
  Mountain,
  Leaf,
} from "lucide-react"

const keyStats = [
  { icon: <Users className="h-8 w-8" />, label: "International Students", value: "50,000+" },
  { icon: <GraduationCap className="h-8 w-8" />, label: "Universities", value: "8 Public" },
  { icon: <TrendingUp className="h-8 w-8" />, label: "Graduate Employment", value: "92%" },
  { icon: <Globe className="h-8 w-8" />, label: "Quality of Life", value: "#2 Global" },
]

const whyStudyPoints = [
  {
    icon: <Award className="h-6 w-6" />,
    title: "World-Class Education",
    description: "All 8 universities rank in top 3% globally, with innovative teaching methods and research excellence",
  },
  {
    icon: <Mountain className="h-6 w-6" />,
    title: "Stunning Natural Beauty",
    description: "Study in one of the world's most beautiful countries with diverse landscapes and outdoor adventures",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Safe & Welcoming",
    description: "Consistently ranked as one of the world's safest and most peaceful countries",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Small Class Sizes",
    description: "Personalized attention with low student-to-faculty ratios ensuring quality education",
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Work Opportunities",
    description: "Post-study work visa up to 3 years and pathway to permanent residency",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "English-Speaking",
    description: "Study in English with a friendly Kiwi accent in a multicultural environment",
  },
]

const universities = [
  {
    id: "university-of-auckland",
    name: "University of Auckland",
    logo: "/university-of-auckland-logo.png",
    image: "/university-of-auckland-campus.jpg",
    ranking: "#85 QS World Ranking",
    description: "New Zealand's largest university and highest-ranked institution",
    programs: ["Engineering", "Medicine", "Business", "Arts"],
    tuitionRange: "NZD 32,000 - 43,000",
  },
  {
    id: "university-of-otago",
    name: "University of Otago",
    logo: "/university-of-otago-logo.png",
    image: "/university-of-otago-campus.jpg",
    ranking: "#194 QS World Ranking",
    description: "New Zealand's oldest university, renowned for health sciences",
    programs: ["Medicine", "Dentistry", "Health Sciences", "Business"],
    tuitionRange: "NZD 28,000 - 75,000",
  },
  {
    id: "victoria-university-wellington",
    name: "Victoria University of Wellington",
    logo: "/victoria-university-wellington-logo.png",
    image: "/victoria-university-wellington-campus.jpg",
    ranking: "#236 QS World Ranking",
    description: "Located in New Zealand's capital city with strong government connections",
    programs: ["Law", "Public Policy", "Creative Arts", "Science"],
    tuitionRange: "NZD 30,000 - 35,000",
  },
]

const successStories = [
  {
    name: "Emma Thompson",
    program: "Medicine at University of Otago",
    image: "/student-avatar.png",
    story: "Completed my medical degree and now working as a doctor in Auckland Hospital",
    achievement: "Graduated with Distinction",
  },
  {
    name: "Raj Patel",
    program: "Engineering at University of Auckland",
    image: "/male-student-avatar.png",
    story: "Secured a job at a leading tech company in Wellington before graduation",
    achievement: "NZD 85,000 starting salary",
  },
  {
    name: "Sophie Chen",
    program: "Law at Victoria University",
    image: "/female-student-avatar.png",
    story: "Now working at a top law firm in Wellington and obtained permanent residency",
    achievement: "Top 5% of graduating class",
  },
]

const applicationSteps = [
  {
    step: "1",
    title: "Research & Choose",
    description: "Explore universities and programs that match your interests and career goals",
    timeline: "8-12 months before",
  },
  {
    step: "2",
    title: "Meet Requirements",
    description: "Ensure you meet academic and English language requirements",
    timeline: "6-8 months before",
  },
  {
    step: "3",
    title: "Submit Application",
    description: "Apply directly to universities or through StudyLink portal",
    timeline: "4-6 months before",
  },
  {
    step: "4",
    title: "Receive Offer",
    description: "Get conditional or unconditional offer letter from university",
    timeline: "2-4 months before",
  },
  {
    step: "5",
    title: "Student Visa",
    description: "Apply for student visa once you accept the offer",
    timeline: "1-3 months before",
  },
  {
    step: "6",
    title: "Prepare to Leave",
    description: "Arrange accommodation, flights, and prepare for your New Zealand adventure",
    timeline: "1-2 months before",
  },
]

export default function StudyNewZealandPage() {
  const [currentUniversity, setCurrentUniversity] = useState(0)

  const nextUniversity = () => {
    setCurrentUniversity((prev) => (prev + 1) % universities.length)
  }

  const prevUniversity = () => {
    setCurrentUniversity((prev) => (prev - 1 + universities.length) % universities.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/new-zealand-landscape.jpg"
            alt="New Zealand Landscape"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-indigo-900/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-2 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/new-zealand-flag.png" alt="New Zealand Flag" width={32} height={24} className="rounded" />
                <span className="text-blue-200">Study in New Zealand</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Education in
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                  Paradise
                </span>
              </h1>

              <p className="text-xl mb-8 text-blue-100 leading-relaxed max-w-2xl">
                Experience world-class education in one of the most beautiful and safest countries on Earth. Discover
                innovative learning, stunning landscapes, and a pathway to your global career.
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
                  Download Guide
                </Button>
              </div>
            </div>

            {/* Right Side - Lead Form */}
            <div className="lg:col-span-1">
              <ModernLeadForm
                title="Start Your Kiwi Journey"
                subtitle="Get personalized guidance from our New Zealand education experts"
                className="sticky top-4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Why Study in New Zealand */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Study in New Zealand?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why New Zealand offers the perfect blend of academic excellence, natural beauty, and
              life-changing experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyStudyPoints.map((point, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-green-100 p-3 rounded-full text-green-600">{point.icon}</div>
                    <h3 className="text-xl font-semibold">{point.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* University Partners */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Top University Partners</h2>
            <p className="text-xl text-gray-600">Study at New Zealand's most prestigious institutions</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="shadow-xl">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={universities[currentUniversity].image || "/placeholder.svg"}
                      alt={universities[currentUniversity].name}
                      fill
                      className="object-cover rounded-l-lg"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={universities[currentUniversity].logo || "/placeholder.svg"}
                        alt={`${universities[currentUniversity].name} logo`}
                        width={60}
                        height={60}
                        className="rounded-lg"
                      />
                      <div>
                        <Badge className="mb-2">{universities[currentUniversity].ranking}</Badge>
                        <h3 className="text-xl font-bold">{universities[currentUniversity].name}</h3>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{universities[currentUniversity].description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Popular Programs:</h4>
                      <div className="flex flex-wrap gap-2">
                        {universities[currentUniversity].programs.map((program, idx) => (
                          <Badge key={idx} variant="outline">
                            {program}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500">Tuition Range:</span>
                        <p className="font-semibold">{universities[currentUniversity].tuitionRange}</p>
                      </div>
                      <Button asChild>
                        <Link href={`/universities/${universities[currentUniversity].id}`}>
                          Learn More <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg"
              onClick={prevUniversity}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg"
              onClick={nextUniversity}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {universities.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentUniversity ? "bg-green-600" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentUniversity(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cost of Study */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Cost of Studying in New Zealand</h2>
            <p className="text-xl text-gray-600">Plan your finances with our comprehensive cost breakdown</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="undergraduate" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="undergraduate">Undergraduate</TabsTrigger>
                <TabsTrigger value="postgraduate">Postgraduate</TabsTrigger>
              </TabsList>

              <TabsContent value="undergraduate">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Tuition Fees
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Arts & Humanities</span>
                          <span className="font-semibold">NZD 22,000 - 32,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Science & Engineering</span>
                          <span className="font-semibold">NZD 27,000 - 37,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Medicine & Dentistry</span>
                          <span className="font-semibold">NZD 55,000 - 75,000</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">Per year</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        Living Expenses
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Accommodation</span>
                          <span className="font-semibold">NZD 8,000 - 15,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Food & Groceries</span>
                          <span className="font-semibold">NZD 3,000 - 5,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Transportation</span>
                          <span className="font-semibold">NZD 1,000 - 2,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Personal Expenses</span>
                          <span className="font-semibold">NZD 2,000 - 3,000</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">Per year</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Total Cost
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Arts Programs</span>
                          <span className="font-semibold">NZD 36,000 - 55,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Science Programs</span>
                          <span className="font-semibold">NZD 41,000 - 62,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Medical Programs</span>
                          <span className="font-semibold">NZD 69,000 - 100,000</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">Per year (all inclusive)</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="postgraduate">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Tuition Fees
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Master's Programs</span>
                          <span className="font-semibold">NZD 26,000 - 37,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>MBA Programs</span>
                          <span className="font-semibold">NZD 40,000 - 60,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>PhD Programs</span>
                          <span className="font-semibold">NZD 6,500 - 9,000</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">Per year</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        Living Expenses
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Accommodation</span>
                          <span className="font-semibold">NZD 10,000 - 18,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Food & Groceries</span>
                          <span className="font-semibold">NZD 4,000 - 6,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Transportation</span>
                          <span className="font-semibold">NZD 1,200 - 2,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Personal Expenses</span>
                          <span className="font-semibold">NZD 2,500 - 4,000</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">Per year</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Total Cost
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Master's (1-2 years)</span>
                          <span className="font-semibold">NZD 44,000 - 67,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>MBA (1-2 years)</span>
                          <span className="font-semibold">NZD 58,000 - 90,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>PhD (3-4 years)</span>
                          <span className="font-semibold">NZD 25,000 - 39,000</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">Per year (all inclusive)</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Hear from our students who achieved their dreams in New Zealand</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.program}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{story.story}"</p>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-green-600">{story.achievement}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Application Process</h2>
            <p className="text-xl text-gray-600">Your step-by-step guide to studying in New Zealand</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applicationSteps.map((step, index) => (
                <Card key={index} className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-sm text-gray-500">{step.timeline}</p>
                      </div>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Ready to Start Your Kiwi Adventure?</h3>
                  <p className="text-gray-600 mb-6">
                    Our New Zealand education specialists have helped 500+ students secure admissions and visas
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700">
                      <Phone className="h-5 w-5 mr-2" />
                      Schedule Free Consultation
                    </Button>
                    <Button size="lg" variant="outline">
                      <Mail className="h-5 w-5 mr-2" />
                      Get Application Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Your New Zealand Journey Starts Here</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of international students who chose New Zealand for world-class education in one of the most
            beautiful countries on Earth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-green-600">
              <Phone className="h-5 w-5 mr-2" />
              Get Free Counseling
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
            >
              <Mountain className="h-5 w-5 mr-2" />
              Virtual Campus Tour
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
            >
              <Target className="h-5 w-5 mr-2" />
              Start Application
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
