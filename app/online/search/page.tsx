"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ArrowUpDown, X } from "lucide-react"
import { HorizontalFilters } from "@/components/search-results/horizontal-filters"
import { TopBanner } from "@/components/search-results/top-banner"
import { AdBanner } from "@/components/search-results/ad-banner"
import { EnhancedResultCard } from "@/components/search-results/enhanced-result-card"

interface FilterState {
  countries: string[]
  levels: string[]
  duration: [number, number]
  exams: string[]
  feeRange: [number, number]
}

const initialFilters: FilterState = {
  countries: [],
  levels: [],
  duration: [0, 10],
  exams: [],
  feeRange: [0, 5000000],
}

const onlinePrograms = [
  {
    id: "jain-mba-online",
    universityId: "jain-university",
    name: "Jain University",
    course: "MBA in Digital Marketing",
    location: "Bangalore, India",
    city: "Bangalore",
    country: "India",
    fee: 0,
    duration: "2 years",
    level: "Masters",
    intake: "July 2024",
    universityLogo: "/placeholder.svg?height=60&width=120&text=Jain-University-Logo",
    universityRanking: 25,
    rating: 4.5,
    reviewCount: 120,
    scholarshipAvailable: true,
    applicationDeadline: "Rolling admissions",
    accreditations: ["NAAC A+", "UGC"],
    campusImage: "/placeholder.svg?height=400&width=600&text=Jain-University-Campus",
    courseAge: "Updated 2024",
    lastUpdated: "2024-01-01",
    about: "Leading private university offering quality online education",
    hostelAvailable: false,
  },
  {
    id: "amity-mtech-online",
    universityId: "amity-university",
    name: "Amity University",
    course: "M.Tech in Computer Science",
    location: "Noida, India",
    city: "Noida",
    country: "India",
    fee: 0,
    duration: "2 years",
    level: "Masters",
    intake: "July 2024",
    universityLogo: "/placeholder.svg?height=60&width=120&text=Amity-University-Logo",
    universityRanking: 35,
    rating: 4.3,
    reviewCount: 95,
    scholarshipAvailable: true,
    applicationDeadline: "Rolling admissions",
    accreditations: ["NAAC A+", "AICTE"],
    campusImage: "/placeholder.svg?height=400&width=600&text=Amity-University-Campus",
    courseAge: "Updated 2024",
    lastUpdated: "2024-01-01",
    about: "Premier private university with strong online programs",
    hostelAvailable: false,
  },
  {
    id: "manipal-mca-online",
    universityId: "manipal-university",
    name: "Manipal Academy of Higher Education",
    course: "MCA in Data Science",
    location: "Manipal, Karnataka, India",
    city: "Manipal",
    country: "India",
    fee: 0,
    duration: "2 years",
    level: "Masters",
    intake: "July 2024",
    universityLogo: "/placeholder.svg?height=60&width=120&text=Manipal-University-Logo",
    universityRanking: 15,
    rating: 4.6,
    reviewCount: 150,
    scholarshipAvailable: true,
    applicationDeadline: "Rolling admissions",
    accreditations: ["NAAC A+", "UGC"],
    campusImage: "/placeholder.svg?height=400&width=600&text=Manipal-University-Campus",
    courseAge: "Updated 2024",
    lastUpdated: "2024-01-01",
    about: "Renowned institution with excellent online learning platform",
    hostelAvailable: false,
  },
  {
    id: "jain-mtech-ai",
    universityId: "jain-university",
    name: "Jain University",
    course: "M.Tech in Artificial Intelligence",
    location: "Bangalore, India",
    city: "Bangalore",
    country: "India",
    fee: 0,
    duration: "2 years",
    level: "Masters",
    intake: "July 2024",
    universityLogo: "/placeholder.svg?height=60&width=120&text=Jain-University-Logo",
    universityRanking: 28,
    rating: 4.4,
    reviewCount: 110,
    scholarshipAvailable: true,
    applicationDeadline: "Rolling admissions",
    accreditations: ["NAAC A+", "UGC"],
    campusImage: "/placeholder.svg?height=400&width=600&text=Jain-University-Campus",
    courseAge: "Updated 2024",
    lastUpdated: "2024-01-01",
    about: "Leading private university offering quality online education",
    hostelAvailable: false,
  },
  {
    id: "amity-mba-online",
    universityId: "amity-university",
    name: "Amity University",
    course: "MBA in Business Analytics",
    location: "Noida, India",
    city: "Noida",
    country: "India",
    fee: 0,
    duration: "2 years",
    level: "Masters",
    intake: "July 2024",
    universityLogo: "/placeholder.svg?height=60&width=120&text=Amity-University-Logo",
    universityRanking: 40,
    rating: 4.2,
    reviewCount: 85,
    scholarshipAvailable: true,
    applicationDeadline: "Rolling admissions",
    accreditations: ["NAAC A+", "AICTE"],
    campusImage: "/placeholder.svg?height=400&width=600&text=Amity-University-Campus",
    courseAge: "Updated 2024",
    lastUpdated: "2024-01-01",
    about: "Premier private university with strong online programs",
    hostelAvailable: false,
  },
]

