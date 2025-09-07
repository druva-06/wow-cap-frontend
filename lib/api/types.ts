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
