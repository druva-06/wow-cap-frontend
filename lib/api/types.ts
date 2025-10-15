export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponseUser {
  user_id: number
  first_name: string
  last_name: string
  username?: string
  email: string
  phone_number?: string
  role?: string
}

export interface LoginResponseBody {
  id_token: string
  access_token: string
  refresh_token?: string
  token_type: string
  expires_in?: number
  user: LoginResponseUser
}

export interface LoginApiResponse {
  response: LoginResponseBody
  message: string
  statusCode: number
  success: boolean
}

export interface StudentEducation {
  educationId: number
  educationLevel: "UNDERGRADUATE" | "POSTGRADUATE" | "HIGH_SCHOOL" | "DOCTORATE"
  institutionName: string
  board: string | null
  collegeCode: string | null
  institutionAddress: string
  startYear: string
  endYear: string
  percentage: number | null
  cgpa: number | null
  fieldOfStudy: string
  degree: string
  backlogs: number | null
  certificateDocument: string | null
}

export interface StudentEducationResponse {
  response: StudentEducation[]
  message: string
  statusCode: number
  success: boolean
}
