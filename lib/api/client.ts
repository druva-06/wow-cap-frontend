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
    // Normalize intakeMonths in the response to always be an array of upper-case 3-letter month codes
    try {
      const data = res?.data
      const normalizeIntake = (item: any) => {
        if (!item) return item
        const im = item.intakeMonths ?? item.intake_months ?? item.intakeMonthsRaw ?? null
        if (Array.isArray(im)) {
          item.intakeMonths = im.map((m: any) => (m || "").toString().trim().toUpperCase())
        } else if (typeof im === 'string' && im.trim() !== '') {
          // split comma or pipe separated values
          item.intakeMonths = im
            .split(/[ ,|]+/) // split on comma, space or pipe
            .map((m) => (m || "").toString().trim().toUpperCase())
            .filter(Boolean)
        } else {
          item.intakeMonths = Array.isArray(item.intakeMonths) ? item.intakeMonths : []
        }
        return item
      }

      if (data && data.response && Array.isArray(data.response.data)) {
        data.response.data = data.response.data.map(normalizeIntake)
      } else if (data && Array.isArray(data.data)) {
        data.data = data.data.map(normalizeIntake)
      } else if (data && Array.isArray(data)) {
        // axios sometimes returns array directly
        // nothing to normalize at top-level
      }
    } catch (e) {
      // don't block normal flow if normalization fails
      // console.warn('Failed to normalize intakeMonths', e)
    }

    return res.data
  } catch (err: any) {
    if (err?.response?.data) return err.response.data
    throw err
  }
}
