"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, UserCheck, Users, BookOpen, Award, TrendingUp, Clock } from "lucide-react"

export default function CounselorLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Demo login - accept any credentials
      const counselorData = {
        id: "counselor_001",
        name: "Dr. Sarah Johnson",
        email: email || "sarah.johnson@wowcap.com",
        role: "Senior Counselor",
        specialization: "Study Abroad",
        experience: "8 years",
        students_helped: 450,
        success_rate: 92,
      }

      localStorage.setItem("wowcap_counselor", JSON.stringify(counselorData))
      setIsLoading(false)
      router.push("/counselor/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-3xl">🎓</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                WowCap
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-green-600" />
              <span className="text-lg font-semibold text-green-600">Counselor Portal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Left Side - 3D Graphics Slot */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-teal-600 relative overflow-hidden">
          {/* 3D Graphics Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-sm flex items-center justify-center">
              {/* Placeholder for 3D Graphics */}
              <div className="text-center text-white space-y-6">
                <div className="w-64 h-64 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                  <UserCheck className="w-32 h-32 text-white/80" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">Expert Counseling</h2>
                  <p className="text-xl text-green-100">Guiding Students to Success</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-2xl font-bold text-white">2,500+</div>
                    <div className="text-green-100 text-sm">Students Guided</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-2xl font-bold text-white">95%</div>
                    <div className="text-green-100 text-sm">Success Rate</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-green-100 text-sm">Universities</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-2xl font-bold text-white">15+</div>
                    <div className="text-green-100 text-sm">Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your counselor account</p>
            </div>

            {/* Login Form */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl text-center text-green-600">Counselor Login</CardTitle>
                <CardDescription className="text-center">
                  Access your counseling dashboard and student management tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="counselor@wowcap.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-base"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 text-base pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember"
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <Link href="/counselor/forgot-password" className="text-sm text-green-600 hover:text-green-500">
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-base bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                {/* Demo Notice */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-2">
                    <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-green-800">Demo Access</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Use any email and password to access the counselor dashboard. This is a demonstration
                        environment.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-white rounded-lg shadow-sm border">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Student Management</h3>
                <p className="text-sm text-gray-600">Track and guide students</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border">
                <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Course Planning</h3>
                <p className="text-sm text-gray-600">Create study roadmaps</p>
              </div>
            </div>

            {/* Footer Links */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Need help?{" "}
                <Link href="/support" className="text-green-600 hover:text-green-500">
                  Contact Support
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                Not a counselor?{" "}
                <Link href="/login" className="text-green-600 hover:text-green-500">
                  Student Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
