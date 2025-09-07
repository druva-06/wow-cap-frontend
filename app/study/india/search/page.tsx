"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Grid3X3, List, ChevronLeft, ChevronRight, MapPin, GraduationCap, Star, Award } from "lucide-react"
import { HorizontalFilters } from "@/components/search-results/horizontal-filters"
import { TopBanner } from "@/components/search-results/top-banner"
import { AdBanner } from "@/components/search-results/ad-banner"
import { EnhancedResultCard } from "@/components/search-results/enhanced-result-card"
import { studyIndiaColleges } from "@/lib/sample-data"

interface FilterState {
  countries: string[]
  levels: string[]
  duration: [number, number]
  exams: string[]
  feeRange: [number, number]
}

interface SearchResult {
  id: string
  type: string
  name: string
  course: string
  location: string
  duration: string
  fees: string
  rating: number
  reviews: number
  image: string
  badges: string[]
  highlights: string[]
  deadline: string
  intake: string
  scholarships: boolean
  featured: boolean
}

export default function StudyIndiaSearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<FilterState>({
    countries: [],
    levels: [],
    duration: [1, 4],
    exams: [],
    feeRange: [0, 100000],
  })

  const resultsPerPage = 12

  // Get results from sample data
  const getResults = (): SearchResult[] => {
    return studyIndiaColleges.flatMap((college) =>
      college.courses.map((course) => ({
        id: `${college.id}-${course.id}`,
        type: "college",
        name: college.name,
        course: course.name,
        location: `${college.city}, ${college.country}`,
        duration: course.duration,
        fees: course.fees,
        rating: college.rating,
        reviews: college.reviews,
        image: college.image,
        badges: course.badges || [],
        highlights: college.highlights || [],
        deadline: course.deadline || "Rolling Admissions",
        intake: course.intake || "Multiple Intakes",
        scholarships: college.scholarships || false,
        featured: college.featured || false,
      })),
    )
  }

  const allResults = getResults()

  // Apply filters
  const filteredResults = allResults.filter((result) => {
    // Search query filter
    if (
      searchQuery &&
      !result.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !result.course.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Location filter (cities for India)
    if (filters.countries.length > 0) {
      const city = result.location.split(",")[0].trim()
      if (!filters.countries.some((filterCity) => city.includes(filterCity))) {
        return false
      }
    }

    if (filters.levels.length > 0) {
      const hasMatchingLevel = filters.levels.some((level) => {
        // Direct level matching
        if (result.course.toLowerCase().includes(level.toLowerCase())) return true

        // Badge matching
        if (result.badges && result.badges.some((badge) => badge.toLowerCase().includes(level.toLowerCase())))
          return true

        // Degree-based matching for postgraduate courses
        if (level.toLowerCase() === "postgraduate") {
          return (
            result.course.toLowerCase().includes("m.") ||
            result.course.toLowerCase().includes("master") ||
            result.course.toLowerCase().includes("mba") ||
            result.course.toLowerCase().includes("mca") ||
            result.course.toLowerCase().includes("m.tech") ||
            result.course.toLowerCase().includes("m.sc") ||
            result.course.toLowerCase().includes("m.a") ||
            result.course.toLowerCase().includes("mphil") ||
            result.course.toLowerCase().includes("phd")
          )
        }

        // Undergraduate matching
        if (level.toLowerCase() === "undergraduate") {
          return (
            result.course.toLowerCase().includes("b.") ||
            result.course.toLowerCase().includes("bachelor") ||
            result.course.toLowerCase().includes("bba") ||
            result.course.toLowerCase().includes("bca") ||
            result.course.toLowerCase().includes("b.tech") ||
            result.course.toLowerCase().includes("b.sc") ||
            result.course.toLowerCase().includes("b.a")
          )
        }

        return false
      })
      if (!hasMatchingLevel) return false
    }

    // Duration filter
    const durationYears = Number.parseInt(result.duration.split(" ")[0]) || 2
    if (durationYears < filters.duration[0] || durationYears > filters.duration[1]) {
      return false
    }

    // Exam filter
    if (filters.exams.length > 0) {
      const hasMatchingExam = filters.exams.some(
        (exam) =>
          result.highlights.some((highlight) => highlight.toLowerCase().includes(exam.toLowerCase())) ||
          result.badges.some((badge) => badge.toLowerCase().includes(exam.toLowerCase())),
      )
      if (!hasMatchingExam) return false
    }

    // Fee filter
    const feeAmount = Number.parseInt(result.fees.replace(/[₹,]/g, "")) || 0
    if (feeAmount < filters.feeRange[0] || feeAmount > filters.feeRange[1]) {
      return false
    }

    return true
  })

  // Sort results
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "fees-low":
        return Number.parseInt(a.fees.replace(/[₹,]/g, "")) - Number.parseInt(b.fees.replace(/[₹,]/g, ""))
      case "fees-high":
        return Number.parseInt(b.fees.replace(/[₹,]/g, "")) - Number.parseInt(a.fees.replace(/[₹,]/g, ""))
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return b.featured ? 1 : -1
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedResults.length / resultsPerPage)
  const startIndex = (currentPage - 1) * resultsPerPage
  const paginatedResults = sortedResults.slice(startIndex, startIndex + resultsPerPage)

  useEffect(() => {
    // Get search parameters from URL
    const query = searchParams.get("q") || ""
    const city = searchParams.get("city") || ""
    const level = searchParams.get("level") || ""

    setSearchQuery(query)

    if (city || level) {
      setFilters((prev) => ({
        ...prev,
        countries: city ? [city] : [],
        levels: level ? [level] : [],
      }))
    }
  }, [searchParams])

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="container mx-auto px-4 pt-6">
        <TopBanner
          title="Study in India"
          subtitle="Discover quality education opportunities across India"
          backgroundImage="/university-banner.jpg"
        />
      </div>

      {/* Search Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search colleges, courses, cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="rating">Highest Rated</option>
                <option value="fees-low">Fees: Low to High</option>
                <option value="fees-high">Fees: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing {startIndex + 1}-{Math.min(startIndex + resultsPerPage, sortedResults.length)} of{" "}
              {sortedResults.length} results
              {searchQuery && (
                <span className="ml-2">
                  for "<span className="font-medium text-gray-900">{searchQuery}</span>"
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Study in India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Filters */}
      <HorizontalFilters onFiltersChange={handleFiltersChange} vertical="study-india" />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-[1fr_200px] gap-8">
          {/* Results Section */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Colleges</p>
                      <p className="text-2xl font-bold text-blue-600">{allResults.length}</p>
                    </div>
                    <GraduationCap className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Cities</p>
                      <p className="text-2xl font-bold text-green-600">8+</p>
                    </div>
                    <MapPin className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Rating</p>
                      <p className="text-2xl font-bold text-purple-600">4.2</p>
                    </div>
                    <Star className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Scholarships</p>
                      <p className="text-2xl font-bold text-orange-600">50+</p>
                    </div>
                    <Award className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Grid/List */}
            {paginatedResults.length > 0 ? (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {paginatedResults.map((result) => (
                  <EnhancedResultCard
                    key={result.id}
                    result={{
                      ...result,
                      universityId: result.id.split("-")[0],
                      accreditations: ["NAAC", "UGC"],
                      applicationDeadline: result.deadline,
                      hostelAvailable: true,
                      scholarshipAvailable: result.scholarships,
                      reviewCount: result.reviews,
                      about: `Quality education at ${result.name}`,
                      campusImage: result.image,
                      logo: `/placeholder.svg?height=40&width=40&text=${result.name.charAt(0)}`,
                      country: "India",
                    }}
                    viewMode={viewMode}
                    vertical="study-india"
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria or filters to find more results.</p>
                  </div>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setFilters({
                        countries: [],
                        levels: [],
                        duration: [1, 4],
                        exams: [],
                        feeRange: [0, 100000],
                      })
                    }}
                    variant="outline"
                  >
                    Clear all filters
                  </Button>
                </div>
              </Card>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>

                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-10"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="px-2 py-1 text-gray-500">...</span>
                      <Button
                        variant={currentPage === totalPages ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        className="w-10"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Side Banners */}
          <div className="space-y-6">
            <div className="sticky top-32 space-y-6">
              <AdBanner type="loan" />
              <AdBanner type="scholarship" />
              <AdBanner type="service" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
