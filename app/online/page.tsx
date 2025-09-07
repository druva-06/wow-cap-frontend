"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, BookOpen, Clock, Users, Award, Search } from "lucide-react"
import Link from "next/link"

export default function OnlineCoursesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Online Learning Opportunities</h1>
          <p className="text-xl mb-8">Study from anywhere with world-class online courses</p>

          {/* Category Selection */}
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/online/search?type=international">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                <Globe className="w-5 h-5 mr-2" />
                International Programs
              </Button>
            </Link>
            <Link href="/online/search?type=indian">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 bg-transparent"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Indian Programs
              </Button>
            </Link>
            <Link href="/online/search">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 bg-transparent"
              >
                <Search className="w-5 h-5 mr-2" />
                All Programs
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
                <p className="text-gray-600">Learn at your own pace with 24/7 access to course materials</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                <p className="text-gray-600">Learn from industry experts and renowned professors</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Certified Programs</h3>
                <p className="text-gray-600">Earn recognized certificates and degrees</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
