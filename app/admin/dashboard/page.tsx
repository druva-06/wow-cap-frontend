"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FileText,
  Award,
  TrendingUp,
  Menu,
  X,
  Home,
  UserCheck,
  Bot,
  Building,
  Flag,
  BarChart3,
  Bell,
  LogOut,
  Shield,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/admin/dashboard" },
    { id: "leads", label: "Leads", icon: Users, href: "/admin/leads" },
    { id: "applications", label: "Applications", icon: FileText, href: "/admin/applications" },
    { id: "employees", label: "Employees", icon: UserCheck, href: "/admin/employees" },
    { id: "ai-agents", label: "AI Agents", icon: Bot, href: "/admin/ai-agents" },
    { id: "colleges", label: "Colleges", icon: Building, href: "/admin/colleges" },
    { id: "red-flags", label: "Red Flags", icon: Flag, href: "/admin/red-flags" },
    { id: "reports", label: "Reports", icon: BarChart3, href: "/admin/reports" },
  ]

  const stats = [
    {
      title: "Total Leads",
      value: "1,247",
      change: "+12% from last month",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Applications",
      value: "456",
      change: "+8% from last month",
      changeType: "positive",
      icon: FileText,
    },
    {
      title: "Offers Received",
      value: "189",
      change: "+15% from last month",
      changeType: "positive",
      icon: Award,
    },
    {
      title: "Revenue",
      value: "₹45.2L",
      change: "+22% from last month",
      changeType: "positive",
      icon: TrendingUp,
    },
  ]

  const conversionData = [
    { stage: "Leads Generated", count: 1247, percentage: 100 },
    { stage: "Qualified Leads", count: 892, percentage: 72 },
    { stage: "Applications", count: 456, percentage: 37 },
    { stage: "Offers", count: 189, percentage: 15 },
  ]

  const teamPerformance = [
    { name: "Priya Counselor", role: "Senior Counselor", conversions: 28, rate: 92 },
    { name: "Amit Counselor", role: "Counselor", conversions: 22, rate: 87 },
    { name: "Ravi Telecaller", role: "Telecaller", conversions: 15, rate: 78 },
  ]

  const recentActivity = [
    { action: "New lead from Mumbai", time: "2 minutes ago", type: "lead" },
    { action: "Application submitted for Harvard", time: "15 minutes ago", type: "application" },
    { action: "Offer received from MIT", time: "1 hour ago", type: "offer" },
    { action: "Payment received ₹2.5L", time: "2 hours ago", type: "payment" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-red-600 to-orange-600 text-white transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-6 border-b border-red-500/30">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-xl font-bold">Admin Portal</h1>
              <p className="text-red-100 text-sm">WowCap Management</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-red-500/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      setActiveTab(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive ? "bg-white text-red-600 shadow-lg" : "text-red-100 hover:bg-red-500/20 hover:text-white"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-red-600" : "text-red-200"}`} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto text-red-600" />}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-red-500/30">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-100 hover:bg-red-500/20 hover:text-white"
            onClick={() => {
              // Handle logout
              window.location.href = "/admin/login"
            }}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome back, Admin</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="text-gray-700 font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                      </div>
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Lead Conversion Funnel */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Lead Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {conversionData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{item.stage}</span>
                        <span className="text-sm font-bold text-gray-900">{item.count}</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Performance */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPerformance.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{member.rate}%</p>
                        <p className="text-sm text-gray-600">{member.conversions} conversions</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="mt-8 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
