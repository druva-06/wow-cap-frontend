"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestPagesPage() {
  const studyPages = [
    {
      title: "Study in USA",
      path: "/study/abroad/usa",
      flag: "🇺🇸",
      description: "Complete USA study page with universities, why study section, and application form",
    },
    {
      title: "Study in UK",
      path: "/study/abroad/uk",
      flag: "🇬🇧",
      description: "Complete UK study page with Russell Group universities and UCAS guidance",
    },
    {
      title: "Study in Canada",
      path: "/study/abroad/canada",
      flag: "🇨🇦",
      description: "Complete Canada study page with immigration pathways and PGWP information",
    },
    {
      title: "Study in Australia",
      path: "/study/abroad/australia",
      flag: "🇦🇺",
      description: "Complete Australia study page with Group of Eight universities",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Study Abroad Pages</h1>
          <p className="text-xl text-gray-600">Click on any page below to view the complete design</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {studyPages.map((page, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <span className="text-3xl">{page.flag}</span>
                  <span>{page.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{page.description}</p>
                <Link href={page.path}>
                  <Button className="w-full">View {page.title} Page</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
