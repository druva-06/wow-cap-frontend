"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, TrendingUp, Lock, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Demo login - any credentials work
    localStorage.setItem("adminAuth", "true")
    localStorage.setItem(
      "adminUser",
      JSON.stringify({
        name: "Admin User",
        email: formData.email,
        role: "Super Admin",
      }),
    )

    router.push("/admin/dashboard")
    setIsLoading(false)
  }

  const handleDemoLogin = (email: string, password: string, role: string) => {
    setFormData({ email, password })
    localStorage.setItem("adminAuth", "true")
    localStorage.setItem(
      "adminUser",
      JSON.stringify({
        name: role,
        email: email,
        role: role,
      }),
    )
    router.push("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="text-2xl">🎓</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                WowCap
              </div>
            </Link>
            <div className="flex items-center space-x-2 text-red-600">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">Admin Portal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - 3D Graphics Space */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-500 via-red-600 to-orange-600 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-32 right-16 w-24 h-24 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
            <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
            {/* 3D Graphics Placeholder */}
            <div className="mb-8 relative">
              <div className="w-48 h-48 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                <Shield className="w-24 h-24 text-white" />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <Lock className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <h2 className="text-4xl font-bold mb-4 text-center">Admin Control Center</h2>
            <p className="text-xl text-red-100 mb-8 text-center max-w-md">
              Manage your educational platform with powerful admin tools and real-time analytics
            </p>

            {/* Admin Features Grid */}
            <div className="grid grid-cols-2 gap-6 w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">5,000+</div>
                <div className="text-sm text-red-100">Users Managed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">Real-time</div>
                <div className="text-sm text-red-100">Analytics</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">25%</div>
                <div className="text-sm text-red-100">Monthly Growth</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Lock className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm text-red-100">Security Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Card className="shadow-2xl border-0">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-red-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Sign In</h1>
                  <p className="text-gray-600">Enter your credentials to access the admin dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="admin@wowcap.com"
                      required
                      className="h-12 text-base"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="h-12 text-base pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-base shadow-lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 mr-2" />
                        Sign In to Admin Portal
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 mb-4">Need help?</p>
                  <Button variant="link" className="text-red-600 hover:text-red-700 p-0">
                    Contact IT Support
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Demo Credentials */}
            <Card className="mt-6 border-red-200 bg-red-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-red-800 mb-4 text-center">Demo Credentials</h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => handleDemoLogin("admin@wowcap.com", "admin123", "Super Admin")}
                    variant="outline"
                    className="w-full justify-start text-left border-red-200 hover:bg-red-100"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-red-800">Super Admin</div>
                        <div className="text-sm text-red-600">admin@wowcap.com</div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => handleDemoLogin("manager@wowcap.com", "manager123", "Branch Manager")}
                    variant="outline"
                    className="w-full justify-start text-left border-red-200 hover:bg-red-100"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-red-800">Branch Manager</div>
                        <div className="text-sm text-red-600">manager@wowcap.com</div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => handleDemoLogin("hr@wowcap.com", "hr123", "HR Manager")}
                    variant="outline"
                    className="w-full justify-start text-left border-red-200 hover:bg-red-100"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-red-800">HR Manager</div>
                        <div className="text-sm text-red-600">hr@wowcap.com</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center mt-8 text-sm text-gray-500">
              <p>© 2024 WowCap Education. All rights reserved.</p>
              <p className="mt-1">Secure admin access portal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
