"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MapPin, GraduationCap, Clock, FileText, DollarSign, ChevronDown, Sparkles } from "lucide-react"

interface FilterState {
  countries: string[]
  levels: string[]
  duration: [number, number]
  exams: string[]
  feeRange: [number, number]
}

interface HorizontalFiltersProps {
  onFiltersChange?: (filters: FilterState) => void
  onFilterChange?: (filters: FilterState) => void
  vertical?: string
  onAdvancedFiltersClick?: () => void
}

export function HorizontalFilters({
  onFiltersChange,
  onFilterChange,
  vertical = "study-abroad",
  onAdvancedFiltersClick,
}: HorizontalFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    countries: [],
    levels: [],
    duration: [0, 10],
    exams: [],
    feeRange: [0, 5000000],
  })

  useEffect(() => {
    const callback = onFiltersChange || onFilterChange
    if (callback) {
      callback(filters)
    }
  }, [filters, onFiltersChange, onFilterChange])

  const getFilterOptions = () => {
    switch (vertical) {
      case "study-abroad":
        return {
          countries: ["USA", "UK", "Canada", "Australia", "Germany", "France", "Netherlands", "Singapore"],
          levels: ["Undergraduate", "Postgraduate", "Bachelor's", "Master's", "PhD", "Diploma", "Certificate"],
          exams: ["IELTS", "TOEFL", "GRE", "GMAT", "SAT", "No Exam Required"],
        }
      case "study-india":
        return {
          countries: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Pune", "Hyderabad", "Kolkata", "Ahmedabad"],
          levels: ["Undergraduate", "Postgraduate", "Bachelor's", "Master's", "PhD", "Diploma", "Certificate"],
          exams: ["JEE", "NEET", "CAT", "GATE", "No Exam Required"],
        }
      default:
        return {
          countries: ["USA", "UK", "Canada", "Australia"],
          levels: ["Undergraduate", "Postgraduate", "Bachelor's", "Master's", "PhD"],
          exams: ["IELTS", "TOEFL", "GRE"],
        }
    }
  }

  const options = getFilterOptions()

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const toggleArrayFilter = (key: "countries" | "levels" | "exams", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((item) => item !== value) : [...prev[key], value],
    }))
  }

  const getFilterLabel = (vertical: string) => {
    switch (vertical) {
      case "study-india":
        return "City"
      case "jobs":
      case "trainings":
        return "Location"
      default:
        return "Country"
    }
  }

  return (
    <div className="bg-white p-4 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-600">Filters:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-transparent text-sm">
                <MapPin className="w-4 h-4 mr-2" /> {getFilterLabel(vertical)} <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.countries.map((country) => (
                <DropdownMenuCheckboxItem
                  key={country}
                  checked={filters.countries.includes(country)}
                  onCheckedChange={() => toggleArrayFilter("countries", country)}
                >
                  {country}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-transparent text-sm">
                <GraduationCap className="w-4 h-4 mr-2" /> Level <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.levels.map((level) => (
                <DropdownMenuCheckboxItem
                  key={level}
                  checked={filters.levels.includes(level)}
                  onCheckedChange={() => toggleArrayFilter("levels", level)}
                >
                  {level}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-transparent text-sm">
                <Clock className="w-4 h-4 mr-2" /> Duration <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => updateFilter("duration", [1, 1])}>1 Year</DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateFilter("duration", [2, 2])}>2 Years</DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateFilter("duration", [3, 3])}>3 Years</DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateFilter("duration", [4, 4])}>4+ Years</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-transparent text-sm">
                <FileText className="w-4 h-4 mr-2" /> Exams <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.exams.map((exam) => (
                <DropdownMenuCheckboxItem
                  key={exam}
                  checked={filters.exams.includes(exam)}
                  onCheckedChange={() => toggleArrayFilter("exams", exam)}
                >
                  {exam}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-transparent text-sm">
                <DollarSign className="w-4 h-4 mr-2" /> Fees <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => updateFilter("feeRange", [0, 200000])}>{"< ₹2,00,000"}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateFilter("feeRange", [200000, 500000])}>
                ₹2,00,000 - ₹5,00,000
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateFilter("feeRange", [500000, 1000000])}>
                ₹5,00,000 - ₹10,00,000
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateFilter("feeRange", [1000000, 5000000])}>
                {"> ₹10,00,000"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <Label htmlFor="ai-filters" className="text-sm font-medium text-purple-700">
              AI Filters
            </Label>
            <Switch id="ai-filters" onClick={onAdvancedFiltersClick} />
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Premium
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
