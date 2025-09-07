export type Course = {
  id: string
  name: string
  duration: string
  fees: string
  description: string
}

export type University = {
  id: string
  name: string
  country:
    | "USA"
    | "UK"
    | "Canada"
    | "Australia"
    | "Germany"
    | "Ireland"
    | "France"
    | "New Zealand"
    | "Singapore"
    | "Dubai"
  city: string
  logo: string
  image: string
  ranking: number
  description: string
  courses: Course[]
}
