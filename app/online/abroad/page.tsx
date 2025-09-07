"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, LayoutGrid, List, ChevronLeft, ChevronRight, MapPin, GraduationCap, Star, Award } from "lucide-react"
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

export default function OnlineAbroadPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
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

  const queryParam = searchParams.get("q") || ""
  const levelParam = searchParams.get("level") || ""
  const yearParam = searchParams.get("year") || ""

  const getResults = (): SearchResult[] => {
    return studyIndiaColleges
      .filter(
        (university) =>
          university.name.includes("Jain") ||
          university.name.includes("Amity") ||
          university.name.includes("Manipal") ||
          university.name.includes("University"),
      )
      .flatMap((university) =>
        university.courses
          .filter(
            (course) =>
              course.mode === "Online" ||
              course.mode === "Hybrid" ||
              course.name.toLowerCase().includes("online") ||
              course.name.includes("M.Tech") ||
              course.name.includes("Master") ||
              course.name.includes("MBA"),
          )
          .map((course) => ({
            id: `${university.id}-${course.id}`,
            type: "university",
            name: university.name,
            course: course.name,
            location: `${university.city || university.location}, India`,
            duration: course.duration || "2 years",
            fees: course.fees || "Contact for fees",
            rating: university.rating || 4.0,
            reviews: university.reviewCount || 100,
            image: university.image || "/placeholder.svg",
            badges: course.accreditations || university.accreditations || ["NAAC A+", "UGC"],
            highlights: university.highlights || [`NIRF Rank: ${university.ranking || 15}`],
            deadline: course.applicationDeadline || "Rolling Admissions",
            intake: Array.isArray(course.intake) ? course.intake.join(", ") : course.intake || "July 2024",
            scholarships: course.scholarshipAvailable || true,
            featured: university.featured || false,
          })),
      )
  }

  const allResults = getResults()

  const filteredResults = allResults.filter((result) => {
    if (
      searchQuery &&
      !result.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !result.course.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    if (filters.countries.length > 0) {
      if (!filters.countries.some((filterCountry) => result.location.includes(filterCountry))) {
        return false
      }
    }

    if (filters.levels.length > 0) {
      const hasMatchingLevel = filters.levels.some(
        (level) =>
          result.course.toLowerCase().includes(level.toLowerCase()) ||
          result.duration.toLowerCase().includes(level.toLowerCase()),
      )
      if (!hasMatchingLevel) return false
    }

    const durationYears = Number.parseInt(result.duration.split(" ")[0]) || 2
    if (durationYears < filters.duration[0] || durationYears > filters.duration[1]) {
      return false
    }

    if (
      result.fees !== "Contact for fees" &&
      (Number.parseInt(result.fees) < filters.feeRange[0] || Number.parseInt(result.fees) > filters.feeRange[1])
    ) {
      return false
    }

    return true
  })

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "fees-low":
        return a.fees === "Contact for fees"
          ? -1
          : b.fees === "Contact for fees"
            ? 1
            : Number.parseInt(a.fees) - Number.parseInt(b.fees)
      case "fees-high":
        return a.fees === "Contact for fees"
          ? 1
          : b.fees === "Contact for fees"
            ? -1
            : Number.parseInt(b.fees) - Number.parseInt(a.fees)
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return a.location.localeCompare(b.location)
    }
  })

  const totalPages = Math.ceil(sortedResults.length / resultsPerPage)
  const startIndex = (currentPage - 1) * resultsPerPage
  const paginatedResults = sortedResults.slice(startIndex, startIndex + resultsPerPage)

  useEffect(() => {
    const query = searchParams.get("q") || ""
    const level = searchParams.get("level") || ""
    const year = searchParams.get("year") || ""

    setSearchQuery(query)

    if (level || year) {
      const newLevels = level && level !== "all" ? [level] : []
      setFilters((prev) => ({
        ...prev,
        levels: newLevels,
      }))
    }
  }, [searchParams.get("q"), searchParams.get("level"), searchParams.get("year")])

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleAdvancedFiltersClick = () => {
    // Handle advanced filters modal or functionality
    console.log("Advanced filters clicked")
  }

  const transformResultForCard = (result: SearchResult) => {
    return {
      id: result.id,
      universityId: result.id,
      name: result.name, // University name
      course: result.course, // Course name
      location: result.location,
      city: result.location.split(",")[0].trim(),
      country: result.location.includes("India") ? "India" : "International",
      fee: result.fees === "Contact for fees" ? 0 : Number.parseInt(result.fees.replace(/[^0-9]/g, "")) || 0,
      intake: result.intake,
      duration: result.duration,
      level:
        result.course.includes("Master") || result.course.includes("M.Tech") || result.course.includes("MBA")
          ? "Postgraduate"
          : "Undergraduate",
      logo: result.image,
      campusImage: result.image,
      ranking: Number.parseInt(result.highlights[0]?.replace(/[^0-9]/g, "")) || 0,
      rating: result.rating,
      reviewCount: result.reviews,
      about: `${result.course} program at ${result.name}`,
      accreditations: result.badges || ["NAAC A+", "UGC"], // Fix: Ensure accreditations is always an array
      applicationDeadline: result.deadline,
      hostelAvailable: true,
      scholarshipAvailable: result.scholarships,
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <TopBanner
          title="Find Your Online University"
          subtitle="Discover accredited online degree programs from top Indian universities"
          backgroundImage="/university-banner.jpg"
        />
      </div>

      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search online programs, universities, courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
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

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <LayoutGrid className="w-4 h-4" />
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

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing {startIndex + 1}-{Math.min(startIndex + resultsPerPage, sortedResults.length)} of{" "}
              {sortedResults.length} courses
              {searchQuery && (
                <span className="ml-2">
                  for "<span className="font-medium text-gray-900">{searchQuery}</span>"
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Study Online</span>
            </div>
          </div>
        </div>
      </div>

      <HorizontalFilters
        onFilterChange={handleFiltersChange}
        vertical="study-india"
        onAdvancedFiltersClick={handleAdvancedFiltersClick}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-[1fr_200px] gap-8">
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Programs</p>
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
                      <p className="text-sm text-gray-600">Universities</p>
                      <p className="text-2xl font-bold text-green-600">15+</p>
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
                      <p className="text-2xl font-bold text-purple-600">4.6</p>
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
                      <p className="text-2xl font-bold text-orange-600">80%</p>
                    </div>
                    <Award className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {paginatedResults.length > 0 ? (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {paginatedResults.map((result) => (
                  <EnhancedResultCard key={result.id} result={transformResultForCard(result)} />
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
