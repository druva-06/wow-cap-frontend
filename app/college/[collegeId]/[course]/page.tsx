import { redirect } from "next/navigation"

interface CollegeCoursePageProps {
  params: {
    collegeId: string
    course: string
  }
}

export default function CollegeCoursePage({ params }: CollegeCoursePageProps) {
  redirect(`/college/${params.collegeId}`)
}
