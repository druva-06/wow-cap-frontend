"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BrainCircuit, CheckCircle, Target, TrendingUp, Users, ArrowRight, Lightbulb, BookOpen } from "lucide-react"

export default function CareerGuidancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <BrainCircuit className="w-10 h-10 text-white" />
          </div>
          <Badge variant="secondary" className="mb-4 bg-white text-blue-700 border-blue-200 shadow-sm">
            Career Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Career Guidance
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Navigate your career path with confidence. Our expert career counselors provide personalized guidance to
            help you make informed decisions about your professional future.
          </p>
        </div>
      </section>

      {/* How This Service Helps */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              How Career Guidance Transforms Your Future
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional career guidance helps you align your interests, skills, and market opportunities for
              long-term success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Clarify Career Goals",
                description:
                  "Identify your strengths, interests, and values to set clear, achievable career objectives.",
              },
              {
                icon: TrendingUp,
                title: "Market Insights",
                description:
                  "Stay updated with industry trends, job market demands, and emerging career opportunities.",
              },
              {
                icon: Lightbulb,
                title: "Skill Development",
                description: "Identify skill gaps and create a roadmap for professional development and growth.",
              },
              {
                icon: BookOpen,
                title: "Education Planning",
                description: "Choose the right courses, certifications, and degrees that align with your career goals.",
              },
              {
                icon: Users,
                title: "Networking Guidance",
                description:
                  "Learn effective networking strategies to build professional relationships and opportunities.",
              },
              {
                icon: CheckCircle,
                title: "Decision Making",
                description: "Make informed career decisions with expert advice and comprehensive analysis.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
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

      {/* Our Approach Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Career Guidance Approach</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive, personalized approach to career development and planning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">What We Cover</h3>
              <div className="space-y-4">
                {[
                  "Comprehensive career assessment and personality analysis",
                  "Industry research and market trend analysis",
                  "Skills gap identification and development planning",
                  "Educational pathway recommendations",
                  "Resume and portfolio optimization",
                  "Interview preparation and networking strategies",
                  "Long-term career planning and goal setting",
                  "Ongoing support and progress monitoring",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Session Structure</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Initial Assessment</h4>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive evaluation of your interests, skills, and goals
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Market Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Research industry trends and opportunities in your field
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Action Planning</h4>
                      <p className="text-sm text-muted-foreground">
                        Create a personalized roadmap for your career development
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Ongoing Support</h4>
                      <p className="text-sm text-muted-foreground">Regular check-ins and guidance as you progress</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Shape Your Career?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Get personalized career guidance from our expert counselors and take the first step towards your dream
                career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Book Career Consultation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Learn More
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
