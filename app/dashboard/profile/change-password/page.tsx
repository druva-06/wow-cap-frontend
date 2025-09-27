"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock, ArrowLeft } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { changePassword } from "@/lib/api/client"

export default function ChangePasswordPage() {
    const router = useRouter()
    const [showOld, setShowOld] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((p) => ({ ...p, [name]: value }))
    }

    const validate = () => {
        if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
            toast({ title: "Missing Fields", description: "Please fill in all fields", variant: "destructive" })
            return false
        }
        if (form.newPassword.length < 8) {
            toast({ title: "Weak Password", description: "New password must be at least 8 characters", variant: "destructive" })
            return false
        }
        if (form.newPassword === form.oldPassword) {
            toast({ title: "No Change", description: "New password must be different from old password", variant: "destructive" })
            return false
        }
        if (form.newPassword !== form.confirmPassword) {
            toast({ title: "Mismatch", description: "New and confirm password do not match", variant: "destructive" })
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        setSubmitting(true)
        try {
            const res = await changePassword(form.oldPassword, form.newPassword)
            if (res?.success) {
                toast({ title: res?.message || "Password Updated", description: res?.response || "Password changed successfully" })
                setForm({ oldPassword: "", newPassword: "", confirmPassword: "" })
                // Optionally redirect back after a short delay
                setTimeout(() => router.back(), 600)
            } else {
                toast({
                    title: res?.message || "Update Failed",
                    description: (res && (res.error || res.response)) || "Unable to change password",
                    variant: "destructive",
                })
            }
        } catch (e: any) {
            const msg = e?.response?.data?.message || e?.message || "Unable to change password. Try again."
            toast({ title: "Update Failed", description: msg, variant: "destructive" })
        } finally {
            setSubmitting(false)
        }
    }

    const renderPasswordField = (
        label: string,
        name: keyof typeof form,
        value: string,
        show: boolean,
        setShow: (v: boolean) => void,
        placeholder: string,
    ) => (
        <div className="space-y-1">
            <Label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-500" /> {label}
            </Label>
            <div className="relative">
                <Input
                    id={name}
                    name={name}
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="pr-10"
                    autoComplete="off"
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                    aria-label={show ? "Hide password" : "Show password"}
                >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-10 px-4">
            <Card className="w-full max-w-md border border-gray-200 shadow-sm">
                <CardHeader className="space-y-1 pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold text-gray-900">Change Password</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-gray-500 hover:text-gray-700">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back
                        </Button>
                    </div>
                    <p className="text-sm text-gray-500">Keep your account secure by using a strong unique password.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {renderPasswordField("Current Password", "oldPassword", form.oldPassword, showOld, setShowOld, "Enter current password")}
                        {renderPasswordField("New Password", "newPassword", form.newPassword, showNew, setShowNew, "At least 8 characters")}
                        {renderPasswordField("Confirm New Password", "confirmPassword", form.confirmPassword, showConfirm, setShowConfirm, "Re-enter new password")}

                        <div className="bg-blue-50 border border-blue-100 text-blue-700 text-xs rounded-md px-3 py-2">
                            <ul className="list-disc list-inside space-y-1">
                                <li>Minimum 8 characters</li>
                                <li>Use letters, numbers & symbols for a stronger password</li>
                                <li>Avoid reusing old passwords</li>
                            </ul>
                        </div>

                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60"
                        >
                            {submitting ? "Updating..." : "Update Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
