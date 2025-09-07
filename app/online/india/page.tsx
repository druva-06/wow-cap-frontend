"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Clock, Star } from "lucide-react"
import { studyOnlineCourses } from "@/lib/sample-data"
import Image from "next/image"

export default function OnlineIndiaPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get("level") || "all")
  const [selectedYear, setSelectedYear] = useState(searchParams.get("year") || "all")

  // Filter for Indian courses
  const indiaCourses = studyOnlineCourses
    .filter((platform) => platform.country === "India")
    .flatMap((platform) =>
      platform.courses.map((course) => ({
        id: `${platform.id}-${course.id}`,
        courseName: course.name,
        platformName: platform.name,
        country: platform.country,
        fee: course.fee,
        duration: course.duration,
        level: course.level,
        rating: platform.rating,
        reviewCount: platform.reviewCount,
        logo: platform.logo,
        image: platform.image,
        instructor: course.instructor || "Expert Instructor",
      })),
    )

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (selectedLevel !== "all") params.set("level", selectedLevel)
    if (selectedYear !== "all") params.set("year", selectedYear)

    router.push(`/online/india?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Indian Online Courses</h1>
          <p className="text-blue-100">Learn from India's leading educational platforms</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search Indian online courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3"
              />
            </div>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Course Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Available Courses ({indiaCourses.length})</h2>
          <p className="text-gray-600">Explore quality online education from India</p>
        </div>

        <div className="grid gap-6">
          {indiaCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex">
                <div className="w-48 h-36 relative flex-shrink-0">
                  <Image
                    src={course.image || "/online-learning-campus.jpg"}
                    alt={course.platformName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-white p-1 rounded shadow-sm">
                    <Image
                      src={course.logo || "/placeholder.svg"}
                      alt={`${course.platformName} logo`}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.courseName}</h3>
                      <p className="text-sm text-gray-600 mb-2">{course.platformName}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span>{course.country}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>
                            {course.rating} ({course.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-green-600">
                      {typeof course.fee === "number" ? `₹${course.fee.toLocaleString()}` : course.fee}
                    </div>
                    <div className="flex gap-2">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">Enroll Now</Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