export default function OnlineSearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("relevance")
  const [currentPage, setCurrentPage] = useState(1)
  const [resultsPerPage] = useState(5)
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [favorites, setFavorites] = useState<string[]>([])
  const [comparisonList, setComparisonList] = useState<string[]>([])

  const urlQuery = searchParams.get("q") || ""
  const urlLevel = searchParams.get("level") || ""
  const urlYear = searchParams.get("year") || ""

  const filteredResults = onlinePrograms.filter((program) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        program.course.toLowerCase().includes(query) ||
        program.name.toLowerCase().includes(query) ||
        program.location.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    if (filters.levels.length > 0 && !filters.levels.includes(program.level)) {
      return false
    }

    return true
  })

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "ranking":
        return (a.universityRanking || 999) - (b.universityRanking || 999)
      case "rating":
        return (b.rating || 0) - (a.rating || 0)
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(sortedResults.length / resultsPerPage)
  const startIndex = (currentPage - 1) * resultsPerPage
  const endIndex = Math.min(startIndex + resultsPerPage, sortedResults.length)
  const paginatedResults = sortedResults.slice(startIndex, endIndex)

  useEffect(() => {
    if (urlQuery !== searchQuery) {
      setSearchQuery(urlQuery)
      setSearchInput(urlQuery)
    }

    if (urlLevel && urlLevel !== "all") {
      const newLevels = [urlLevel]
      setFilters((prev) => {
        if (JSON.stringify(prev.levels) !== JSON.stringify(newLevels)) {
          return {
            ...prev,
            levels: newLevels,
          }
        }
        return prev
      })
    }
  }, [urlQuery, urlLevel, urlYear])

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleAdvancedFiltersClick = () => {
    // Handle advanced filters modal
  }

  const handleSearch = () => {
    setSearchQuery(searchInput)
    setCurrentPage(1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleClearAllFilters = () => {
    setSearchInput("")
    setSearchQuery("")
    setFilters(initialFilters)
    setCurrentPage(1)
  }

  const areFiltersActive = searchQuery !== "" || JSON.stringify(filters) !== JSON.stringify(initialFilters)

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleComparison = (id: string) => {
    setComparisonList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else if (prev.length < 3) {
        return [...prev, id]
      } else {
        alert("You can compare maximum 3 courses at a time")
        return prev
      }
    })
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, 100)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="container mx-auto px-4 pt-6">
        <TopBanner
          title="Find Your Online University"
          subtitle="Access world-class online degree programs from top Indian universities"
          backgroundImage="/online-university-banner.jpg"
        />
      </div>

      <div className="bg-white shadow-sm border-b sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search online programs, universities, courses..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-12 pr-28 py-3 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
              />
              <Button onClick={handleSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2">
                Search
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] border-gray-300">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="ranking">University Ranking</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
              {areFiltersActive && (
                <Button variant="ghost" onClick={handleClearAllFilters} className="text-sm text-blue-600">
                  <X className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <HorizontalFilters
        onFilterChange={handleFilterChange}
        vertical="study-online"
        onAdvancedFiltersClick={handleAdvancedFiltersClick}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="mb-4 text-sm text-gray-600">
              Showing {startIndex + 1}-{endIndex} of {sortedResults.length} courses
            </div>

            <div className="space-y-4">
              {paginatedResults.map((program) => (
                <EnhancedResultCard
                  key={program.id}
                  result={program}
                  onToggleFavorite={toggleFavorite}
                  onToggleComparison={toggleComparison}
                  isFavorite={favorites.includes(program.id)}
                  isInComparison={comparisonList.includes(program.id)}
                  onApplyNow={(universityId, courseId) => {
                    router.push(`/apply/${universityId}/${courseId}`)
                  }}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 p-4 bg-white rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages} ({sortedResults.length} total courses)
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    size="sm"
                    className="hidden sm:inline-flex"
                  >
                    First
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    size="sm"
                  >
                    Previous
                  </Button>

                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum: number
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }

                      if (pageNum < 1 || pageNum > totalPages) return null

                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          onClick={() => handlePageChange(pageNum)}
                          size="sm"
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    size="sm"
                  >
                    Next
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    size="sm"
                    className="hidden sm:inline-flex"
                  >
                    Last
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-4">
            <AdBanner type="loan" />
            <AdBanner type="scholarship" />
            <AdBanner type="counseling" />
          </div>
        </div>
      </div>
    </div>
  )
}
