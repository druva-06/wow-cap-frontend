import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Brain, Target, Users, Clock, Star, BookOpen } from "lucide-react"

const careerGuidanceData = {
  "psychometric-test": {
    title: "Psychometric Test",
    subtitle: "Discover Your True Potential",
    description: "Scientific assessment to identify your personality, interests, and career aptitude",
    duration: "45-60 minutes",
    testTypes: [
      "Personality Assessment",
      "Interest Inventory",
      "Aptitude Test",
      "Career Matching",
      "Skill Analysis",
      "Learning Style Assessment",
    ],
    benefits: [
      "Identify your strengths and weaknesses",
      "Discover suitable career paths",
      "Understand your personality type",
      "Make informed educational choices",
      "Improve self-awareness",
      "Boost confidence in decision making",
    ],
    whoShouldTake: [
      "Students confused about career choices",
      "Professionals seeking career change",
      "Parents wanting to guide their children",
      "Anyone looking for self-discovery",
    ],
    process: [
      "Online registration and payment",
      "Complete the comprehensive test",
      "Receive detailed analysis report",
      "One-on-one counseling session",
      "Personalized career roadmap",
      "Follow-up support and guidance",
    ],
  },
  "up-to-12th": {
    title: "Career Guidance for Students Up to 12th",
    subtitle: "Shape Your Future Early",
    description: "Comprehensive career guidance for school students to make informed decisions about their future",
    duration: "Ongoing Support",
    testTypes: [
      "Stream Selection (Science/Commerce/Arts)",
      "Subject Combination Guidance",
      "Career Exploration",
      "Skill Development Planning",
      "Entrance Exam Preparation",
      "College Selection Strategy",
    ],
    benefits: [
      "Choose the right stream and subjects",
      "Explore various career options",
      "Develop essential skills early",
      "Prepare for competitive exams",
      "Build a strong academic foundation",
      "Gain clarity about future goals",
    ],
    whoShouldTake: [
      "Students in 9th-12th grade",
      "Parents of school-going children",
      "Students confused about stream selection",
      "Those planning for competitive exams",
    ],
    process: [
      "Initial assessment and counseling",
      "Stream and subject recommendation",
      "Career exploration sessions",
      "Skill development planning",
      "Regular progress monitoring",
      "Continuous guidance and support",
    ],
  },
  "above-12th": {
    title: "Career Guidance for Students Above 12th",
    subtitle: "Navigate Your Professional Journey",
    description: "Expert guidance for graduates and professionals to advance their careers and achieve their goals",
    duration: "Customized Programs",
    testTypes: [
      "Career Assessment",
      "Higher Education Planning",
      "Professional Skill Analysis",
      "Industry Trend Analysis",
      "Job Market Research",
      "Personal Branding Strategy",
    ],
    benefits: [
      "Choose the right career path",
      "Plan higher education effectively",
      "Develop professional skills",
      "Understand industry trends",
      "Build a strong professional network",
      "Achieve career advancement",
    ],
    whoShouldTake: ["Recent graduates", "Working professionals", "Career changers", "Students planning higher studies"],
    process: [
      "Comprehensive career assessment",
      "Industry and market analysis",
      "Personalized career planning",
      "Skill development recommendations",
      "Networking and mentorship",
      "Ongoing career support",
    ],
  },
}

export default function CareerGuidancePage({ params }: { params: { type: string } }) {
  const guidance =
    careerGuidanceData[params.type as keyof typeof careerGuidanceData] || careerGuidanceData["psychometric-test"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <div className="text-6xl mb-4">🧠</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{guidance.title}</h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">{guidance.subtitle}</p>
          <p className="text-lg max-w-3xl mx-auto mb-8">{guidance.description}</p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{guidance.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              <span>Scientific Assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span>Personalized Results</span>
            </div>
          </div>

          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-green-800 font-bold px-8 py-4">
            Start Your Assessment
          </Button>
        </div>
      </section>

      {/* Assessment Types */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">What We Assess</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidance.testTypes.map((type, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                <CardContent className="p-6">
                  <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{type}</h3>
                  <p className="text-gray-600 text-sm">Comprehensive analysis to guide your decisions</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Benefits You'll Gain</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidance.benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
                  <p className="text-lg font-medium">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Take */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Who Should Take This?</h3>
                <div className="space-y-3">
                  {guidance.whoShouldTake.map((person, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{person}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Our Process</h3>
                <div className="space-y-3">
                  {guidance.process.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "The psychometric test helped me discover my true passion for design. I'm now pursuing my dream
                    career!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-semibold">A</span>
                    </div>
                    <div>
                      <p className="font-semibold">Ananya Sharma</p>
                      <p className="text-sm text-gray-500">Design Student</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">Start Your Career Assessment</h2>
          <p className="text-xl mb-8">Take the first step towards discovering your ideal career path</p>

          <Card className="bg-white text-gray-900">
            <CardContent className="p-8">
              <div className="grid gap-4">
                <Input placeholder="Full Name" className="text-lg py-3" />
                <Input placeholder="Email Address" type="email" className="text-lg py-3" />
                <Input placeholder="Phone Number" type="tel" className="text-lg py-3" />
                <Input placeholder="Current Education Level" className="text-lg py-3" />
                <Input placeholder="Career Interests (Optional)" className="text-lg py-3" />
                <Button className="bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold">
                  Book Assessment Session
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Our career counselors will contact you within 24 hours to schedule your session
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
