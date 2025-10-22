"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Phone, MessageSquare } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { ProfileCompletionModal } from "@/components/modals/profile-completion-modal"
import type { UnifiedUserProfile } from "@/types/user"
import { login as loginApi } from "@/lib/api/client"
import { setToken, setRefreshToken } from "@/lib/auth"
import type { LoginRequest } from "@/lib/api/types"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [userData, setUserData] = useState<UnifiedUserProfile | null>(null)
  const [authMethod, setAuthMethod] = useState<"email" | "phone" | "google">("email")
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    rememberMe: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSendOTP = async () => {
    if (!formData.phone) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setOtpSent(true)
      setShowOTP(true)
      toast({
        title: "OTP Sent! 📱",
        description: `Verification code sent to ${formData.phone}`,
      })
    } catch (error) {
      toast({
        title: "Failed to Send OTP",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const googleUserData = {
        email: "user@gmail.com",
        name: "Google User",
        phone: "",
        loginTime: new Date().toISOString(),
        focusArea: "Study Abroad",
        dateOfBirth: "",
        nationality: "",
        currentLocation: "",
        lastEducation: "",
        lastEducationPercentage: "",
        lastEducationYear: "",
        lastEducationInstitution: "",
        hasTestScores: false,
        testScores: [],
        profileCompleted: false,
        profileCompletion: 25,
        profileStage: "basic" as const,
        studentId: `WC${Date.now()}`,
        signupTime: new Date().toISOString(),
      }

      setUserData(googleUserData as UnifiedUserProfile)
      toast({
        title: "Google Login Successful! 🎉",
        description: "Welcome! Let's complete your profile.",
      })
      setShowProfileModal(true)
    } catch (error) {
      toast({
        title: "Google Login Failed",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOTPVerification = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const phoneUserData = {
        email: "",
        phone: formData.phone,
        name: "Phone User",
        loginTime: new Date().toISOString(),
        focusArea: "Study Abroad",
        dateOfBirth: "",
        nationality: "",
        currentLocation: "",
        lastEducation: "",
        lastEducationPercentage: "",
        lastEducationYear: "",
        lastEducationInstitution: "",
        hasTestScores: false,
        testScores: [],
        profileCompleted: false,
        profileCompletion: 25,
        profileStage: "basic" as const,
        studentId: `WC${Date.now()}`,
        signupTime: new Date().toISOString(),
      }

      setUserData(phoneUserData as UnifiedUserProfile)
      toast({
        title: "Phone Verification Successful! 🎉",
        description: "Welcome! Let's complete your profile.",
      })
      setShowProfileModal(true)
    } catch (error) {
      toast({
        title: "OTP Verification Failed",
        description: "Please check your OTP and try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (authMethod === "phone" && !showOTP) {
      handleSendOTP()
      return
    }

    if (authMethod === "phone" && showOTP) {
      handleOTPVerification()
      return
    }

    // Email/password login via API
    if (authMethod === "email") {
      setLoading(true)
      try {
        if (!formData.email || !formData.password) {
          toast({ title: "Validation Error", description: "Please fill in all required fields", variant: "destructive" })
          return
        }

        const payload: LoginRequest = { email: formData.email, password: formData.password }
        const res = await loginApi(payload)

        if (res?.success && res?.response?.access_token) {
          // Enforce role-based access: this is the Student portal, only allow users with role 'student'
          const backendRole = res.response.user?.role || ""
          if (backendRole && backendRole.toLowerCase() !== "student") {
            toast({ title: "Unauthorized", description: "Your account is not allowed to login to the Student portal.", variant: "destructive" })
            return
          }
          // store tokens according to rememberMe
          const remember = formData.rememberMe
          // use helper that writes to localStorage or sessionStorage
          try {
            // save tokens to chosen storage
            const { saveToken, saveRefreshToken } = await import("@/lib/auth")
            saveToken(res.response.access_token, remember)
            if (res.response.refresh_token) saveRefreshToken(res.response.refresh_token, remember)
          } catch (e) {
            // fallback to localStorage
            setToken(res.response.access_token)
            if (res.response.refresh_token) setRefreshToken(res.response.refresh_token)
          }

          // save minimal user info
          const user = res.response.user
          const mapped: UnifiedUserProfile = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            phone: user.phone_number || "",
            dateOfBirth: "",
            nationality: "",
            currentLocation: "",
            lastEducation: "",
            lastEducationPercentage: "",
            lastEducationYear: "",
            lastEducationInstitution: "",
            hasTestScores: false,
            testScores: [],
            profileCompleted: false,
            profileCompletion: 25,
            profileStage: "basic",
            studentId: `WC${user.user_id}`,
            loginTime: new Date().toISOString(),
            signupTime: new Date().toISOString(),
            profile_picture: user.profile_picture || "",
          }

          setUserData(mapped)
          try {
            if (formData.rememberMe) {
              localStorage.setItem("wowcap_user", JSON.stringify(mapped))
            } else {
              sessionStorage.setItem("wowcap_user", JSON.stringify(mapped))
            }
          } catch (e) {
            localStorage.setItem("wowcap_user", JSON.stringify(mapped))
          }
          // Notify other components in the same window to refresh auth state
          try {
            window.dispatchEvent(new Event("authStateChanged"))
          } catch (e) {
            // ignore during SSR or if window is not available
          }

          toast({ title: "Login Successful", description: res.message })
          router.push("/")
        } else {
          const msg = res?.message || res?.response?.message || "Invalid credentials"
          toast({ title: "Login Failed", description: msg, variant: "destructive" })
        }
      } catch (err: any) {
        toast({ title: "Login Error", description: err?.response?.data?.message || err.message || "Failed to login", variant: "destructive" })
      } finally {
        setLoading(false)
      }

      return
    }
  }

  const handleProfileComplete = (completeProfileData: UnifiedUserProfile) => {
    setShowProfileModal(false)
    // Redirect to home after profile completion
    router.push("/")
  }

  const handleProfileSkip = () => {
    setShowProfileModal(false)
    // Redirect to home even if profile is skipped
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      {/* Right Side - Login Form */}
      <div className="w-full max-w-md mx-auto p-8">
        {/* Mobile Header */}
        <div className="lg:hidden text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-gray-900">WOW MAMA</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Sign in to continue your educational journey</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Student Login</CardTitle>
            {/* <div className="flex justify-center gap-2 mt-4">
              <Button
                type="button"
                variant={authMethod === "email" ? "default" : "outline"}
                size="sm"
                onClick={() => setAuthMethod("email")}
                className="text-xs"
              >
                <Mail className="w-3 h-3 mr-1" />
                Email
              </Button>
              <Button
                type="button"
                variant={authMethod === "phone" ? "default" : "outline"}
                size="sm"
                onClick={() => setAuthMethod("phone")}
                className="text-xs"
              >
                <Phone className="w-3 h-3 mr-1" />
                Phone
              </Button>
              <Button
                type="button"
                variant={authMethod === "google" ? "default" : "outline"}
                size="sm"
                onClick={() => setAuthMethod("google")}
                className="text-xs"
              >
                <MessageSquare className="w-3 h-3 mr-1" />
                Google
              </Button>
            </div> */}
          </CardHeader>
          <CardContent>
            {authMethod === "google" ? (
              <div className="space-y-4">
                <Button
                  onClick={handleGoogleLogin}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Signing in with Google...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>Continue with Google</span>
                    </div>
                  )}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {authMethod === "email" ? (
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                  </div>
                )}

                {showOTP && authMethod === "phone" ? (
                  <div>
                    <Label htmlFor="otp">Enter OTP</Label>
                    <div className="relative mt-1">
                      <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="otp"
                        name="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="pl-10"
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">OTP sent to {formData.phone}</p>
                  </div>
                ) : (
                  authMethod === "email" && (
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleInputChange}
                          className="pl-10 pr-10"
                          placeholder="Enter your password"
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
                  )
                )}

                {authMethod === "email" && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))
                        }
                      />
                      <Label htmlFor="rememberMe" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                      Forgot password?
                    </Link>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>
                        {authMethod === "phone" && !showOTP
                          ? "Sending OTP..."
                          : authMethod === "phone" && showOTP
                            ? "Verifying..."
                            : "Signing in..."}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>
                        {authMethod === "phone" && !showOTP
                          ? "Send OTP"
                          : authMethod === "phone" && showOTP
                            ? "Verify OTP"
                            : "Sign In"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="lg:hidden mt-6 text-center">
              <Link href="/portals" className="text-gray-600 hover:text-gray-700">
                Other Portals
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion Modal */}
      <ProfileCompletionModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onComplete={handleProfileComplete}
        onSkip={handleProfileSkip}
        userData={userData}
      />
    </div>
  )
}
