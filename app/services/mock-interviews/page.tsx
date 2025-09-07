"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, CheckCircle, Clock, Users, Target, ArrowRight, Star } from "lucide-react"

export default function MockInterviewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <Badge variant="secondary" className="mb-4 bg-white text-purple-700 border-purple-200 shadow-sm">
            Career Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Mock Interview Practice
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Build confidence and master interview skills with our comprehensive mock interview sessions designed for
            university admissions and job applications.
          </p>
        </div>
      </section>

      {/* How This Service Helps */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">How Mock Interviews Help You Succeed</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Practice makes perfect. Our mock interview sessions prepare you for real-world scenarios and boost your
              confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Build Confidence",
                description:
                  "Practice in a safe environment to overcome interview anxiety and build self-assurance for the real interview.",
              },
              {
                icon: MessageSquare,
                title: "Improve Communication",
                description:
                  "Enhance your verbal and non-verbal communication skills with personalized feedback from experts.",
              },
              {
                icon: CheckCircle,
                title: "Perfect Your Answers",
                description: "Learn to structure compelling responses to common and challenging interview questions.",
              },
              {
                icon: Users,
                title: "Real Interview Experience",
                description:
                  "Simulate actual interview conditions with experienced professionals acting as interviewers.",
              },
              {
                icon: Star,
                title: "Personalized Feedback",
                description: "Receive detailed feedback on your performance with specific areas for improvement.",
              },
              {
                icon: Clock,
                title: "Time Management",
                description:
                  "Learn to manage time effectively and provide concise, impactful answers within time limits.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
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

      {/* Process Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Mock Interview Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A structured approach to help you excel in any interview scenario.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Assessment",
                description: "We evaluate your current interview skills and identify areas for improvement.",
              },
              {
                step: "02",
                title: "Preparation",
                description:
                  "Receive customized question banks and preparation materials based on your target interviews.",
              },
              {
                step: "03",
                title: "Practice Sessions",
                description: "Participate in realistic mock interview sessions with experienced professionals.",
              },
              {
                step: "04",
                title: "Feedback & Improvement",
                description: "Get detailed feedback and actionable tips to enhance your interview performance.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="border-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Ace Your Next Interview?</h2>
              <p className="text-xl mb-8 text-purple-100">
                Book your mock interview session today and boost your confidence for success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                  Book Mock Interview
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
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
