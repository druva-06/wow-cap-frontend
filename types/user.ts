export interface UnifiedUserProfile {
  // Basic Information
  name: string
  email: string
  phone: string
  username?: string
  dateOfBirth: string
  nationality: string
  currentLocation: string
  profile_picture?: string

  // Education Background
  lastEducation: string
  lastEducationPercentage: string
  lastEducationYear: string
  lastEducationInstitution: string

  // New minimal profile fields
  tenth_year?: string
  tenth_percentage?: string
  twelfth_year?: string
  twelfth_percentage?: string
  current_degree_type?: string
  current_degree_year?: string
  current_degree_percentage?: string
  budget_range?: string
  preferred_countries?: string[]
  alternate_countries?: string[]

  // Test Scores - Updated structure
  overall_test_score?: string
  listening_score?: string
  reading_score?: string
  writing_score?: string
  speaking_score?: string

  // Optional fields
  work_experience?: string
  projects?: string
  entrance_exam_scores?: string

  // Test Scores (Legacy - keep for compatibility)
  hasTestScores: boolean
  testScores: TestScore[]

  // Profile Status
  profileCompleted?: boolean
  profileSkipped?: boolean
  profileCompletion?: number
  profileStage?: string

  // System Fields
  studentId?: string
  loginTime?: string
  signupTime?: string
}

export interface TestScore {
  testType: string
  score: string
  date: string
}

export interface UserSearchPreferences {
  preferredCountries: string[]
  preferredCities: string[]
  budgetRange: string
  courseLevel: string
  fieldOfStudy: string[]
}

export interface UserApplicationStatus {
  totalApplications: number
  acceptedApplications: number
  pendingApplications: number
  rejectedApplications: number
}
