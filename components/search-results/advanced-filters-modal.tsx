"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sparkles,
  Brain,
  TrendingUp,
  Target,
  Users,
  Calendar,
  DollarSign,
  Award,
  BookOpen,
  Star,
  Crown,
  Zap,
} from "lucide-react"

interface AdvancedFilterState {
  smartMatching: boolean
  successPrediction: boolean
  scholarshipIntelligence: boolean
  timelineOptimization: boolean
  admissionTrends: boolean
  competitionAnalysis: boolean
  seasonalInsights: boolean
  discountRequests: boolean
  placementRates: boolean
  researchOpportunities: boolean
  safetyMatchReach: boolean
  alternativeSuggestions: boolean
  hiddenGems: boolean
  costOptimization: boolean
}

interface AdvancedFiltersModalProps {
  isOpen: boolean
  onClose: () => void
  onFiltersChange: (filters: AdvancedFilterState) => void
}

export function AdvancedFiltersModal({ isOpen, onClose, onFiltersChange }: AdvancedFiltersModalProps) {
  const [filters, setFilters] = useState<AdvancedFilterState>({
    smartMatching: false,
    successPrediction: false,
    scholarshipIntelligence: false,
    timelineOptimization: false,
    admissionTrends: false,
    competitionAnalysis: false,
    seasonalInsights: false,
    discountRequests: false,
    placementRates: false,
    researchOpportunities: false,
    safetyMatchReach: false,
    alternativeSuggestions: false,
    hiddenGems: false,
    costOptimization: false,
  })

  const [userTier] = useState<"free" | "premium">("free") // Mock user tier

  const toggleFilter = (key: keyof AdvancedFilterState) => {
    if (userTier === "free") {
      // Show upgrade message for free users
      alert("This feature is available for Premium users. Upgrade to access AI-powered insights!")
      return
    }

    const newFilters = { ...filters, [key]: !filters[key] }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key as keyof AdvancedFilterState] = false
      return acc
    }, {} as AdvancedFilterState)

    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(Boolean).length
  }

  const PremiumFeature = ({ children, disabled = false }: { children: React.ReactNode; disabled?: boolean }) => (
    <div className={`relative ${disabled ? "opacity-60" : ""}`}>
      {children}
      {userTier === "free" && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <Crown className="w-4 h-4 text-amber-600 mr-1" />
          <span className="text-xs font-medium text-amber-700">Premium</span>
        </div>
      )}
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-6 h-6 text-purple-600" />
            AI-Powered Advanced Filters
            <Badge className="bg-purple-100 text-purple-700 ml-2">Premium Feature</Badge>
          </DialogTitle>
        </DialogHeader>

        {/* Premium Upgrade Banner for Free Users */}
        {userTier === "free" && (
          <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 mb-6">
            <CardContent className="p-6 text-center">
              <Crown className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Unlock AI-Powered Insights</h3>
              <p className="text-sm text-amber-700 mb-4">
                Get personalized recommendations, market intelligence, and success predictions
              </p>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2">
                Upgrade to Premium - ₹999/month
              </Button>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="ai-intelligence" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ai-intelligence" className="text-xs">
              AI Intelligence
            </TabsTrigger>
            <TabsTrigger value="market-intel" className="text-xs">
              Market Intel
            </TabsTrigger>
            <TabsTrigger value="university-data" className="text-xs">
              University Data
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="text-xs">
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-intelligence" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="w-5 h-5 text-purple-600" />
                  AI-Powered Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <PremiumFeature>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <Checkbox
                      id="smart-matching"
                      checked={filters.smartMatching}
                      onCheckedChange={() => toggleFilter("smartMatching")}
                    />
                    <div className="flex-1">
                      <label htmlFor="smart-matching" className="font-medium cursor-pointer">
                        Smart Matching
                      </label>
                      <p className="text-sm text-gray-600">Universities where students like you got admitted</p>
                    </div>
                    <Target className="w-5 h-5 text-purple-500" />
                  </div>
                </PremiumFeature>

                <PremiumFeature>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <Checkbox
                      id="success-prediction"
                      checked={filters.successPrediction}
                      onCheckedChange={() => toggleFilter("successPrediction")}
                    />
                    <div className="flex-1">
                      <label htmlFor="success-prediction" className="font-medium cursor-pointer">
                        Success Prediction
                      </label>
                      <p className="text-sm text-gray-600">Your admission probability based on similar profiles</p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                </PremiumFeature>

                <PremiumFeature>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <Checkbox
                      id="scholarship-intelligence"
                      checked={filters.scholarshipIntelligence}
                      onCheckedChange={() => toggleFilter("scholarshipIntelligence")}
                    />
                    <div className="flex-1">
                      <label htmlFor="scholarship-intelligence" className="font-medium cursor-pointer">
                        Scholarship Intelligence
                      </label>
                      <p className="text-sm text-gray-600">Scholarships you're likely to get based on your profile</p>
                    </div>
                    <Award className="w-5 h-5 text-amber-500" />
                  </div>
                </PremiumFeature>

                <PremiumFeature>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <Checkbox
                      id="timeline-optimization"
                      checked={filters.timelineOptimization}
                      onCheckedChange={() => toggleFilter("timelineOptimization")}
                    />
                    <div className="flex-1">
                      <label htmlFor="timeline-optimization" className="font-medium cursor-pointer">
                        Timeline Optimization
                      </label>
                      <p className="text-sm text-gray-600">Best application timeline for your profile</p>
                    </div>
                    <Calendar className="w-5 h-5 text-blue-500" />
                  </div>
                </PremiumFeature>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market-intel" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Market Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <PremiumFeature>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <Checkbox
                      id="admission-trends"
                      checked={filters.admissionTrends}
                      onCheckedChange={() => toggleFilter("admissionTrends")}
                    />
                    <div className="flex-1">
                      <label htmlFor="admission-trends" className="font-medium cursor-pointer">
                        Admission Trends
                      </label>
                      <p className="text-sm text-gray-600">Acceptance rates trending up/down</p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                </PremiumFeature>

                <PremiumFeature>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <Checkbox
                      id="competition-analysis"
                      checked={filters.competitionAnalysis}
                      onCheckedChange={() => toggleFilter("competitionAnalysis")}
                    />
                    <div className="flex-1">
                      <label htmlFor="competition-analysis" className="font-medium cursor-pointer">
                        Competition Analysis
                      </label>
                      <p className="text-sm text-gray-600">How many students with similar profiles applied</p>
                    </div>
                    <Users className="w-5 h-5 text-orange-500" />
                  </div>
                </PremiumFeature>

                <PremiumFeature>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <Checkbox
                      id="seasonal-insights"
                      checked={filters.seasonalInsights}
                      onCheckedChange={() => toggleFilter("seasonalInsights")}
                    />
                    <div className="flex-1">
                      <label htmlFor="seasonal-insights" className="font-medium cursor-pointer">
                        Seasonal Insights
                      </label>
                      <p className="text-sm text-gray-600">Best time to apply based on historical data</p>
                    </div>
                    <Calendar className="w-5 h-5 text-blue-500" />
                  </div>
                </PremiumFeature>

                <PremiumFeature>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <Checkbox
                      id="discount-requests"
                      checked={filters.discountRequests}
                      onCheckedChange={() => toggleFilter("discountRequests")}
                    />
                    <div className="flex-1">
                      <label htmlFor="discount-requests" className="font-medium cursor-pointer">
                        Request for Discount
                      </label>
                      <p className="text-sm text-gray-600">Universities offering fee waivers and discounts</p>
                    </div>
                    <DollarSign className="w-5 h-5 text-green-500" />
                  </div>
                </PremiumFeature>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="university-data" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5 text-orange-600" />
                  Hidden University Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <PremiumFeature>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <Checkbox
                      id="placement-rates"
                      checked={filters.placementRates}
                      onCheckedChange={() => toggleFilter("placementRates")}
                    />
                    <div className="flex-1">
                      <label htmlFor="placement-rates" className="font-medium cursor-pointer">
                        Industry Placement Rates
                      </label>
                      <p className="text-sm text-gray-600">Placement rates for your background</p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                </PremiumFeature>

                <PremiumFeature>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <Checkbox
                      id="research-opportunities"
                      checked={filters.researchOpportunities}
                      onCheckedChange={() => toggleFilter("researchOpportunities")}
                    />
                    <div className="flex-1">
                      <label htmlFor="research-opportunities" className="font-medium cursor-pointer">
                        Research Opportunities
                      </label>
                      <p className="text-sm text-gray-600">Research opportunities matching your interests</p>
                    </div>
                    <BookOpen className="w-5 h-5 text-blue-500" />
                  </div>
                </PremiumFeature>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="w-5 h-5 text-green-600" />
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <PremiumFeature>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <Checkbox
                      id="safety-match-reach"
                      checked={filters.safetyMatchReach}
                      onCheckedChange={() => toggleFilter("safetyMatchReach")}
                    />
                    <div className="flex-1">
                      <label htmlFor="safety-match-reach" className="font-medium cursor-pointer">
                        Safety/Match/Reach Schools
                      </label>
                      <p className="text-sm text-gray-600">University categorization based on your profile</p>
                    </div>
                    <Target className="w-5 h-5 text-purple-500" />
                  </div>
                </PremiumFeature>

                <PremiumFeature>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <Checkbox
                      id="alternative-suggestions"
                      checked={filters.alternativeSuggestions}
                      onCheckedChange={() => toggleFilter("alternativeSuggestions")}
                    />
                    <div className="flex-1">
                      <label htmlFor="alternative-suggestions" className="font-medium cursor-pointer">
                        Alternative Suggestions
                      </label>
                      <p className="text-sm text-gray-600">Similar programs you might like</p>
                    </div>
                    <Sparkles className="w-5 h-5 text-blue-500" />
                  </div>
                </PremiumFeature>

                <PremiumFeature>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <Checkbox
                      id="hidden-gems"
                      checked={filters.hiddenGems}
                      onCheckedChange={() => toggleFilter("hiddenGems")}
                    />
                    <div className="flex-1">
                      <label htmlFor="hidden-gems" className="font-medium cursor-pointer">
                        Hidden Gems
                      </label>
                      <p className="text-sm text-gray-600">Underrated universities with great outcomes</p>
                    </div>
                    <Star className="w-5 h-5 text-purple-500" />
                  </div>
                </PremiumFeature>

                <PremiumFeature>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <Checkbox
                      id="cost-optimization"
                      checked={filters.costOptimization}
                      onCheckedChange={() => toggleFilter("costOptimization")}
                    />
                    <div className="flex-1">
                      <label htmlFor="cost-optimization" className="font-medium cursor-pointer">
                        Cost Optimization
                      </label>
                      <p className="text-sm text-gray-600">Cheaper alternatives with similar outcomes</p>
                    </div>
                    <DollarSign className="w-5 h-5 text-green-500" />
                  </div>
                </PremiumFeature>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center gap-4">
            {getActiveFilterCount() > 0 && (
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-700">{getActiveFilterCount()} filters active</Badge>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700">
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
