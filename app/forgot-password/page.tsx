"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { sendForgotPasswordOtp, confirmForgotPassword } from "@/lib/api/client"

export default function ForgotPasswordPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSend = async () => {
        if (!email) return toast({ title: "Validation", description: "Email is required", variant: "destructive" })
        setLoading(true)
        try {
            const res = await sendForgotPasswordOtp(email)
            if (res && (res.success || res.statusCode === 200)) {
                toast({ title: "OTP Sent", description: res.message || "Check your email for the code" })
                setSent(true)
                router.push(`/forgot-password?email=${encodeURIComponent(email)}`)
            } else {
                toast({ title: "Send Failed", description: res?.message || "Failed to send OTP", variant: "destructive" })
            }
        } catch (err: any) {
            toast({ title: "Error", description: err?.message || "Failed to send", variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    const handleValidate = async () => {
        if (!otp) return toast({ title: "Validation", description: "OTP is required", variant: "destructive" })
        if (!password) return toast({ title: "Validation", description: "Password is required", variant: "destructive" })
        if (password !== confirmPassword) return toast({ title: "Validation", description: "Passwords do not match", variant: "destructive" })

        setLoading(true)
        try {
            const res = await confirmForgotPassword(email, otp, password)
            if (res && (res.success || res.statusCode === 200)) {
                toast({ title: "Password Reset", description: res.message || "Password has been reset" })
                router.push(`/forgot-password/success?email=${encodeURIComponent(email)}`)
            } else {
                toast({ title: "Reset Failed", description: res?.message || "Failed to reset password", variant: "destructive" })
            }
        } catch (err: any) {
            toast({ title: "Error", description: err?.message || "Failed to validate", variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-0 shadow-2xl">
                <CardContent className="p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold">Forgot Password</h1>
                        <p className="text-gray-600 mt-2">Enter your email to receive a confirmation code</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!!(new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('email'))} />
                        </div>

                        {!sent && (
                            <Button onClick={handleSend} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold shadow-lg" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Email Confirmation'}
                            </Button>
                        )}

                        {sent || new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('email') ? (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="otp">OTP</Label>
                                    <Input id="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">New Password</Label>
                                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>

                                <Button onClick={handleValidate} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold shadow-lg" disabled={loading}>
                                    {loading ? 'Validating...' : 'Validate & Reset Password'}
                                </Button>
                            </>
                        ) : null}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
