"use client"

import { redirect } from "next/navigation"
import { useEffect } from "react"

interface PageProps {
  params: {
    slug: string[]
  }
}

export default function StudentDashboardPage({ params }: PageProps) {
  useEffect(() => {
    // Redirect to the main dashboard with proper tab and subtab parameters
    const [mainTab, subTab] = params.slug || ["overview"]

    const validTabs = [
      "overview",
      "shortlist",
      "applications",
      "documents",
      "offers",
      "tasks",
      "community",
      "jobs",
      "loan",
      "more",
    ]

    const tab = validTabs.includes(mainTab) ? mainTab : "overview"
    const redirectUrl = subTab ? `/dashboard?tab=${tab}&subtab=${subTab}` : `/dashboard?tab=${tab}`

    redirect(redirectUrl)
  }, [params.slug])

  return null
}
