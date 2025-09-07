"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Handshake, ArrowLeft } from "lucide-react"

export default function AgentLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      localStorage.setItem(
        "wowcap_agent",
        JSON.stringify({
          email: formData.email,
          name: formData.email.split("@")[0],
          role: "agent",
          agentId: "AGT2024001",
          agencyName: "Global Education Partners",
          totalReferrals: 150,
          loginTime: new Date().toISOString(),
        }),
      )

      setIsLoading(false)
      router.push("/agent/dashboard")
    }, 1000)
  }

  const demoLogin = () => {
    setFormData({
      email: "agent@wowcap.com",
      password: "agent123",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Handshake className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Agent Portal
            </h1>
            <p className="text-gray-600 mt-2">Partner & Sub-Agent Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Agent Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter agent email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
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
                  className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 pr-10"
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
              className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white py-3 font-semibold shadow-lg"
            >
              {isLoading ? "Signing In..." : "Access Agent Panel"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">Demo Login for Testing:</p>
              <Button
                type="button"
                variant="outline"
                onClick={demoLogin}
                className="w-full border-yellow-300 text-yellow-600 hover:bg-yellow-50 bg-transparent"
              >
                Use Demo Agent Credentials
              </Button>
              <p className="text-xs text-gray-400 mt-2">Email: agent@wowcap.com | Password: agent123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
