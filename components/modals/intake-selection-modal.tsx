"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, Check, ChevronRight, Sparkles, MessageSquare, CheckCircle2, FileText, Clock, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface IntakeSelectionModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: (selectedIntake: string, selectedYear: number, remarks?: string) => void
    availableIntakes: string[] // Array of month codes like ["JAN", "JUN", "SEP"]
    courseName?: string
    universityName?: string
    isLoading?: boolean
    showSuccess?: boolean
    registrationId?: string
    intakeSession?: string
}

export function IntakeSelectionModal({
    isOpen,
    onClose,
    onConfirm,
    availableIntakes,
    courseName,
    universityName,
    isLoading = false,
    showSuccess = false,
    registrationId,
    intakeSession,
}: IntakeSelectionModalProps) {
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
    const [selectedYear, setSelectedYear] = useState<number | null>(null)
    const [remarks, setRemarks] = useState<string>("")

    // Success animation states
    const [showContent, setShowContent] = useState(false)
    const [showCheckmark, setShowCheckmark] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() // 0-11

    // Trigger success animations
    useEffect(() => {
        if (showSuccess) {
            setShowContent(false)
            setShowCheckmark(false)
            setShowDetails(false)
            setTimeout(() => setShowContent(true), 100)
            setTimeout(() => setShowCheckmark(true), 300)
            setTimeout(() => setShowDetails(true), 600)
        }
    }, [showSuccess])

    // Generate years (current year + next 2 years)
    const availableYears = [currentYear, currentYear + 1, currentYear + 2]

    // Month mapping for display
    const monthMap: Record<string, { full: string; short: string; number: number }> = {
        JAN: { full: "January", short: "Jan", number: 0 },
        FEB: { full: "February", short: "Feb", number: 1 },
        MAR: { full: "March", short: "Mar", number: 2 },
        APR: { full: "April", short: "Apr", number: 3 },
        MAY: { full: "May", short: "May", number: 4 },
        JUN: { full: "June", short: "Jun", number: 5 },
        JUL: { full: "July", short: "Jul", number: 6 },
        AUG: { full: "August", short: "Aug", number: 7 },
        SEP: { full: "September", short: "Sep", number: 8 },
        OCT: { full: "October", short: "Oct", number: 9 },
        NOV: { full: "November", short: "Nov", number: 10 },
        DEC: { full: "December", short: "Dec", number: 11 },
    }

    // Parse and normalize intake codes
    const normalizedIntakes = availableIntakes
        .map((intake) => {
            const code = intake.toString().trim().toUpperCase().slice(0, 3)
            return monthMap[code] ? code : null
        })
        .filter(Boolean) as string[]

    // Check if a month-year combination is in the past
    const isPastIntake = (monthCode: string, year: number) => {
        const month = monthMap[monthCode]?.number
        if (month === undefined) return false

        if (year < currentYear) return true
        if (year === currentYear && month < currentMonth) return true
        return false
    }

    const handleConfirm = () => {
        if (selectedMonth && selectedYear) {
            onConfirm(selectedMonth, selectedYear, remarks.trim() || undefined)
            // Don't close here - let parent control when to show success
        }
    }

    const handleClose = () => {
        // Prevent closing during loading or when showing success
        if (isLoading || showSuccess) return

        setSelectedMonth(null)
        setSelectedYear(null)
        setRemarks("")
        onClose()
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                // Allow closing via X button when showing success, but prevent closing during loading
                if (!open && !isLoading) {
                    if (showSuccess) {
                        // In success state, X button works like Done button
                        onClose()
                    } else {
                        // In selection state, use handleClose
                        handleClose()
                    }
                }
            }}
        >
            <DialogContent
                className={cn(
                    "max-h-[90vh] overflow-y-auto",
                    showSuccess ? "sm:max-w-[500px] p-0 border-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50" : "sm:max-w-[600px]"
                )}
                // Prevent closing on escape or outside click when loading, but allow X button
                onEscapeKeyDown={(e) => {
                    if (isLoading) e.preventDefault()
                }}
                onPointerDownOutside={(e) => {
                    if (isLoading || showSuccess) e.preventDefault()
                }}
            >
                {showSuccess ? (
                    // Success View
                    <div className="relative p-8">
                        {/* Animated Background Elements */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-200/30 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-75" />
                            <Sparkles className="absolute top-4 right-8 w-6 h-6 text-yellow-400 animate-bounce" />
                            <Sparkles className="absolute top-12 right-16 w-4 h-4 text-green-400 animate-bounce delay-100" />
                            <Sparkles className="absolute bottom-16 left-8 w-5 h-5 text-blue-400 animate-bounce delay-200" />
                        </div>

                        {/* Success Content */}
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
                                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Intake Selection View
                    <>
                        <DialogHeader className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                                    <Calendar className="w-6 h-6 text-white" />
                                </div>
                                <DialogTitle className="text-2xl font-bold">Select Your Intake</DialogTitle>
                            </div>
                            <DialogDescription className="text-base">
                                {courseName && universityName ? (
                                    <>
                                        Choose your preferred intake period for <span className="font-semibold text-gray-900">{courseName}</span> at{" "}
                                        <span className="font-semibold text-gray-900">{universityName}</span>
                                    </>
                                ) : (
                                    "Choose your preferred intake period to start your application"
                                )}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-5 mt-4">
                            {/* Month Selection - Smaller */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-4 h-4 text-blue-600" />
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Intake Month <span className="text-red-500">*</span>
                                    </h3>
                                </div>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                    {normalizedIntakes.length > 0 ? (
                                        normalizedIntakes.map((monthCode) => {
                                            const month = monthMap[monthCode]
                                            return (
                                                <button
                                                    key={monthCode}
                                                    onClick={() => setSelectedMonth(monthCode)}
                                                    className={cn(
                                                        "relative p-2 rounded-lg border-2 transition-all duration-200 hover:shadow-sm",
                                                        selectedMonth === monthCode
                                                            ? "border-blue-600 bg-blue-50 shadow-sm"
                                                            : "border-gray-200 hover:border-blue-300 bg-white"
                                                    )}
                                                >
                                                    <div className="flex flex-col items-center space-y-1">
                                                        <div
                                                            className={cn(
                                                                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors",
                                                                selectedMonth === monthCode
                                                                    ? "bg-blue-600 text-white"
                                                                    : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                                                            )}
                                                        >
                                                            {month.short}
                                                        </div>
                                                        <span
                                                            className={cn(
                                                                "text-xs font-medium",
                                                                selectedMonth === monthCode ? "text-blue-900" : "text-gray-600"
                                                            )}
                                                        >
                                                            {month.full}
                                                        </span>
                                                    </div>
                                                    {selectedMonth === monthCode && (
                                                        <div className="absolute top-1 right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                                                            <Check className="w-3 h-3 text-white" />
                                                        </div>
                                                    )}
                                                </button>
                                            )
                                        })
                                    ) : (
                                        <div className="col-span-4 text-center py-6 text-sm text-gray-500">
                                            No intake months available. Please contact the university.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Year Selection - Smaller */}
                            {selectedMonth && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Calendar className="w-4 h-4 text-purple-600" />
                                        <h3 className="text-sm font-semibold text-gray-900">
                                            Intake Year <span className="text-red-500">*</span>
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {availableYears.map((year) => {
                                            const isPast = isPastIntake(selectedMonth, year)
                                            return (
                                                <button
                                                    key={year}
                                                    onClick={() => !isPast && setSelectedYear(year)}
                                                    disabled={isPast}
                                                    className={cn(
                                                        "relative p-3 rounded-lg border-2 transition-all duration-200",
                                                        isPast
                                                            ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                                                            : selectedYear === year
                                                                ? "border-purple-600 bg-purple-50 shadow-sm"
                                                                : "border-gray-200 hover:border-purple-300 bg-white hover:shadow-sm"
                                                    )}
                                                >
                                                    <div className="flex flex-col items-center">
                                                        <div
                                                            className={cn(
                                                                "text-lg font-bold transition-colors",
                                                                isPast
                                                                    ? "text-gray-400"
                                                                    : selectedYear === year
                                                                        ? "text-purple-600"
                                                                        : "text-gray-700 hover:text-purple-600"
                                                            )}
                                                        >
                                                            {year}
                                                        </div>
                                                        {isPast && <span className="text-xs text-gray-400">Past</span>}
                                                    </div>
                                                    {selectedYear === year && !isPast && (
                                                        <div className="absolute top-1 right-1 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                                                            <Check className="w-3 h-3 text-white" />
                                                        </div>
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Remarks Section - Optional */}
                            {selectedMonth && selectedYear && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <div className="flex items-center gap-2 mb-3">
                                        <MessageSquare className="w-4 h-4 text-green-600" />
                                        <Label htmlFor="remarks" className="text-sm font-semibold text-gray-900">
                                            Remarks <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                                        </Label>
                                    </div>
                                    <Textarea
                                        id="remarks"
                                        placeholder="Add any additional notes or preferences (e.g., scholarship interest, accommodation needs, etc.)"
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        className="min-h-[80px] resize-none text-sm"
                                        maxLength={500}
                                    />
                                    <div className="text-xs text-gray-500 mt-1 text-right">
                                        {remarks.length}/500 characters
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-5 pt-5 border-t">
                            <Button
                                variant="outline"
                                onClick={handleClose}
                                className="flex-1 h-10"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleConfirm}
                                disabled={!selectedMonth || !selectedYear || isLoading}
                                className={cn(
                                    "flex-1 h-10 font-semibold transition-all duration-200",
                                    selectedMonth && selectedYear && !isLoading
                                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                )}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Continue to Application
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
