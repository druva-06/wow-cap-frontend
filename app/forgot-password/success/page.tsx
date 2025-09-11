"use client"

import React, { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function ForgotPasswordSuccessPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams?.get("email") || ""

    useEffect(() => {
        const t = setTimeout(() => router.push("/login"), 3000)
        return () => clearTimeout(t)
    }, [router])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-0 shadow-2xl">
                <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Password Reset Successful</h1>
                    <p className="text-gray-600 mb-4">Your password has been updated for {email}</p>
                    <div className="max-w-sm mx-auto">
                        <button
                            onClick={() => router.push("/login")}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold shadow-lg rounded-lg"
                        >
                            Go to Login
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">Redirecting to login...</p>
                </CardContent>
            </Card>
        </div>
    )
}
