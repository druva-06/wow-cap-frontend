"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  ArrowRight,
  CheckCircle,
  Briefcase,
  Brain,
  Plane,
  CreditCard,
  FileText,
  Search,
  BrainCircuit,
  MessageSquare,
  Calendar,
  Users,
  Home,
  DollarSign,
  Building,
  MapPin,
  Trophy,
  MoreHorizontal,
} from "lucide-react"

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const serviceCategories = {
    "career-services": {
      title: "Career Services",
      color: "from-blue-500 to-indigo-600",
      icon: Briefcase,
      services: [
        {
          icon: BrainCircuit,
          title: "Career Guidance",
          description:
            "Navigate your career path with confidence. Our experts provide personalized guidance to help you make informed decisions about your future.",
          features: [
            "One-on-one career counseling sessions",
            "Industry insights & market trends",
            "Career pathway analysis",
            "Skill development roadmap",
          ],
          color: "bg-blue-500",
          keywords: "career, guidance, counseling, planning, assessment",
          href: "/services/career-guidance",
        },
        {
          icon: Brain,
          title: "Psychometric Testing",
          description:
            "Discover your innate strengths, personality traits, and ideal career paths with our scientifically-validated assessments.",
          features: [
            "Comprehensive personality analysis",
            "Aptitude and skills assessment",
            "Personalized career recommendations",
            "Detailed report and analysis",
          ],
          color: "bg-cyan-500",
          keywords: "psychometric, test, assessment, personality, aptitude",
          href: "/services/psychometric-test",
        },
        {
          icon: MessageSquare,
          title: "Mock Interviews",
          description:
            "Master the art of interviews with personalized coaching and practice sessions for university admissions and job applications.",
          features: [
            "Mock interview sessions",
            "Common questions bank",
            "Communication skills training",
            "Confidence building techniques",
          ],
          color: "bg-purple-500",
          keywords: "interview, mock, preparation, communication, practice",
          href: "/services/mock-interviews",
        },
        {
          icon: FileText,
          title: "Interview Preparation",
          description:
            "Comprehensive interview preparation program covering both university admissions and visa interviews with expert guidance.",
          features: [
            "University admission interview prep",
            "Visa interview coaching",
            "Body language and presentation skills",
            "Stress management techniques",
          ],
          color: "bg-indigo-500",
          keywords: "interview, preparation, visa, admission, coaching",
          href: "/services/interview-preparation",
        },
      ],
    },
    "university-support": {
      title: "University Support",
      color: "from-green-500 to-emerald-600",
      icon: Building,
      services: [
        {
          icon: BookOpen,
          title: "University & Course Selection",
          description:
            "Get expert guidance to choose the right courses and programs that align with your career goals and interests.",
          features: [
            "AI-powered program matching",
            "University comparison analysis",
            "Admission requirements review",
            "Scholarship opportunity identification",
          ],
          color: "bg-green-500",
          keywords: "university, course, selection, program, matching",
          href: "/services/university-selection",
        },
        {
          icon: MapPin,
          title: "Campus Visit Facility",
          description:
            "Experience universities firsthand with our organized campus visit programs and virtual tour services.",
          features: [
            "Organized campus tours",
            "Meeting with admission officers",
            "Student interaction sessions",
            "Accommodation facility visits",
          ],
          color: "bg-emerald-500",
          keywords: "campus, visit, tour, university, facility",
          href: "/services/campus-visits",
        },
        {
          icon: Calendar,
          title: "University OnSpots",
          description:
            "Participate in exclusive on-spot admission events where you can get direct admission offers from university representatives.",
          features: [
            "Direct admission opportunities",
            "Face-to-face university interactions",
            "Instant application processing",
            "Scholarship negotiations",
          ],
          color: "bg-teal-500",
          keywords: "onspot, admission, university, direct, event",
          href: "/services/university-onspots",
        },
        {
          icon: Users,
          title: "Education Fairs",
          description:
            "Connect with multiple universities and education providers at our comprehensive education fairs and exhibitions.",
          features: [
            "Multi-university exhibitions",
            "Information sessions",
            "Application guidance",
            "Networking opportunities",
          ],
          color: "bg-green-600",
          keywords: "education, fair, exhibition, university, networking",
          href: "/services/education-fairs",
        },
      ],
    },
    "student-services": {
      title: "Student Services",
      color: "from-purple-500 to-pink-600",
      icon: Users,
      services: [
        {
          icon: Home,
          title: "Accommodation Support",
          description:
            "Find safe, affordable, and convenient student housing options in your destination country with our comprehensive support.",
          features: [
            "Verified accommodation listings",
            "Budget-friendly options",
            "Location-based recommendations",
            "Lease agreement assistance",
          ],
          color: "bg-rose-500",
          keywords: "accommodation, housing, student, support, rental",
          href: "/services/accommodation-support",
        },
        {
          icon: Plane,
          title: "Flight Booking",
          description:
            "Get the best flight deals for students with our travel booking services and pre-departure travel guidance.",
          features: [
            "Student discount flight bookings",
            "Flexible travel dates",
            "Travel insurance options",
            "Airport assistance coordination",
          ],
          color: "bg-sky-500",
          keywords: "flight, booking, travel, student, discount",
          href: "/services/flight-booking",
        },
        {
          icon: FileText,
          title: "Visa Assistance",
          description:
            "Navigate the complex visa process with our expert guidance, ensuring a high success rate for your application.",
          features: [
            "Documentation checklist & verification",
            "Application form filling assistance",
            "Visa interview preparation",
            "Latest immigration updates",
          ],
          color: "bg-indigo-500",
          keywords: "visa, assistance, immigration, documentation, support",
          href: "/services/visa-assistance",
        },
        {
          icon: Briefcase,
          title: "Pre-Departure Guidance",
          description:
            "Comprehensive pre-departure orientation to help you prepare for life and studies in your destination country.",
          features: [
            "Cultural orientation sessions",
            "Academic system briefing",
            "Essential documents checklist",
            "Emergency contact setup",
          ],
          color: "bg-purple-600",
          keywords: "pre-departure, guidance, orientation, preparation",
          href: "/services/pre-departure",
        },
      ],
    },
    "financial-services": {
      title: "Financial Services",
      color: "from-yellow-500 to-orange-600",
      icon: DollarSign,
      services: [
        {
          icon: CreditCard,
          title: "Education Loans",
          description:
            "Fund your education without the hassle. We connect you with leading banks for education loans with preferential rates.",
          features: [
            "Loan eligibility assessment",
            "End-to-end documentation support",
            "Comparison of top loan providers",
            "Quick approval process",
          ],
          color: "bg-emerald-500",
          keywords: "loan, education, fund, finance, bank",
          href: "/funds/education-loan",
        },
        {
          icon: CreditCard,
          title: "Forex Services",
          description:
            "Manage your international finances with competitive forex rates and convenient currency exchange services.",
          features: [
            "Competitive exchange rates",
            "Multi-currency forex cards",
            "Online money transfer",
            "Currency rate alerts",
          ],
          color: "bg-yellow-500",
          keywords: "forex, currency, exchange, international, money",
          href: "/funds/forex-cards",
        },
        {
          icon: CreditCard,
          title: "Credit Cards",
          description:
            "Get student-friendly credit cards with special benefits and features designed for international students.",
          features: [
            "Student-friendly credit cards",
            "International usage benefits",
            "Cashback and rewards",
            "Credit building assistance",
          ],
          color: "bg-orange-500",
          keywords: "credit, card, student, international, benefits",
          href: "/funds/credit-cards",
        },
        {
          icon: Trophy,
          title: "Scholarship Assistance",
          description:
            "Discover and apply for scholarships and financial aid opportunities to reduce your education costs.",
          features: [
            "Scholarship database access",
            "Application assistance",
            "Eligibility assessment",
            "Application tracking",
          ],
          color: "bg-amber-500",
          keywords: "scholarship, financial, aid, assistance, funding",
          href: "/services/scholarship-assistance",
        },
      ],
    },
  }

  const allServices = Object.values(serviceCategories).flatMap((category) => category.services)

  const filteredServices = useMemo(() => {
    let services = allServices

    if (selectedCategory !== "all") {
      services = serviceCategories[selectedCategory]?.services || []
    }

    if (searchTerm) {
      services = services.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.keywords.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return services
  }, [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-white text-blue-700 border-blue-200 shadow-sm">
            Our Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Comprehensive Support for Your Educational Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From career guidance to financial assistance, we provide end-to-end support to ensure your success in every
            step of your educational journey.
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="rounded-full"
            >
              <MoreHorizontal className="w-4 h-4 mr-2" />
              All Services
            </Button>
            {Object.entries(serviceCategories).map(([key, category]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                onClick={() => setSelectedCategory(key)}
                className="rounded-full"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.title}
              </Button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mb-12 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for a service (e.g., 'Visa', 'Loan', 'Career')..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-6 text-base rounded-full shadow-lg border-gray-200 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {filteredServices.length > 0 ? (
            <div className="grid gap-8 md:gap-12">
              {filteredServices.map((service, index) => (
                <Card
                  key={service.title}
                  className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
                >
                  <CardContent className="p-0">
                    <div className={`grid md:grid-cols-2 ${index % 2 === 1 ? "md:grid-cols-2" : ""}`}>
                      {/* Content */}
                      <div
                        className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 1 ? "md:order-2" : ""}`}
                      >
                        <div
                          className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 shadow-md`}
                        >
                          <service.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{service.title}</h3>
                        <p className="text-muted-foreground mb-6 text-lg">{service.description}</p>

                        <div className="space-y-3 mb-8">
                          {service.features.map((feature) => (
                            <div key={feature} className="flex items-center space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Button className="w-fit group bg-blue-600 hover:bg-blue-700" asChild>
                          <a href={service.href}>
                            Learn More
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                      </div>

                      {/* Visual */}
                      <div
                        className={`bg-gradient-to-br ${service.color.replace(
                          "bg-",
                          "from-",
                        )} to-slate-100 p-8 md:p-12 flex items-center justify-center ${
                          index % 2 === 1 ? "md:order-1" : ""
                        }`}
                      >
                        <div className="w-full max-w-sm">
                          <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 text-center shadow-lg">
                            <service.icon className="w-24 h-24 text-white mx-auto mb-4 drop-shadow-lg" />
                            <div className="space-y-2">
                              <div className="h-2 bg-white/40 rounded-full"></div>
                              <div className="h-2 bg-white/30 rounded-full w-3/4 mx-auto"></div>
                              <div className="h-2 bg-white/20 rounded-full w-1/2 mx-auto"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">No services found</h3>
              <p className="text-gray-500 mb-8">
                We couldn't find any services matching your search for "{searchTerm}".
              </p>
              <Button onClick={() => setSearchTerm("")} variant="outline">
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-xl mb-8 text-blue-100">Get personalized guidance from our expert counselors today.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Book Free Consultation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Contact Our Experts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
