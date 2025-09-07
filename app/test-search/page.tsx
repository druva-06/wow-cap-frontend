"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TestSearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Search Results Implementation</h1>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Test Links</h2>
            <div className="space-y-2">
              <div>
                <Link href="/search-results?vertical=study-abroad&q=computer">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Test Search Results - Study Abroad
                  </Button>
                </Link>
              </div>
              <div>
                <Link href="/search-results?vertical=study-india&q=engineering">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Test Search Results - Study India
                  </Button>
                </Link>
              </div>
              <div>
                <Link href="/courses/computer-science-masters-cs001">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Test Course Detail Page</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Features Implemented</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>✅ Fixed pagination logic</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>✅ Added mobile responsiveness</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>✅ Comparison checkbox on images</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>✅ "Add to list" text beside heart</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>✅ SEO-friendly URLs</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>✅ New course detail page</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">How to Test</h2>
            <ol className="space-y-2 text-gray-700 list-decimal list-inside">
              <li>Click on "Test Search Results" buttons above</li>
              <li>Try the comparison checkboxes (top-left of images)</li>
              <li>Test the pagination at the bottom</li>
              <li>Try the "Add to list" functionality</li>
              <li>Click on course names to see SEO-friendly URLs</li>
              <li>Test mobile responsiveness by resizing browser</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
