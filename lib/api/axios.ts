"use client"

import axios from "axios"
import { toast } from "@/hooks/use-toast"
import { getToken, clearTokens } from "@/lib/auth"

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Attach token from localStorage if present
instance.interceptors.request.use((config) => {
  try {
    const token = typeof window !== "undefined" ? getToken() : null
    if (token && config.headers) config.headers["Authorization"] = `Bearer ${token}`
  } catch (e) {
    // ignore
  }
  return config
})

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status
    const message = error?.response?.data?.message || error.message || "Request failed"

    if (status === 401) {
      try {
        clearTokens()
        // notify other components
        if (typeof window !== "undefined") window.dispatchEvent(new Event("authStateChanged"))
      } catch (e) {}
      toast({ title: "Session expired", description: "Please login again", variant: "destructive" })
    } else {
      toast({ title: "API Error", description: String(message), variant: "destructive" })
    }

    return Promise.reject(error)
  }
)

export default instance
