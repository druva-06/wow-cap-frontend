"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, CheckCircle, Eye, Users, Building, ArrowRight, Camera, Calendar } from "lucide-react"

export default function CampusVisitsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <Badge variant="secondary" className="mb-4 bg-white text-green-700 border-green-200 shadow-sm">
            University Support
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Campus Visit Facility
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience universities firsthand with our organized campus visit programs. See the facilities, meet the
            faculty, and get a real feel for campus life before making your decision.
          </p>
        </div>
      </section>

      {/* How This Service Helps */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Why Campus Visits Matter</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nothing beats experiencing a university campus in person. Our campus visit facility helps you make
              informed decisions about your future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "See Before You Decide",
                description:
                  "Get a real feel for the campus environment, facilities, and infrastructure before committing to your education.",
              },
              {
                icon: Users,
                title: "Meet Current Students",
                description:
                  "Interact with current students to understand the academic culture, social life, and student experience.",
              },
              {
                icon: Building,
                title: "Explore Facilities",
                description:
                  "Tour laboratories, libraries, dormitories, sports facilities, and other campus amenities firsthand.",
              },
              {
                icon: Calendar,
                title: "Attend Classes",
                description:
                  "Sit in on actual classes to experience the teaching methodology and academic environment.",
              },
              {
                icon: CheckCircle,
                title: "Meet Faculty",
                description:
                  "Connect with professors and academic staff to understand the quality of education and research opportunities.",
              },
              {
                icon: Camera,
                title: "Document Your Visit",
                description: "Capture memories and important details to help you compare different universities later.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">What's Included in Our Campus Visits</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We organize comprehensive campus visits that cover all aspects of university life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Campus Tour Highlights</h3>
                <div className="space-y-4">
                  {[
                    "Academic buildings and classrooms",
                    "Research laboratories and facilities",
                    "Library and study spaces",
                    "Student dormitories and housing",
                    "Dining halls and cafeterias",
                    "Sports and recreation facilities",
                    "Student activity centers",
                    "Campus bookstore and services",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Interaction Opportunities</h3>
                <div className="space-y-4">
                  {[
                    "Meet with admission officers",
                    "Interact with current students",
                    "Faculty and professor meetings",
                    "Department-specific discussions",
                    "Financial aid consultations",
                    "Career services overview",
                    "International student support",
                    "Alumni network connections",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="border-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Visit Your Dream University?</h2>
              <p className="text-xl mb-8 text-green-100">
                Schedule your campus visit today and experience university life firsthand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  Schedule Campus Visit
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
                >
                  Contact Us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
