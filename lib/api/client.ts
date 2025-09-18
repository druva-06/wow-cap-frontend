import axios from "./axios"
import type { LoginRequest, LoginApiResponse } from "./types"

export async function login(data: LoginRequest): Promise<LoginApiResponse> {
  try {
    const res = await axios.post<LoginApiResponse>("/api/auth/login", data)
    return res.data
  } catch (err: any) {
    // If backend responded with a structured error payload, return it so callers
    // can show the message instead of relying only on thrown errors.
    if (err?.response?.data) {
      return err.response.data as LoginApiResponse
    }
    throw err
  }
}

export async function signup(data: Record<string, any>): Promise<any> {
  try {
    const res = await axios.post("/api/auth/signup", data)
    return res.data
  } catch (err: any) {
    if (err?.response?.data) return err.response.data
    throw err
  }
}

export async function confirmVerificationCode(email: string, verificationCode: string): Promise<any> {
  try {
    const res = await axios.get("/api/auth/confirmVerificationCode", {
      params: { email, verificationCode },
    })
    return res.data
  } catch (err: any) {
    if (err?.response?.data) return err.response.data
    throw err
  }
}

export async function resendVerificationCode(email: string): Promise<any> {
  try {
    const res = await axios.get(`/api/auth/resendVerificationCode/${encodeURIComponent(email)}`)
    return res.data
  } catch (err: any) {
    if (err?.response?.data) return err.response.data
    throw err
  }
}

export async function sendForgotPasswordOtp(email: string): Promise<any> {
  try {
  // Call the backend forgotPassword endpoint which sends OTP to the given email
  const res = await axios.get(`/api/auth/forgotPassword/${encodeURIComponent(email)}`)
    return res.data
  } catch (err: any) {
    if (err?.response?.data) return err.response.data
    throw err
  }
}

export async function confirmForgotPassword(email: string, confirmationCode: string, newPassword: string): Promise<any> {
  try {
    const res = await axios.get(`/api/auth/confirmForgotPassword`, {
      params: { email, confirmationCode, newPassword },
    })
    return res.data
  } catch (err: any) {
    if (err?.response?.data) return err.response.data
    throw err
  }
}

export async function searchCollegeCourses(payload: any): Promise<any> {
  try {
    const res = await axios.post(`/api/college-course/collegeCourses`, payload)
    return res.data
  } catch (err: any) {
    if (err?.response?.data) return err.response.data
    throw err
  }
}
