"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Users,
  Calendar,
  CheckSquare,
  MessageCircle,
  BarChart3,
  Clock,
  FileText,
  Phone,
  Video,
  Search,
  Filter,
  Plus,
  Eye,
  Menu,
  X,
  Bell,
  LogOut,
  Settings,
  Target,
} from "lucide-react"

interface CounselorData {
  email: string
  name: string
  role: string
  counselorId: string
  assignedStudents: number
  loginTime: string
}

// Custom Avatar Components
const Avatar = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`}>{children}</div>
)

const AvatarFallback = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-center justify-center rounded-full bg-green-500 text-white ${className}`}>{children}</div>
)

export default function CounselorDashboard() {
  const router = useRouter()
  const [counselor, setCounselor] = useState<CounselorData | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const counselorData = localStorage.getItem("wowcap_counselor")
    if (!counselorData) {
      router.push("/counselor/login")
      return
    }
    setCounselor(JSON.parse(counselorData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("wowcap_counselor")
    router.push("/counselor/login")
  }

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: BarChart3, color: "text-blue-600" },
    { id: "students", label: "My Students", icon: Users, color: "text-green-600" },
    { id: "tasks", label: "Task Management", icon: CheckSquare, color: "text-purple-600" },
    { id: "appointments", label: "Appointments", icon: Calendar, color: "text-orange-600" },
    { id: "applications", label: "Application Tracking", icon: FileText, color: "text-indigo-600" },
    { id: "communication", label: "Communication", icon: MessageCircle, color: "text-teal-600" },
    { id: "performance", label: "Performance", icon: Target, color: "text-pink-600" },
  ]

  if (!counselor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading counselor dashboard...</p>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Welcome Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-600 to-teal-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Welcome back, {counselor.name}! 👋</h2>
                    <p className="text-green-100">Student Counselor Dashboard</p>
                  </div>
                  <div className="text-6xl opacity-20">👩‍🏫</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveTab("students")}
              >
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-2xl font-bold">{counselor.assignedStudents}</div>
                      <div className="text-sm text-gray-600">Assigned Students</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab("tasks")}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <CheckSquare className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm text-gray-600">Pending Tasks</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveTab("appointments")}
              >
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Calendar className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-sm text-gray-600">Today's Appointments</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveTab("applications")}
              >
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-2xl font-bold">45</div>
                      <div className="text-sm text-gray-600">Applications</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "10:00 AM", student: "John Doe", type: "University Selection", duration: "30 min" },
                      { time: "11:30 AM", student: "Jane Smith", type: "Application Review", duration: "45 min" },
                      { time: "2:00 PM", student: "Bob Wilson", type: "Visa Guidance", duration: "60 min" },
                      { time: "4:00 PM", student: "Alice Brown", type: "Test Preparation", duration: "30 min" },
                    ].map((appointment, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                        <div className="w-16 text-sm font-medium text-gray-600">{appointment.time}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{appointment.student}</p>
                          <p className="text-xs text-gray-500">
                            {appointment.type} • {appointment.duration}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Video className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckSquare className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Task completed for John Doe</p>
                        <p className="text-xs text-gray-500">IELTS registration - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Message sent to Jane Smith</p>
                        <p className="text-xs text-gray-500">Application status update - 4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Appointment scheduled</p>
                        <p className="text-xs text-gray-500">Bob Wilson - Tomorrow 2:00 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "students":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  My Students ({counselor.assignedStudents})
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Assign Student
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search students..." className="pl-10" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Student</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Applications</th>
                        <th className="text-left p-3">Last Contact</th>
                        <th className="text-left p-3">Next Appointment</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "John Doe",
                          email: "john@example.com",
                          status: "Active",
                          applications: 3,
                          lastContact: "2 days ago",
                          nextAppointment: "Tomorrow 10:00 AM",
                        },
                        {
                          name: "Jane Smith",
                          email: "jane@example.com",
                          status: "Pending",
                          applications: 1,
                          lastContact: "1 week ago",
                          nextAppointment: "Dec 25, 2:00 PM",
                        },
                        {
                          name: "Bob Wilson",
                          email: "bob@example.com",
                          status: "Active",
                          applications: 5,
                          lastContact: "Yesterday",
                          nextAppointment: "Dec 22, 4:00 PM",
                        },
                      ].map((student, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="w-8 h-8 text-sm">
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <span className="font-medium">{student.name}</span>
                                <p className="text-xs text-gray-500">{student.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge
                              className={
                                student.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {student.status}
                            </Badge>
                          </td>
                          <td className="p-3">{student.applications}</td>
                          <td className="p-3 text-gray-600">{student.lastContact}</td>
                          <td className="p-3 text-gray-600">{student.nextAppointment}</td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Calendar className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-green-800 to-teal-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-green-700">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">👩‍🏫</div>
              <span className="text-xl font-bold text-white">Counselor Panel</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-green-700"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Counselor Profile */}
          <div className="p-4 border-b border-green-700">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="w-10 h-10 text-sm bg-white text-green-600">
                  {counselor.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{counselor.name}</p>
                <p className="text-xs text-green-200 truncate">{counselor.counselorId}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-white text-green-600 shadow-lg"
                        : "text-green-200 hover:bg-green-700 hover:text-white"
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${activeTab === item.id ? "text-green-600" : ""}`} />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-green-700 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-green-200 hover:text-white hover:bg-green-700"
              size="sm"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-green-300 hover:text-white hover:bg-green-700"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 capitalize">
                  {activeTab === "overview" ? "Counselor Dashboard" : activeTab.replace("-", " ")}
                </h1>
                <p className="text-sm text-gray-500">Student Guidance & Support</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="w-8 h-8 text-sm">{counselor.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{counselor.name}</p>
                  <p className="text-xs text-gray-500">Counselor</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
