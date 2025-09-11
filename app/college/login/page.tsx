"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Eye,
  EyeOff,
  GraduationCap,
  ArrowLeft,
  LayoutDashboard,
  Users,
  FileText,
  TrendingUp,
  Calendar,
  MessageSquare,
  Settings,
} from "lucide-react"

export default function CollegeLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/college/dashboard" },
    { icon: Users, label: "Applications", href: "/college/applications" },
    { icon: FileText, label: "Documents", href: "/college/documents" },
    { icon: TrendingUp, label: "Analytics", href: "/college/analytics" },
    { icon: Calendar, label: "Events", href: "/college/events" },
    { icon: MessageSquare, label: "Communications", href: "/college/communications" },
    { icon: Settings, label: "Settings", href: "/college/settings" },
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      localStorage.setItem(
        "wowcap_college",
        JSON.stringify({
          email: formData.email,
          name: formData.email.split("@")[0],
          role: "college",
          collegeId: "COL2024001",
          collegeName: "Stanford University",
          pendingApplications: 45,
          loginTime: new Date().toISOString(),
        }),
      )

      setIsLoading(false)
      router.push("/college/dashboard")
    }, 1000)
  }

  const demoLogin = () => {
    setFormData({
      email: "college@wowcap.com",
      password: "college123",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex">
      {/* Left Sidebar */}
      <div className="hidden lg:flex w-80 bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex-col">
        {/* Header */}
        <div className="p-8 border-b border-purple-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold">College Portal</h1>
              <p className="text-purple-200 text-sm">University Application Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-6">
          <h3 className="text-sm font-semibold text-purple-200 uppercase tracking-wider mb-4">College Panel</h3>
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-purple-100 hover:bg-purple-500/30 transition-colors cursor-pointer"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* Quick Stats */}
        <div className="p-6 border-t border-purple-500/30">
          <h3 className="text-sm font-semibold text-purple-200 uppercase tracking-wider mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="bg-purple-500/20 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Applications</span>
                <span className="font-bold">45</span>
              </div>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">This Month</span>
                <span className="font-bold">128 Applications</span>
              </div>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Acceptance Rate</span>
                <span className="font-bold">78%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-purple-500/30">
          <Link href="/" className="flex items-center space-x-3 text-purple-200 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              College Portal
            </h1>
            <p className="text-gray-600 mt-2">University Application Management</p>
          </div>

          <Card className="border-0 shadow-2xl">
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">College Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter college email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 font-semibold shadow-lg"
                >
                  {isLoading ? "Signing In..." : "Access College Panel"}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3">Demo Login for Testing:</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={demoLogin}
                    className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
                  >
                    Use Demo College Credentials
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
