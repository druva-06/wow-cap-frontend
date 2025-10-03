"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Sparkles, ArrowRight, FileText, Clock, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface ApplicationSubmittedModalProps {
    isOpen: boolean
    onClose: () => void
    courseName?: string
    universityName?: string
    registrationId?: string
    intakeSession?: string
}

export function ApplicationSubmittedModal({
    isOpen,
    onClose,
    courseName,
    universityName,
    registrationId,
    intakeSession,
}: ApplicationSubmittedModalProps) {
    const [showContent, setShowContent] = useState(false)
    const [showCheckmark, setShowCheckmark] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    useEffect(() => {
        if (isOpen) {
            // Reset animations
            setShowContent(false)
            setShowCheckmark(false)
            setShowDetails(false)

            // Trigger animations in sequence
            setTimeout(() => setShowContent(true), 100)
            setTimeout(() => setShowCheckmark(true), 300)
            setTimeout(() => setShowDetails(true), 600)
        }
    }, [isOpen])

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
                <div className="relative p-8">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-200/30 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-75" />
                        <Sparkles className="absolute top-4 right-8 w-6 h-6 text-yellow-400 animate-bounce" />
                        <Sparkles className="absolute top-12 right-16 w-4 h-4 text-green-400 animate-bounce delay-100" />
                        <Sparkles className="absolute bottom-16 left-8 w-5 h-5 text-blue-400 animate-bounce delay-200" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        {/* Success Icon */}
                        <div className="flex justify-center mb-6">
                            <div
                                className={cn(
                                    "relative transition-all duration-500 transform",
                                    showContent ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                )}
                            >
                                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl animate-pulse" />
                                <div
                                    className={cn(
                                        "relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl transition-all duration-700",
                                        showCheckmark ? "rotate-0" : "rotate-180"
                                    )}
                                >
                                    <CheckCircle2
                                        className={cn(
                                            "w-12 h-12 text-white transition-all duration-500",
                                            showCheckmark ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <div
                            className={cn(
                                "text-center mb-6 transition-all duration-500 delay-200",
                                showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            )}
                        >
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                Application Submitted! 🎉
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Your application has been successfully created
                            </p>
                        </div>

                        {/* Details Card */}
                        <div
                            className={cn(
                                "bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-6 border border-white/50 transition-all duration-500 delay-300",
                                showDetails ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            )}
                        >
                            {/* Course Info */}
                            {(universityName || courseName) && (
                                <div className="mb-4 pb-4 border-b border-gray-200">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500 mb-1">Applied For</p>
                                            <p className="font-semibold text-gray-900 text-sm leading-tight">
                                                {courseName || "Course"}
                                            </p>
                                            {universityName && (
                                                <p className="text-xs text-gray-600 mt-1">{universityName}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Registration ID */}
                            {registrationId && (
                                <div className="mb-4 pb-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 mb-1">Registration ID</p>
                                            <p className="font-mono font-semibold text-gray-900 text-sm">
                                                {registrationId}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Intake Session */}
                            {intakeSession && (
                                <div className="mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 mb-1">Intake Session</p>
                                            <p className="font-semibold text-gray-900 text-sm">{intakeSession}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Next Steps Info */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                                <div className="flex items-start space-x-3">
                                    <Bell className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-blue-900 mb-1">What's Next?</p>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            We'll notify you via email about the next steps. You can track your application
                                            status in your dashboard.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div
                            className={cn(
                                "transition-all duration-500 delay-500",
                                showDetails ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            )}
                        >
                            <Button
                                onClick={onClose}
                                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                <span>Done</span>
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
