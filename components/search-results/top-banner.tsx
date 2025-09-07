"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface TopBannerProps {
  title?: string
  subtitle?: string
  backgroundImage?: string
}

export function TopBanner({
  title = "Find Your Perfect University",
  subtitle = "Discover world-class education opportunities",
  backgroundImage = "/university-banner.jpg",
}: TopBannerProps) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg rounded-2xl mb-6">
      <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-700">
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt="University Banner"
          fill
          className="object-cover opacity-30"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70" />

        <CardContent className="relative h-full flex items-center justify-center text-center p-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{title}</h1>
            <p className="text-xl text-blue-100 font-medium">{subtitle}</p>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
