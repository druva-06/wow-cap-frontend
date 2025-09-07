"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Award, HeadphonesIcon, GraduationCap, Star } from "lucide-react"
import Image from "next/image"

interface AdBannerProps {
  type: "loan" | "scholarship" | "service" | "counseling"
}

export function AdBanner({ type }: AdBannerProps) {
  const getAdContent = () => {
    switch (type) {
      case "loan":
        return {
          title: "Education Loan",
          subtitle: "Up to ₹1 Cr",
          description: "Quick approval, Low interest rates",
          icon: <CreditCard className="w-6 h-6 text-green-600" />,
          bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
          borderColor: "border-green-200",
          buttonColor: "bg-green-600 hover:bg-green-700",
          image: "/education-loan-ad.jpg",
          badge: "Instant Approval",
          badgeColor: "bg-green-100 text-green-800",
        }
      case "scholarship":
        return {
          title: "Scholarships",
          subtitle: "Up to 100%",
          description: "Merit & need-based funding",
          icon: <Award className="w-6 h-6 text-amber-600" />,
          bgColor: "bg-gradient-to-br from-amber-50 to-yellow-100",
          borderColor: "border-amber-200",
          buttonColor: "bg-amber-600 hover:bg-amber-700",
          image: "/scholarship-ad.jpg",
          badge: "Free Apply",
          badgeColor: "bg-amber-100 text-amber-800",
        }
      case "service":
        return {
          title: "Premium Service",
          subtitle: "Expert Guidance",
          description: "End-to-end admission support",
          icon: <HeadphonesIcon className="w-6 h-6 text-blue-600" />,
          bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100",
          borderColor: "border-blue-200",
          buttonColor: "bg-blue-600 hover:bg-blue-700",
          image: "/counseling-ad.jpg",
          badge: "24/7 Support",
          badgeColor: "bg-blue-100 text-blue-800",
        }
      case "counseling":
        return {
          title: "Free Counseling",
          subtitle: "Expert Advice",
          description: "Personalized guidance",
          icon: <GraduationCap className="w-6 h-6 text-purple-600" />,
          bgColor: "bg-gradient-to-br from-purple-50 to-violet-100",
          borderColor: "border-purple-200",
          buttonColor: "bg-purple-600 hover:bg-purple-700",
          image: "/counseling-ad.jpg",
          badge: "Free Session",
          badgeColor: "bg-purple-100 text-purple-800",
        }
      default:
        return {
          title: "Special Offer",
          subtitle: "Limited Time",
          description: "Don't miss out",
          icon: <Star className="w-6 h-6 text-gray-600" />,
          bgColor: "bg-gradient-to-br from-gray-50 to-slate-100",
          borderColor: "border-gray-200",
          buttonColor: "bg-gray-600 hover:bg-gray-700",
          image: "/placeholder.svg?height=200&width=200&text=Ad",
          badge: "Special",
          badgeColor: "bg-gray-100 text-gray-800",
        }
    }
  }

  const content = getAdContent()

  return (
    <Card
      className={`${content.bgColor} ${content.borderColor} border-2 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer`}
    >
      <CardContent className="p-0">
        <div className="relative">
          {/* Background Image */}
          <div className="relative h-32 overflow-hidden">
            <Image
              src={content.image || "/placeholder.svg"}
              alt={content.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="200px"
            />
            <div className="absolute inset-0 bg-black/20" />

            {/* Badge */}
            <div className="absolute top-2 right-2">
              <Badge className={`${content.badgeColor} text-xs font-semibold px-2 py-1 shadow-sm`}>
                {content.badge}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              {content.icon}
              <div>
                <h3 className="font-bold text-sm text-gray-900 leading-tight">{content.title}</h3>
                <p className="text-xs font-semibold text-gray-700">{content.subtitle}</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">{content.description}</p>

            <Button
              size="sm"
              className={`w-full ${content.buttonColor} text-white text-xs font-medium py-2 shadow-md hover:shadow-lg transition-all duration-300`}
            >
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
