import axios from "./axios"
import type { LoginRequest, LoginApiResponse } from "./types"

export async function login(data: LoginRequest): Promise<LoginApiResponse> {
  const res = await axios.post<LoginApiResponse>("/api/auth/login", data)
  return res.data
}
