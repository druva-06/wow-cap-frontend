"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, DollarSign, Clock, Award, Heart, GraduationCap, User, FileText } from "lucide-react"

interface ResultCardProps {
  result: {
    id: string
    universityId?: string
    name: string
    course: string
    location: string
    city: string
    country: string
    fee: number
    intake: string
    duration: string
    level: string
    logo: string
    campusImage: string
    ranking: number
    rating: number
    reviewCount: number
    about: string
    accreditations: string[]
    applicationDeadline: string
    hostelAvailable: boolean
    scholarshipAvailable: boolean
  }
  viewMode?: "grid" | "list"
  vertical?: string
}

export function EnhancedResultCard({ result, viewMode = "grid", vertical = "study-abroad" }: ResultCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  const formatFee = (fee: number) => {
    if (fee === 0) return "Contact for fees"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(fee)
  }

  const getCourseUrl = () => {
    if (vertical === "study-india") {
      // For India colleges, use college-specific URL
      const collegeId = result.id.split("-")[0] || result.name.toLowerCase().replace(/\s+/g, "-")
      const courseSlug = result.course
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
      return `/college/${collegeId}/${courseSlug}`
    } else if (result.universityId) {
      // For abroad universities with universityId, use university-specific URL
      const courseId = result.course
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
      return `/universities/${result.universityId}/courses/${courseId}`
    } else {
      // Fallback to generic course URL with unique identifier
      const courseSlug =
        `${result.course.toLowerCase().replace(/\s+/g, "-")}-${result.name.toLowerCase().replace(/\s+/g, "-")}`.replace(
          /[^a-z0-9-]/g,
          "",
        )
      return `/courses/${courseSlug}`
    }
  }

  const getApplyUrl = () => {
    if (result.universityId) {
      const courseId = result.course
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
      return `/apply/${result.universityId}/${courseId}`
    }
    return getCourseUrl()
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 border border-gray-200 bg-white mb-4">
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          {/* Left side - Image and checkbox */}
          <div className="flex items-start gap-3">
            <input type="checkbox" className="mt-2" />
            <div className="relative w-28 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
              <Image
                src={result.campusImage || "/placeholder.svg"}
                alt={`${result.name} campus`}
                fill
                className="object-cover"
              />
              {/* University logo overlay */}
              <div className="absolute bottom-1 left-1 w-6 h-6 bg-white rounded-full p-1">
                <Image
                  src={result.logo || "/placeholder.svg"}
                  alt={`${result.name} logo`}
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <Link href={getCourseUrl()} className="hover:text-blue-600 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight hover:underline cursor-pointer">
                    {result.course}
                  </h3>
                </Link>
                {/* University name - smaller gray text */}
                <p className="text-gray-600 text-sm mb-3">{result.name}</p>
              </div>

              {/* Add to list button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavorite}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                <span className="ml-1 text-sm">Add to list</span>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>
                  {result.city}, {result.country}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>{result.duration}</span>
              </div>
              <div className="flex items-center gap-1 text-green-600 font-medium">
                <span>Updated 2024</span>
              </div>
            </div>

            <div className="space-y-1 text-sm mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-gray-600">Fees:</span>
                <span className="font-medium">{formatFee(result.fee)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">Intake:</span>
                <span className="font-medium">{result.intake}</span>
              </div>
              {result.ranking && (
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-600">NIRF Rank:</span>
                  <span className="font-medium">{result.ranking}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-500" />
                <span className="text-gray-600">Accreditations:</span>
                <span className="font-medium">{result.accreditations.join("  ")}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <Link href={getApplyUrl()}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm">Apply Now</Button>
              </Link>
              <Button variant="outline" className="px-4 py-2 text-sm bg-transparent">
                <User className="w-4 h-4 mr-1" />
                AI Agent
              </Button>
              <Button variant="outline" className="px-4 py-2 text-sm bg-transparent">
                <User className="w-4 h-4 mr-1" />
                Counselor
              </Button>
              <Button variant="outline" size="sm" className="p-2 bg-transparent">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EnhancedResultCard
