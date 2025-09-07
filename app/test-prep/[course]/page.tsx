import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Users, Award, BookOpen, Target } from "lucide-react"

const courseData = {
  cat: {
    title: "CAT Preparation",
    subtitle: "Common Admission Test",
    description: "Comprehensive CAT preparation program for MBA admissions in top Indian B-schools",
    duration: "6-12 months",
    difficulty: "High",
    examDate: "November 2024",
    features: [
      "Quantitative Ability (QA)",
      "Verbal Ability & Reading Comprehension (VARC)",
      "Data Interpretation & Logical Reasoning (DILR)",
      "Mock Tests & Analysis",
      "Previous Year Papers",
      "Expert Faculty Guidance",
    ],
    stats: { students: "50,000+", success: "85%", rating: "4.8/5" },
  },
  gre: {
    title: "GRE Preparation",
    subtitle: "Graduate Record Examination",
    description: "Complete GRE prep for graduate school admissions in USA, Canada, and other countries",
    duration: "3-6 months",
    difficulty: "Medium-High",
    examDate: "Year Round",
    features: [
      "Verbal Reasoning",
      "Quantitative Reasoning",
      "Analytical Writing",
      "Adaptive Practice Tests",
      "Score Improvement Guarantee",
      "University Application Guidance",
    ],
    stats: { students: "75,000+", success: "90%", rating: "4.9/5" },
  },
  ielts: {
    title: "IELTS Preparation",
    subtitle: "International English Language Testing System",
    description: "IELTS preparation for study abroad, immigration, and work opportunities",
    duration: "2-4 months",
    difficulty: "Medium",
    examDate: "Multiple dates monthly",
    features: [
      "Listening Skills",
      "Reading Comprehension",
      "Writing Tasks 1 & 2",
      "Speaking Practice",
      "Band Score Improvement",
      "Country-specific Guidance",
    ],
    stats: { students: "100,000+", success: "92%", rating: "4.7/5" },
  },
}

export default function TestPrepCoursePage({ params }: { params: { course: string } }) {
  const course = courseData[params.course as keyof typeof courseData] || courseData.cat

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-yellow-400 text-purple-800">Test Preparation</Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">{course.subtitle}</p>
          <p className="text-lg max-w-3xl mx-auto mb-8">{course.description}</p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span>{course.difficulty}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>{course.examDate}</span>
            </div>
          </div>

          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold px-8 py-4">
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{course.stats.students}</div>
                <div className="text-gray-600">Students Trained</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{course.stats.success}</div>
                <div className="text-gray-600">Success Rate</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <CheckCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{course.stats.rating}</div>
                <div className="text-gray-600">Student Rating</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature}</h3>
                  <p className="text-gray-600 text-sm">
                    Comprehensive coverage with expert guidance and practice materials.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Get personalized study plan and free demo class</p>

          <Card className="bg-white text-gray-900">
            <CardContent className="p-8">
              <div className="grid gap-4">
                <Input placeholder="Full Name" className="text-lg py-3" />
                <Input placeholder="Email Address" type="email" className="text-lg py-3" />
                <Input placeholder="Phone Number" type="tel" className="text-lg py-3" />
                <Input placeholder="Target Score/College" className="text-lg py-3" />
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-lg font-semibold">
                  Get Free Demo Class
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">By submitting, you agree to our Terms & Privacy Policy</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
