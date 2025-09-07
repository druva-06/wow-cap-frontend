"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModernLeadForm } from "@/components/modern-lead-form"
import { Star, Clock, Users, ArrowRight, Play, BookOpen, Globe } from "lucide-react"
import { studyOnlineCourses } from "@/lib/sample-data"

export default function StudyOnlineAbroadPage() {
  const internationalCourses = studyOnlineCourses.filter((course) =>
    ["Coursera", "edX", "Udacity", "Pluralsight", "FutureLearn"].includes(course.platform),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl mb-6 leading-tight mt-2 md:text-6xl lg:text-7xl font-bold">
                Study Online
                <span className="block text-blue-200 text-5xl md:text-6xl mt-2">International Courses</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Access world-class education from top international universities and platforms. Learn from industry
                experts and earn globally recognized certificates.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">100M+</div>
                  <div className="text-blue-200 text-sm">Global Learners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">5,000+</div>
                  <div className="text-blue-200 text-sm">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">87%</div>
                  <div className="text-blue-200 text-sm">Success Rate</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Courses
                </Button>
              </div>
            </div>

            <ModernLeadForm countryName="International Online" />
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">International Online Courses</h2>
            <p className="text-xl text-gray-600">Choose from undergraduate and postgraduate programs</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="undergraduate" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="undergraduate">Undergraduate Programs</TabsTrigger>
                <TabsTrigger value="postgraduate">Postgraduate Programs</TabsTrigger>
              </TabsList>

              <TabsContent value="undergraduate">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {internationalCourses
                    .filter((course) => course.level === "Undergraduate" || course.level === "Certificate")
                    .slice(0, 6)
                    .map((course) => (
                      <Card key={course.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="relative h-48">
                          <Image
                            src={course.image || "/placeholder.svg?height=200&width=400&text=Course"}
                            alt={course.title}
                            fill
                            className="object-cover rounded-t-lg"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-blue-600 text-white">{course.platform}</Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge variant="outline" className="bg-white">
                              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                              {course.rating}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {course.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {course.enrolledStudents}
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                              {course.originalPrice && (
                                <span className="text-sm text-gray-500 line-through ml-2">{course.originalPrice}</span>
                              )}
                            </div>
                            <Button asChild>
                              <Link href={`/courses/${course.id}`}>
                                View Course <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="postgraduate">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {internationalCourses
                    .filter((course) => course.level === "Postgraduate" || course.level === "Professional")
                    .slice(0, 6)
                    .map((course) => (
                      <Card key={course.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="relative h-48">
                          <Image
                            src={course.image || "/placeholder.svg?height=200&width=400&text=Course"}
                            alt={course.title}
                            fill
                            className="object-cover rounded-t-lg"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-purple-600 text-white">{course.platform}</Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge variant="outline" className="bg-white">
                              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                              {course.rating}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {course.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {course.enrolledStudents}
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-2xl font-bold text-purple-600">{course.price}</span>
                              {course.originalPrice && (
                                <span className="text-sm text-gray-500 line-through ml-2">{course.originalPrice}</span>
                              )}
                            </div>
                            <Button asChild>
                              <Link href={`/courses/${course.id}`}>
                                View Course <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Platform Partners */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our International Platform Partners</h2>
            <p className="text-xl text-gray-600">Learn from the world's leading online education platforms</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-6">
                <Image src="/coursera-logo.png" alt="Coursera" width={80} height={40} className="mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Coursera</h3>
                <p className="text-gray-600 mb-4">Partner with top universities like Stanford, Yale</p>
                <Button size="sm" asChild>
                  <Link href="/online/abroad">View Courses</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-6">
                <Image src="/edx-logo.png" alt="edX" width={80} height={40} className="mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">edX</h3>
                <p className="text-gray-600 mb-4">Founded by Harvard and MIT</p>
                <Button size="sm" asChild>
                  <Link href="/online/abroad">View Courses</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-6">
                <Image src="/udacity-logo.png" alt="Udacity" width={80} height={40} className="mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Udacity</h3>
                <p className="text-gray-600 mb-4">Industry-focused nanodegrees</p>
                <Button size="sm" asChild>
                  <Link href="/online/abroad">View Courses</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-6">
                <Image src="/pluralsight-logo.png" alt="Pluralsight" width={80} height={40} className="mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Pluralsight</h3>
                <p className="text-gray-600 mb-4">Technology and creative skills</p>
                <Button size="sm" asChild>
                  <Link href="/online/abroad">View Courses</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Start Your International Online Journey</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join millions of learners worldwide and earn certificates from top international institutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-blue-600">
              <Play className="h-5 w-5 mr-2" />
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Globe className="h-5 w-5 mr-2" />
              Browse All Courses
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
