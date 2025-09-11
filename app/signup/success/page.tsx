"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function SignupSuccessPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams?.get("email") || ""
    const firstName = searchParams?.get("firstName") || ""
    const lastName = searchParams?.get("lastName") || ""

    const displayName = (() => {
        if (firstName || lastName) return `${firstName} ${lastName}`.trim()
        if (!email) return ""
        const local = email.split("@")[0]
        const parts = local.split(/[._-]/).filter(Boolean)
        return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ")
    })()

    const [countdown, setCountdown] = useState(5)

    useEffect(() => {
        const id = setInterval(() => {
            setCountdown((c) => {
                if (c <= 1) {
                    clearInterval(id)
                    router.push("/login")
                    return 0
                }
                return c - 1
            })
        }, 1000)

        return () => clearInterval(id)
    }, [router])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl border-0 shadow-2xl">
                <CardContent className="p-8">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                            Account Created Successfully! 🎉
                        </h1>
                        <p className="text-gray-600">Welcome to WowCap{displayName ? `, ${displayName}` : ""}!</p>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-4">You will be redirected to the login page in <strong>{countdown}</strong> seconds.</p>
                        <div className="max-w-sm mx-auto">
                            <button
                                onClick={() => router.push("/login")}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold shadow-lg rounded-lg"
                            >
                                Go to Login
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">If you are not redirected automatically, click the button above.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
