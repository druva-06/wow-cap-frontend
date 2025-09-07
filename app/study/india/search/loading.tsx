import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function StudyIndiaSearchLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
      {/* Top Banner Skeleton */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-violet-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center">
            <Skeleton className="h-12 w-96 mx-auto mb-4 bg-white/20" />
            <Skeleton className="h-6 w-64 mx-auto bg-white/20" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Header Skeleton */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
              <Skeleton className="flex-1 h-12 rounded-xl" />
              <Skeleton className="h-12 w-32 rounded-xl" />
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-20" />
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Horizontal Filters Skeleton */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Results Section Skeleton */}
          <div className="flex-1">
            <Skeleton className="h-6 w-64 mb-6" />

            <div className="space-y-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="flex">
                      <Skeleton className="w-64 h-48 flex-shrink-0" />
                      <div className="flex-1 p-6">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-4" />

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                        </div>

                        <div className="mb-4">
                          <Skeleton className="h-4 w-32 mb-2" />
                          <div className="flex space-x-2">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-16" />
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <Skeleton className="h-6 w-24" />
                          <div className="flex space-x-2">
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-8 w-24" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar Skeleton */}
          <div className="lg:w-80">
            <div className="sticky top-8 space-y-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-0">
                    <Skeleton className="h-48 w-full rounded-t-lg" />
                    <div className="p-4">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">Loading colleges in India...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
