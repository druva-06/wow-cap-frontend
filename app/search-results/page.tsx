"use client"

import { useEffect, useState, useRef } from "react"
import type React from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getEncryptedUser, setEncryptedUser, removeEncryptedUser } from "@/lib/encryption"
import {
  Search,
  ArrowUpDown,
  X,
  Heart,
  MapPin,
  Clock,
  User,
  Calendar,
  DollarSign,
  Award,
  BookOpen,
  Check,
} from "lucide-react"
import { studyAbroadUniversities, studyIndiaUniversities, studyOnlineCourses } from "@/lib/sample-data"
import { AuthLoginModal } from "@/components/modals/auth-login-modal"
import { ProfileCompletionModal } from "@/components/modals/profile-completion-modal"
import { IntakeSelectionModal } from "@/components/modals/intake-selection-modal"
import { TopBanner } from "@/components/search-results/top-banner"
import { AdBanner } from "@/components/search-results/ad-banner"
import { HorizontalFilters } from "@/components/search-results/horizontal-filters"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import type { UnifiedUserProfile } from "@/types/user"
import { toast } from "@/hooks/use-toast"
import { addWishlistItem, startCourseRegistration } from "@/lib/api/client"


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

function SearchResultsContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const vertical = searchParams.get("vertical") || "study-abroad"
  const queryFromUrl = searchParams.get("q") || ""

  console.log("[v0] SearchResults: Component mounted", { vertical, queryFromUrl })

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showIntakeModal, setShowIntakeModal] = useState(false)
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false)
  // Success state (integrated into intake modal)
  const [showIntakeSuccess, setShowIntakeSuccess] = useState(false)
  const [successRegistrationId, setSuccessRegistrationId] = useState<string>("")
  const [successIntakeSession, setSuccessIntakeSession] = useState<string>("")
  const [searchInput, setSearchInput] = useState(queryFromUrl)
  const [searchQuery, setSearchQuery] = useState(queryFromUrl)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<UnifiedUserProfile | null>(null)
  const [sortBy, setSortBy] = useState("relevance")
  const [currentPage, setCurrentPage] = useState(1)
  const [resultsPerPage] = useState(5)
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [loading, setLoading] = useState(false)
  const [apiCourses, setApiCourses] = useState<any[] | null>(null)
  const [apiPagination, setApiPagination] = useState<{ currentPage: number; pageSize: number; totalPages: number; totalItems: number } | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [wishlistLoading, setWishlistLoading] = useState<Record<string, boolean>>({})
  const [comparisonList, setComparisonList] = useState<string[]>([])
  const [pendingApplication, setPendingApplication] = useState<{ universityId: string; courseId: string; collegeCourseId: string; intake: string[]; courseName: string; universityName: string } | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    console.log("[v0] SearchResults: Auth check starting")
    // Try encrypted storage first
    let parsedUser = getEncryptedUser()

    if (!parsedUser) {
      // Fallback to unencrypted
      const userString = localStorage.getItem("wowcap_user") || sessionStorage.getItem("wowcap_user")
      if (userString) {
        try {
          parsedUser = JSON.parse(userString)
        } catch (error) {
          console.error("[v0] SearchResults: Error parsing user data", error)
          removeEncryptedUser()
          localStorage.removeItem("wowcap_user")
          sessionStorage.removeItem("wowcap_user")
          setAuthLoading(false)
          setShowLoginModal(true)
          return
        }
      }
    }

    if (parsedUser) {
      setIsLoggedIn(true)
      setUserData(parsedUser)
      setAuthLoading(false)
      console.log("[v0] SearchResults: User found, logged in")
    } else {
      setAuthLoading(false)
      setShowLoginModal(true)
      console.log("[v0] SearchResults: No user found, showing login modal")
    }

    const savedFavorites = localStorage.getItem("wowcap_favorites")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error("[v0] SearchResults: Error parsing favorites", error)
        localStorage.removeItem("wowcap_favorites")
      }
    }

    const savedComparison = localStorage.getItem("wowcap_comparison")
    if (savedComparison) {
      try {
        setComparisonList(JSON.parse(savedComparison))
      } catch (error) {
        console.error("[v0] SearchResults: Error parsing comparison list", error)
        localStorage.removeItem("wowcap_comparison")
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("wowcap_favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem("wowcap_comparison", JSON.stringify(comparisonList))
  }, [comparisonList])

  // Helpers: normalize levels, countries and duration
  const mapLevelsToApi = (levels: string[]) => {
    if (!levels || levels.length === 0) return []
    return levels
      .map((l) => (l || "").toString().trim().toLowerCase())
      .map((l) => {
        if (["master", "masters", "m", "pg", "postgraduate", "post-graduate", "post graduate"].includes(l)) return "MASTER"
        if (["undergraduate", "ug", "bachelor", "bachelors", "bachelors degree"].includes(l)) return "UNDERGRADUATE"
        if (["phd", "doctorate", "doctor", "doctoral"].includes(l)) return "PHD"
        // default to uppercase of value
        return l.toUpperCase()
      })
  }

  const mapCountriesToApi = (countries: string[]) => {
    if (!countries || countries.length === 0) return []
    return countries.map((c) => {
      const v = (c || "").toString().trim().toLowerCase()
      if (["us", "usa", "united states", "united states of america", "united state"].includes(v)) return "United States of America"
      if (["uk", "gb", "great britain", "united kingdom", "england"].includes(v)) return "United Kingdom"
      // otherwise return title-cased input to be safer
      return c
    })
  }

  const mapDurationToMonths = (duration: [number, number]) => {
    const minY = Math.max(0, Math.floor(duration?.[0] ?? 0))
    const maxY = Math.max(minY, Math.floor(duration?.[1] ?? minY))

    // If single-year selection (exact), follow mapping provided
    if (minY === maxY) {
      switch (minY) {
        case 1:
          return { minMonths: 0, maxMonths: 12 }
        case 2:
          return { minMonths: 13, maxMonths: 24 }
        case 3:
          return { minMonths: 25, maxMonths: 36 }
        default:
          // 4 or more
          return { minMonths: 37, maxMonths: 240 }
      }
    }

    // Range selection: convert years to months with sensible bounds
    const minMonths = minY <= 1 ? 0 : minY * 12
    const maxMonths = maxY >= 4 ? 240 : maxY * 12
    return { minMonths, maxMonths }
  }

  const debounceRef = useRef<number | null>(null)
  const fetchInProgressRef = useRef(false)
  const lastFetchKeyRef = useRef<string | null>(null)

  // Fetch server results when vertical is study-abroad, on mount and when filters/searchQuery changes
  useEffect(() => {
    if (vertical !== "study-abroad") return
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current)
    }

    // On initial mount, if we have cached backend results from the home page
    // use them directly to avoid an immediate duplicate API call.
    try {
      const cached = localStorage.getItem("wowcap_search_results")
      if (cached && !apiCourses) {
        const parsed = JSON.parse(cached)
        if (parsed && Array.isArray(parsed.data)) {
          setApiCourses(parsed.data)
          const pagination = parsed.pagination || null
          if (pagination) {
            setApiPagination({
              currentPage: pagination.currentPage || currentPage,
              pageSize: pagination.pageSize || resultsPerPage,
              totalPages: pagination.totalPages || Math.max(1, Math.ceil((pagination.totalItems || parsed.data.length) / resultsPerPage)),
              totalItems: pagination.totalItems || parsed.data.length,
            })
          }
          // record last fetch key so we don't immediately re-fetch the same payload
          try {
            const sp = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
            const intakeParamForKey = sp ? (sp.get('intake') || sp.get('intakeMonths') || '') : ''
            const keyObj = { page: (pagination && pagination.currentPage) || currentPage, q: queryFromUrl || searchQuery, filters, intake: intakeParamForKey }
            lastFetchKeyRef.current = JSON.stringify(keyObj)
          } catch (e) {
            // ignore
          }
          // don't immediately fetch from API when cached results exist
          return
        }
      }
    } catch (e) {
      // proceed to fetch if cache parsing fails
    }

    // debounce filter changes by 350ms
    debounceRef.current = window.setTimeout(() => {
      const pageToFetch = Math.max(1, currentPage)
      void fetchCoursesFromApi(pageToFetch)
    }, 350)

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vertical, searchQuery, filters, isLoggedIn])

  const handleLoginComplete = (newUserData: UnifiedUserProfile) => {
    setIsLoggedIn(true)
    setUserData(newUserData)
    setShowLoginModal(false)

    // Store encrypted user data
    const rememberMe = localStorage.getItem("wowcap_remember_me") === "true"
    setEncryptedUser(newUserData, !rememberMe)

    window.dispatchEvent(new Event("authStateChanged"))

    // Show profile modal immediately if profile not completed
    if (!newUserData.profileCompleted) {
      setTimeout(() => {
        setShowProfileModal(true)
      }, 100)
    } else if (pendingApplication) {
      // Show intake selection modal instead of directly navigating
      setShowIntakeModal(true)
    }
  }

  const handleProfileComplete = (completeProfileData: UnifiedUserProfile) => {
    setUserData(completeProfileData)
    setShowProfileModal(false)

    window.dispatchEvent(new Event("authStateChanged"))

    if (pendingApplication) {
      // Show intake selection modal instead of directly navigating
      setShowIntakeModal(true)
    }
  }

  const handleProfileSkip = () => {
    setShowProfileModal(false)

    if (pendingApplication) {
      // Show intake selection modal instead of directly navigating
      setShowIntakeModal(true)
    }
  }

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  // Build and send search request to server for study-abroad vertical
  const fetchCoursesFromApi = async (page: number) => {
    // Prevent duplicate fetches when same request is already in progress or just completed
    try {
      const sp = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
      const intakeParamForKey = sp ? (sp.get('intake') || sp.get('intakeMonths') || '') : ''
      const keyObj = { page, q: searchQuery, filters, intake: intakeParamForKey }
      const key = JSON.stringify(keyObj)
      if (fetchInProgressRef.current) {
        console.log('[v0] SearchResults: fetch already in progress, skipping duplicate')
        return
      }
      if (lastFetchKeyRef.current === key) {
        console.log('[v0] SearchResults: fetch payload identical to last fetch, skipping')
        return
      }
      lastFetchKeyRef.current = key
      fetchInProgressRef.current = true
    } catch (e) {
      // continue if key computation fails
    }

    setLoading(true)
    try {
      const { searchCollegeCourses } = await import("@/lib/api/client")

      // Normalize filters for API
      const apiLevels = mapLevelsToApi(filters.levels || [])
      const apiCountries = mapCountriesToApi(filters.countries || [])
      const apiDuration = mapDurationToMonths(filters.duration || [0, 0])

      // Determine intakeMonths: prefer URL param 'intake', then filters (if any)
      const intakeParam = (() => {
        try {
          const sp = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
          if (sp) return sp.get('intake') || sp.get('intakeMonths') || null
        } catch (e) {
          return null
        }
        return null
      })()

      const mapIntakeToMonthsLocal = (intakeValue: string | null) => {
        if (!intakeValue) return []
        const v = intakeValue.toString().trim()
        if (!v) return []
        // If already comma-separated codes
        const tokens = v.split(/[ ,|]+/).map((t) => t.trim()).filter(Boolean)
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        const normalized: string[] = []
        for (const t of tokens) {
          const code = t.slice(0, 3).toUpperCase()
          if (months.includes(code)) normalized.push(code)
          else {
            const lower = t.toLowerCase()
            if (lower.includes('jan')) normalized.push('JAN')
            else if (lower.includes('feb')) normalized.push('FEB')
            else if (lower.includes('mar')) normalized.push('MAR')
            else if (lower.includes('apr')) normalized.push('APR')
            else if (lower.includes('may')) normalized.push('MAY')
            else if (lower.includes('jun')) normalized.push('JUN')
            else if (lower.includes('jul')) normalized.push('JUL')
            else if (lower.includes('aug')) normalized.push('AUG')
            else if (lower.includes('sep')) normalized.push('SEP')
            else if (lower.includes('oct')) normalized.push('OCT')
            else if (lower.includes('nov')) normalized.push('NOV')
            else if (lower.includes('dec')) normalized.push('DEC')
          }
        }
        return Array.from(new Set(normalized))
      }

      // Map internal filters to API payload shape
      const payload = {
        pagination: {
          page: Math.max(1, page),
          size: resultsPerPage,
        },
        filters: {
          courses: [],
          departments: [],
          graduation_levels: apiLevels,
          countries: apiCountries,
          duration: apiDuration,
          // If URL contains an intake parameter, use it. Otherwise use empty array so backend returns all.
          intakeMonths: intakeParam ? mapIntakeToMonthsLocal(intakeParam) : [],
        },
        search: {
          term: searchQuery || "",
        },
      }

      const res = await searchCollegeCourses(payload)

      // Normalize possible response shapes
      const list = res?.data || res?.response?.data || res?.response || res || { data: [] }
      const pagination = res?.pagination || res?.response?.pagination || null

      // If API returned top-level object containing data and pagination
      const dataArray = Array.isArray(list) ? list : list.data || []

      setApiCourses(dataArray)
      try {
        const storeObj = { data: dataArray, pagination }
        localStorage.setItem("wowcap_search_results", JSON.stringify(storeObj))
      } catch (e) {
        // ignore storage errors
      }

      if (pagination) {
        setApiPagination({
          currentPage: pagination.currentPage || page,
          pageSize: pagination.pageSize || resultsPerPage,
          totalPages: pagination.totalPages || Math.max(1, Math.ceil((pagination.totalItems || dataArray.length) / resultsPerPage)),
          totalItems: pagination.totalItems || dataArray.length,
        })
      } else {
        setApiPagination({ currentPage: page, pageSize: resultsPerPage, totalPages: Math.max(1, Math.ceil(dataArray.length / resultsPerPage)), totalItems: dataArray.length })
      }
    } catch (err) {
      console.error("[v0] SearchResults: Error fetching courses from API", err)
      setApiCourses([])
      setApiPagination({ currentPage: page, pageSize: resultsPerPage, totalPages: 1, totalItems: 0 })
    } finally {
      setLoading(false)
      fetchInProgressRef.current = false
    }
  }

  const handleAdvancedFiltersClick = () => {
    // Handle advanced filters modal
  }

  const handleAddToWishlist = async (course: any) => {
    try {
      if (!isLoggedIn || !userData) {
        setShowLoginModal(true)
        return
      }

      const key = course.id as string
      if (wishlistLoading[key]) return
      setWishlistLoading((prev) => ({ ...prev, [key]: true }))

      // Extract numeric student id if stored as "WC123"
      const rawStudentId = userData.studentId || ""
      const numericPart = rawStudentId ? Number(String(rawStudentId).replace(/\D+/g, "")) : NaN
      const studentIdForApi = Number.isFinite(numericPart) && numericPart > 0 ? numericPart : undefined

      if (!studentIdForApi) {
        toast({ title: "Profile issue", description: "Cannot determine your student ID.", variant: "destructive" })
        return
      }

      const courseIdForApi = course.collegeCourseId || course.courseId
      if (!courseIdForApi) {
        toast({ title: "Missing course info", description: "Course identifier is not available.", variant: "destructive" })
        return
      }

      const res = await addWishlistItem(studentIdForApi, courseIdForApi)
      if (res?.success) {
        setFavorites((prev) => (prev.includes(key) ? prev : [...prev, key]))
        toast({ title: "Added to wishlist", description: res?.message || "Item added to wishlist" })
      } else {
        const msg = res?.message || "Could not add to wishlist"
        // If already exists, mark as favorite locally for UI consistency
        if (/already\s+in\s+the\s+wishlist/i.test(msg)) {
          setFavorites((prev) => (prev.includes(key) ? prev : [...prev, key]))
        }
        toast({ title: "Wishlist", description: msg, variant: res?.success ? undefined : "destructive" })
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Failed to add to wishlist"
      toast({ title: "Wishlist error", description: String(msg), variant: "destructive" })
    } finally {
      setWishlistLoading((prev) => {
        const copy = { ...prev }
        delete copy[course.id]
        return copy
      })
    }
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

  const getAllCourses = () => {
    console.log("[v0] SearchResults: Getting courses for vertical:", vertical)
    let sourceData: any[] = []

    try {
      // If study-abroad, prefer backend results saved in localStorage
      if (vertical === "study-abroad") {
        try {
          const backend = localStorage.getItem("wowcap_search_results")
          if (backend) {
            const parsed = JSON.parse(backend)
            if (parsed && Array.isArray(parsed.data)) {
              sourceData = parsed.data.map((item: any) => ({
                // normalize to previous sample-data university shape
                id: String(item.collegeId || "unknown"),
                collegeCourseId: item.collegeCourseId || "unknown",
                name: item.collegeName || "Unknown College",
                city: item.campusName || "",
                country: item.country || "",
                logo: item.collegeImage || null,
                ranking: item.universityRanking || 999,
                rating: item.rating || 4.5,
                reviewCount: item.reviewCount || 0,
                courses: [
                  {
                    id: item.courseId || item.collegeCourseId || "unknown",
                    name: item.courseName || "Unknown Course",
                    fee: item.tuitionFee || 0,
                    duration: item.duration || "2 years",
                    intake: Array.isArray(item.intakeMonths) ? item.intakeMonths : (item.intakeMonths || item.intakeYear || ""),
                    courseRaw: item,
                  },
                ],
              }))
              console.log('[v0] SearchResults: Using backend search results count:', sourceData.length)
            }
          }
        } catch (e) {
          console.error('[v0] SearchResults: Error parsing backend search results', e)
        }
      }

      if (vertical === "study-abroad") {
        // If backend returned no results, do NOT fall back to mock/sample data.
        // Leave `sourceData` empty so the UI can show a clear "No results" state.
        if (!sourceData || sourceData.length === 0) {
          console.log("[v0] SearchResults: No backend results for study-abroad")
        } else {
          console.log("[v0] SearchResults: Using backend search results count:", sourceData.length)
        }
      } else if (vertical === "study-india") {
        sourceData = studyIndiaUniversities || []
        console.log("[v0] SearchResults: Using studyIndiaUniversities, count:", sourceData.length)
      } else if (vertical === "study-online") {
        sourceData = studyOnlineCourses || []
        console.log("[v0] SearchResults: Using studyOnlineCourses, count:", sourceData.length)
      } else {
        sourceData = [...(studyAbroadUniversities || []), ...(studyIndiaUniversities || [])]
        console.log("[v0] SearchResults: Using combined data, count:", sourceData.length)
      }

      const courses = sourceData.flatMap((uni) => {
        if (!uni || !uni.courses || !Array.isArray(uni.courses)) {
          console.warn("[v0] SearchResults: Invalid university data", uni)
          return []
        }

        return uni.courses
          .map((course) => {
            if (!course) {
              console.warn("[v0] SearchResults: Invalid course data", course)
              return null
            }

            let parsedFee = 0
            if (typeof course.fee === "number") {
              parsedFee = course.fee
            } else if (typeof course.fee === "string") {
              const feeMatch = course.fee.replace(/[^0-9]/g, "")
              parsedFee = feeMatch ? Number.parseInt(feeMatch, 10) : 0
            }

            return {
              id: `${uni.id || "unknown"}-${course.id || "unknown"}`,
              collegeCourseId: course.collegeCourseId || "unknown",
              courseId: course.id || "unknown",
              universityId: uni.id || "unknown",
              courseName: course.name || "Unknown Course",
              universityName: uni.name || "Unknown University",
              location: `${uni.city || uni.location || "Unknown City"}, ${uni.country || "Unknown Country"}`,
              country: uni.country || "Unknown Country",
              city: uni.city || uni.location || "Unknown City",
              fee: parsedFee,
              duration: course.duration || "2 years",
              level: course.level || course.degree || "Graduate",
              intake: Array.isArray(course.intake) ? course.intake.join(", ") : course.intake || "Rolling",
              universityLogo:
                uni.logo ||
                `/placeholder.svg?height=60&width=120&text=${encodeURIComponent(uni.name || "University")}&query=${encodeURIComponent(uni.name || "University")} university logo`,
              universityRanking: uni.ranking || 999,
              rating: uni.rating || 4.5,
              reviewCount: uni.reviewCount || 120,
              scholarshipAvailable: course.scholarshipAvailable || false,
              applicationDeadline: course.applicationDeadline || "Rolling admissions",
              accreditations: Array.isArray(uni.accreditation)
                ? uni.accreditation
                : uni.accreditation
                  ? [uni.accreditation]
                  : ["Accredited"],
              campusImage:
                uni.image ||
                `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(uni.name || "University")}-Campus&query=${encodeURIComponent(uni.name || "University")} university campus building`,
              courseImage: `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(course.name || "Course")}&query=${encodeURIComponent(course.name || "Course")} course ${(course.name || "course").toLowerCase()} classroom students`,
              courseAge: course.startDate ? `Updated ${new Date(course.startDate).getFullYear()}` : "Recently Updated",
              lastUpdated: course.startDate || "2024-01-01",
            }
          })
          .filter(Boolean) // Remove null entries
      })

      console.log("[v0] SearchResults: Total courses generated:", courses.length)
      return courses
    } catch (error) {
      console.error("[v0] SearchResults: Error processing course data", error)
      return []
    }
  }

  const applyFilters = (courses: any[]) => {
    try {
      return courses.filter((course) => {
        if (!course) return false

        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          const matchesSearch =
            (course.courseName || "").toLowerCase().includes(query) ||
            (course.universityName || "").toLowerCase().includes(query) ||
            (course.location || "").toLowerCase().includes(query)
          if (!matchesSearch) return false
        }

        if (filters.countries.length > 0 && !filters.countries.includes(course.country)) {
          return false
        }

        if (filters.levels.length > 0 && !filters.levels.includes(course.level)) {
          return false
        }

        const courseFee = course.fee || 0
        if (courseFee < filters.feeRange[0] || courseFee > filters.feeRange[1]) {
          return false
        }

        let durationYears = 2 // default
        if (course.duration) {
          const durationMatch = course.duration.toString().match(/(\d+(?:\.\d+)?)/)
          if (durationMatch) {
            durationYears = Number.parseFloat(durationMatch[1]) || 2
          }
        }
        if (durationYears < filters.duration[0] || durationYears > filters.duration[1]) {
          return false
        }

        return true
      })
    } catch (error) {
      console.error("[v0] SearchResults: Error applying filters", error)
      return courses
    }
  }

  const sortCourses = (courses: any[]) => {
    try {
      const sorted = [...courses]
      switch (sortBy) {
        case "ranking":
          return sorted.sort((a, b) => (a.universityRanking || 999) - (b.universityRanking || 999))
        case "fees-low":
          return sorted.sort((a, b) => (a.fee || 0) - (b.fee || 0))
        case "fees-high":
          return sorted.sort((a, b) => (b.fee || 0) - (a.fee || 0))
        case "rating":
          return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        default:
          return sorted
      }
    } catch (error) {
      console.error("[v0] SearchResults: Error sorting courses", error)
      return courses
    }
  }

  // If apiCourses is provided (study-abroad), use server-driven pagination and counts.
  const allCourses = apiCourses ? apiCourses.map((item: any) => {
    // map server item into UI course shape similar to previous mapping
    return {
      id: `${item.collegeId || item.collegeCourseId || 'unknown'}-${item.courseId || item.collegeCourseId || 'unknown'}`,
      courseId: item.courseId || 'unknown',
      collegeCourseId: item.collegeCourseId || 'unknown',
      universityId: String(item.collegeId || item.collegeCourseId || 'unknown'),
      courseName: item.courseName || 'Unknown Course',
      universityName: item.collegeName || 'Unknown University',
      location: `${item.campusName || ''}, ${item.country || ''}`,
      country: item.country || 'Unknown Country',
      city: item.campusName || item.city || 'Unknown City',
      fee: Number(item.tuitionFee) || 0,
      duration: item.duration || '2 years',
      level: item.graduationLevel || 'Graduate',
      intake: Array.isArray(item.intakeMonths) ? item.intakeMonths : item.intakeMonths || item.intakeYear || '',
      universityLogo: item.collegeImage || `/placeholder.svg?height=40&width=80&text=${encodeURIComponent(item.collegeName || 'University')}`,
      universityRanking: item.universityRanking || 999,
      rating: item.rating || 4.5,
      reviewCount: item.reviewCount || 0,
      scholarshipAvailable: item.scholarshipAvailable || false,
      applicationDeadline: item.applicationDeadline || 'Rolling admissions',
      accreditations: item.accreditation ? (Array.isArray(item.accreditation) ? item.accreditation : [item.accreditation]) : ['Accredited'],
      campusImage: item.campusImage || item.collegeImage || `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(item.collegeName || 'University')}`,
      courseImage: item.courseImage || `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(item.courseName || 'Course')}`,
      courseAge: item.startDate ? `Updated ${new Date(item.startDate).getFullYear()}` : 'Recently Updated',
      lastUpdated: item.startDate || '2024-01-01',
    }
  }) : getAllCourses()

  const filteredCourses = apiCourses ? allCourses : applyFilters(allCourses)
  const sortedCourses = sortCourses(filteredCourses)

  const totalPages = apiPagination ? Math.max(1, apiPagination.totalPages) : Math.max(1, Math.ceil(sortedCourses.length / resultsPerPage))
  const startIndex = apiPagination ? Math.max(0, (apiPagination.currentPage - 1) * (apiPagination.pageSize || resultsPerPage)) : Math.max(0, (currentPage - 1) * resultsPerPage)
  const endIndex = apiPagination ? Math.min(startIndex + (apiPagination.pageSize || resultsPerPage), apiPagination.totalItems || sortedCourses.length) : Math.min(startIndex + resultsPerPage, sortedCourses.length)
  const paginatedCourses = apiPagination ? sortedCourses : sortedCourses.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    // If we have API pagination info, clamp to available pages
    const maxPage = apiPagination?.totalPages || totalPages
    const clamped = Math.max(1, Math.min(page, maxPage))
    if (clamped === currentPage) return
    setCurrentPage(clamped)
    // Fetch the requested page from server if study-abroad
    if (vertical === "study-abroad") {
      void fetchCoursesFromApi(clamped)
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  const handleSearch = () => {
    setSearchQuery(searchInput)
    setCurrentPage(1)
    const params = new URLSearchParams(searchParams)
    params.set("q", searchInput)
    router.push(`${pathname}?${params.toString()}`)
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
    router.push(pathname + `?vertical=${vertical}`)
  }

  const areFiltersActive = searchQuery !== "" || JSON.stringify(filters) !== JSON.stringify(initialFilters)

  const formatFee = (fee: number) => {
    if (!fee || fee === 0) return "Contact for fees"
    return `₹${(fee).toLocaleString()}/year`
  }

  const monthCodeToName = (code: string) => {
    if (!code) return null
    const c = code.toString().trim().slice(0, 3).toUpperCase()
    const map: Record<string, string> = {
      JAN: "January",
      FEB: "February",
      MAR: "March",
      APR: "April",
      MAY: "May",
      JUN: "June",
      JUL: "July",
      AUG: "August",
      SEP: "September",
      OCT: "October",
      NOV: "November",
      DEC: "December",
    }
    return map[c] || null
  }

  const formatIntake = (intake: string | string[] | undefined) => {
    try {
      if (!intake) return "Rolling"

      let codes: string[] = []
      if (Array.isArray(intake)) codes = intake.map((s) => (s || "").toString().trim().toUpperCase().slice(0, 3))
      else codes = intake.toString().split(/[ ,|]+/).map((s) => (s || "").toString().trim().toUpperCase().slice(0, 3)).filter(Boolean)

      if (codes.length === 0) return "Rolling"

      // Return 3-letter codes (e.g., JAN, JUN, SEP)
      const validCodes = codes.filter((c) => c.length === 3)

      // If there are multiple, join with comma
      return validCodes.length > 0 ? validCodes.join(", ") : "Rolling"
    } catch (e) {
      return "Rolling"
    }
  }

  const createSlug = (text: string) => {
    if (!text) return "unknown"
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleApplyNow = (course: any) => {
    const searchData = {
      query: searchQuery,
      vertical: vertical,
      country: searchParams.get("country") || "all",
      city: searchParams.get("city") || "all",
      level: searchParams.get("level") || "all",
      intake: searchParams.get("intake") || "all",
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("search_parameters", JSON.stringify(searchData))

    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    // Parse intake months from course data
    let intakeMonths: string[] = []
    if (Array.isArray(course.intake)) {
      intakeMonths = course.intake
    } else if (typeof course.intake === 'string') {
      intakeMonths = course.intake.split(/[,\s]+/).filter(Boolean)
    }

    // Set pending application with intake data
    setPendingApplication({
      universityId: course.universityId,
      courseId: course.courseId,
      collegeCourseId: course.collegeCourseId,
      intake: intakeMonths,
      courseName: course.courseName,
      universityName: course.universityName,
    })

    // Show intake selection modal
    setShowIntakeModal(true)
  }

  const handleIntakeConfirm = async (selectedMonth: string, selectedYear: number, remarks?: string) => {
    if (!pendingApplication) return

    setIsSubmittingApplication(true)

    try {
      // Extract numeric student id
      const rawStudentId = userData?.studentId || ""
      const numericPart = rawStudentId ? Number(String(rawStudentId).replace(/\D+/g, "")) : NaN
      const studentIdForApi = Number.isFinite(numericPart) && numericPart > 0 ? numericPart : undefined

      if (!studentIdForApi) {
        toast({
          title: "Profile issue",
          description: "Cannot determine your student ID. Please complete your profile.",
          variant: "destructive"
        })
        setIsSubmittingApplication(false)
        return
      }

      // Get college course ID from pending application (use collegeCourseId, NOT courseId)
      const collegeCourseId = Number(pendingApplication.collegeCourseId)
      if (!collegeCourseId || isNaN(collegeCourseId)) {
        toast({
          title: "Invalid course",
          description: "College Course ID is not valid.",
          variant: "destructive"
        })
        setIsSubmittingApplication(false)
        return
      }

      // Format intake session as "MON YYYY" (e.g., "SEP 2025")
      const intakeSession = `${selectedMonth} ${selectedYear}`

      // Call the API to start registration
      const response = await startCourseRegistration({
        student_id: studentIdForApi,
        college_course_id: collegeCourseId,
        intake_session: intakeSession,
        remarks: remarks || undefined,
      })

      if (response?.success) {
        // Store the selected intake in localStorage for the application form
        localStorage.setItem("selected_intake", JSON.stringify({
          month: selectedMonth,
          year: selectedYear,
          remarks: remarks || "",
          registrationId: response.response?.registrationId,
          timestamp: new Date().toISOString(),
        }))

        // Show success state in the same modal
        setSuccessRegistrationId(response.response?.registrationId || "")
        setSuccessIntakeSession(intakeSession)
        setShowIntakeSuccess(true)

        // Don't reset pendingApplication here - it will be reset when modal closes
      } else {
        toast({
          title: "Registration Failed",
          description: response?.message || "Failed to start registration. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("Error starting registration:", error)
      toast({
        title: "Error",
        description: error?.message || "An error occurred while starting your registration.",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingApplication(false)
    }
  }

  const handleIntakeModalClose = () => {
    setShowIntakeModal(false)
    setPendingApplication(null)
    // Reset success state
    setShowIntakeSuccess(false)
    setSuccessRegistrationId("")
    setSuccessIntakeSession("")
  }

  if (authLoading) {
    console.log("[v0] SearchResults: Showing auth loading")
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    console.log("[v0] SearchResults: Showing login modal")
    return (
      <div className="min-h-screen bg-gray-50">
        <AuthLoginModal
          isOpen={showLoginModal}
          onClose={() => {
            router.push("/")
          }}
          onLoginComplete={handleLoginComplete}
        />
      </div>
    )
  }

  console.log("[v0] SearchResults: Rendering main content")
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <TopBanner />
      </div>

      <div className="bg-white shadow-sm border-b sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search courses, universities, locations..."
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
                  <SelectItem value="fees-low">Fees: Low to High</SelectItem>
                  <SelectItem value="fees-high">Fees: High to Low</SelectItem>
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
        vertical={vertical}
        onAdvancedFiltersClick={handleAdvancedFiltersClick}
      />

      {comparisonList.length > 0 && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-blue-900">Compare ({comparisonList.length}/3):</span>
                <div className="flex gap-2">
                  {comparisonList.map((id) => {
                    const course = sortedCourses.find((c) => c.id === id)
                    return course ? (
                      <span key={id} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {(course.courseName || "Unknown").substring(0, 20)}...
                      </span>
                    ) : null
                  })}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Compare Now
                </Button>
                <Button size="sm" variant="outline" onClick={() => setComparisonList([])}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
                    <div className="flex gap-4">
                      <div className="w-48 h-36 bg-gray-200 rounded"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedCourses.length > 0 ? (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  Showing {startIndex + 1}-{endIndex} of {sortedCourses.length} courses
                </div>

                <div className="space-y-4">
                  {paginatedCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 course-card"
                    >
                      <div className="flex search-result-card">
                        <div className="w-48 relative flex-shrink-0 h-48 leading-8">
                          <Image
                            src={
                              course.courseImage ||
                              course.campusImage ||
                              "/placeholder.svg?height=300&width=400&text=Course-Image&query=university course classroom" ||
                              "/placeholder.svg" ||
                              "/placeholder.svg"
                            }
                            alt={`${course.courseName || "Course"} at ${course.universityName || "University"}`}
                            fill
                            className="object-cover rounded-l-lg"
                          />

                          <div className="absolute top-2 left-2">
                            <button
                              onClick={() => toggleComparison(course.id)}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors comparison-checkbox ${comparisonList.includes(course.id)
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "bg-white border-gray-300 hover:border-blue-400"
                                }`}
                            >
                              {comparisonList.includes(course.id) && <Check className="w-3 h-3" />}
                            </button>
                          </div>

                          <div className="absolute bottom-2 left-2 bg-white p-1.5 rounded-md shadow-md border border-gray-100">
                            <Image
                              src={
                                course.universityLogo ||
                                `/placeholder.svg?height=40&width=80&text=${encodeURIComponent(course.universityName || "University")}&query=${encodeURIComponent(course.universityName || "University")} logo`
                              }
                              alt={`${course.universityName || "University"} logo`}
                              width={32}
                              height={32}
                              className="object-contain"
                            />
                          </div>
                        </div>

                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <Link
                                href={
                                  vertical === "study-india" || course.country === "India"
                                    ? `/college/${course.universityId}/${createSlug(course.courseName)}`
                                    : `/universities/${course.universityId}/courses/${course.collegeCourseId}`
                                }
                              >
                                <h2 className="text-base font-bold text-gray-900 hover:text-blue-700 hover:underline cursor-pointer mb-1 leading-tight">
                                  {course.courseName || "Unknown Course"}
                                </h2>
                              </Link>

                              <Link
                                href={
                                  vertical === "study-india" || course.country === "India"
                                    ? `/universities/${course.universityId}`
                                    : `/universities/${course.universityId}`
                                }
                              >
                                <h3 className="text-sm text-gray-600 hover:text-blue-600 hover:underline cursor-pointer mb-2">
                                  {course.universityName || "Unknown University"}
                                </h3>
                              </Link>

                              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-blue-500" />
                                  <span>
                                    {course.city || "Unknown City"}, {course.country || "Unknown Country"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-blue-500" />
                                  <span>{course.duration || "2 years"}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-green-500" />
                                  <span className="text-green-600 font-medium">
                                    {course.courseAge || "Recently Updated"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleAddToWishlist(course)}
                                disabled={!!wishlistLoading[course.id]}
                                className={`transition-colors p-1 flex items-center gap-1 favorite-button ${favorites.includes(course.id) ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
                              >
                                <Heart
                                  className={`w-4 h-4 ${favorites.includes(course.id) ? "fill-red-500 text-red-500" : ""}`}
                                />
                                <span className="text-xs text-gray-500 hidden sm:inline">{favorites.includes(course.id) ? "Added" : (wishlistLoading[course.id] ? "Adding..." : "Add to list")}</span>
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-x-8 gap-y-1 mb-3">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-3 h-3 text-green-600" />
                              <span className="text-xs text-gray-500">Fees:</span>
                              <span className="font-medium text-xs text-gray-900">{formatFee(course.fee)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3 text-blue-600" />
                              <span className="text-xs text-gray-500">Intake:</span>
                              <span className="font-medium text-xs text-gray-900">{formatIntake(course.intake)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="w-3 h-3 text-orange-600" />
                              <span className="text-xs text-gray-500">NIRF Rank:</span>
                              <span className="font-medium text-xs text-gray-900">
                                {course.universityRanking < 999 ? course.universityRanking : "N/A"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-3 h-3 text-purple-600" />
                              <span className="text-xs text-gray-500">Accreditations:</span>
                              <div className="flex gap-1">
                                {(course.accreditations || ["Accredited"]).slice(0, 3).map((acc, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-block px-1 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded text-[10px]"
                                  >
                                    {acc}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs font-medium h-7 rounded"
                              onClick={() => handleApplyNow(course)}
                            >
                              Apply Now
                            </Button>
                            <Button
                              variant="outline"
                              className="flex items-center gap-1 px-2 py-1 text-xs border-gray-300 hover:bg-gray-50 bg-transparent h-7 rounded"
                              onClick={() => console.log("AI Agent clicked")}
                            >
                              <User className="w-3 h-3" />
                              AI Agent
                            </Button>
                            <Button
                              variant="outline"
                              className="flex items-center gap-1 px-2 py-1 text-xs border-gray-300 hover:bg-gray-50 bg-transparent h-7 rounded"
                              onClick={() => console.log("Counselor clicked")}
                            >
                              <User className="w-3 h-3" />
                              Counselor
                            </Button>
                            <Button
                              variant="outline"
                              className="px-2 py-1 text-xs border-gray-300 hover:bg-gray-50 bg-transparent h-7 rounded"
                              onClick={() => console.log("Brochure clicked")}
                            >
                              <BookOpen className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 p-4 bg-white rounded-lg border border-gray-200 pagination-container">
                    <div className="text-sm text-gray-600">
                      Page {apiPagination ? apiPagination.currentPage : currentPage} of {totalPages} ({apiPagination ? apiPagination.totalItems : sortedCourses.length} total courses)
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange((apiPagination ? apiPagination.currentPage : currentPage) - 1)}
                        disabled={(apiPagination ? apiPagination.currentPage : currentPage) === 1}
                        size="sm"
                      >
                        Previous
                      </Button>

                      <div className="flex items-center gap-2">
                        {(() => {
                          const displayCurrent = apiPagination ? apiPagination.currentPage : currentPage
                          const displayTotal = totalPages
                          const pages: Array<number | string> = []

                          if (displayTotal <= 7) {
                            for (let p = 1; p <= displayTotal; p++) pages.push(p)
                          } else {
                            pages.push(1)
                            pages.push(2)

                            if (displayCurrent > 4) pages.push("...")

                            const start = Math.max(3, displayCurrent - 1)
                            const end = Math.min(displayTotal - 2, displayCurrent + 1)
                            for (let p = start; p <= end; p++) {
                              if (p > 2 && p < displayTotal - 1) pages.push(p)
                            }

                            if (displayCurrent < displayTotal - 3) pages.push("...")

                            pages.push(displayTotal)
                          }

                          return pages.map((pageNum, idx) => {
                            if (pageNum === "...") {
                              return (
                                <span key={`el-${idx}`} className="px-2 text-sm text-gray-500">
                                  …
                                </span>
                              )
                            }

                            const num = Number(pageNum)
                            return (
                              <Button
                                key={num}
                                variant={(apiPagination ? apiPagination.currentPage : currentPage) === num ? "default" : "outline"}
                                onClick={() => handlePageChange(num)}
                                size="sm"
                                className="w-8 h-8 p-0"
                              >
                                {num}
                              </Button>
                            )
                          })
                        })()}
                      </div>

                      <Button
                        variant="outline"
                        onClick={() => handlePageChange((apiPagination ? apiPagination.currentPage : currentPage) + 1)}
                        disabled={(apiPagination ? apiPagination.currentPage : currentPage) === totalPages}
                        size="sm"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full">
                <Card>
                  <CardContent className="p-8 text-center">
                    <h3 className="text-lg font-semibold">No Courses Found</h3>
                    <p className="text-gray-500 mt-2">We couldn't find any courses matching your search.</p>

                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        onClick={() => {
                          // Clear filters and search box
                          setFilters(initialFilters)
                          setSearchInput("")
                          setSearchQuery("")
                          setCurrentPage(1)
                        }}
                      >
                        Clear Filters
                      </button>

                      <button
                        className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded"
                        onClick={() => handleAdvancedFiltersClick()}
                      >
                        Refine Filters
                      </button>

                      {!isLoggedIn && (
                        <button
                          className="text-blue-600 underline px-4 py-2 bg-transparent"
                          onClick={() => setShowLoginModal(true)}
                        >
                          Login to see personalized results
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
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

      <ProfileCompletionModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onComplete={handleProfileComplete}
        onSkip={handleProfileSkip}
        userData={userData}
      />

      <IntakeSelectionModal
        isOpen={showIntakeModal}
        onClose={handleIntakeModalClose}
        onConfirm={handleIntakeConfirm}
        availableIntakes={pendingApplication?.intake || []}
        courseName={pendingApplication?.courseName}
        universityName={pendingApplication?.universityName}
        isLoading={isSubmittingApplication}
        showSuccess={showIntakeSuccess}
        registrationId={successRegistrationId}
        intakeSession={successIntakeSession}
      />
    </div>
  )
}

export default function SearchResultsPage() {
  console.log("[v0] SearchResults: Page component rendering")
  return <SearchResultsContent />
}
