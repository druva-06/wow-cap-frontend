"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

export default function SignupConfirmPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const prefillEmail = searchParams.get("email") || ""

    const [email, setEmail] = useState(prefillEmail)
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [resendTimer, setResendTimer] = useState(30)
    const [canResend, setCanResend] = useState(false)

    useEffect(() => {
        if (prefillEmail) setEmail(prefillEmail)
    }, [prefillEmail])

    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | null = null
        if (resendTimer > 0) {
            setCanResend(false)
            timer = setInterval(() => {
                setResendTimer((t) => t - 1)
            }, 1000)
        } else {
            setCanResend(true)
        }

        return () => {
            if (timer) clearInterval(timer)
        }
    }, [resendTimer])

    useEffect(() => {
        // start countdown on mount
        setResendTimer(30)
    }, [email])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return toast({ title: "Validation", description: "Email is required", variant: "destructive" })
        if (!code) return toast({ title: "Validation", description: "Verification code is required", variant: "destructive" })

        setLoading(true)
        try {
            const { confirmVerificationCode } = await import("@/lib/api/client")
            const res = await confirmVerificationCode(email, code)

            if (res && (res.success || res.statusCode === 200)) {
                toast({ title: "Verified", description: res.message || "Account verified" })
                router.push("/signup/success?email=" + encodeURIComponent(email))
            } else {
                toast({ title: "Verification Failed", description: res?.message || "Failed to verify", variant: "destructive" })
            }
        } catch (err: any) {
            toast({ title: "Error", description: err?.message || "Verification failed", variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-0 shadow-2xl">
                <CardContent className="p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold">Confirm Your Email</h1>
                        <p className="text-gray-600 mt-2">Enter the verification code sent to your email</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!!prefillEmail}
                                aria-disabled={!!prefillEmail}
                                className={prefillEmail ? "bg-gray-50" : undefined}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="code">Verification Code</Label>
                            <Input id="code" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold shadow-lg"
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify Email"}
                        </Button>
                    </form>

                    <div className="mt-4 text-center text-sm text-gray-600">
                        <div className="flex items-center justify-center gap-2">
                            <span>Didn't receive the code?</span>
                            <button
                                type="button"
                                disabled={!canResend}
                                aria-disabled={!canResend}
                                onClick={async () => {
                                    if (!email) return toast({ title: "Validation", description: "Email is required", variant: "destructive" })
                                    try {
                                        const { resendVerificationCode } = await import("@/lib/api/client")
                                        const res = await resendVerificationCode(email)
                                        toast({ title: res?.success ? "Resent" : "Resend Failed", description: res?.message || "", variant: res?.success ? undefined : "destructive" })
                                        // restart timer
                                        setResendTimer(30)
                                    } catch (err: any) {
                                        toast({ title: "Error", description: err?.message || "Failed to resend", variant: "destructive" })
                                    }
                                }}
                                className={canResend ? 'text-blue-600 font-bold hover:underline' : 'text-gray-400 font-bold cursor-not-allowed'}
                            >
                                {canResend ? 'Resend Code' : `Resend in ${resendTimer}s`}
                            </button>
                        </div>
                        <div className="mt-2">Or check your spam or <Link href="/support" className="text-blue-600 font-bold">contact support</Link>.</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
