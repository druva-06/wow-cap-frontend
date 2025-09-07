"use client"

import axios from "axios"
import { toast } from "@/hooks/use-toast"

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
    const token = typeof window !== "undefined" ? localStorage.getItem("wowcap_access_token") : null
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
        localStorage.removeItem("wowcap_access_token")
        localStorage.removeItem("wowcap_refresh_token")
      } catch (e) {}
      toast({ title: "Session expired", description: "Please login again", variant: "destructive" })
    } else {
      toast({ title: "API Error", description: String(message), variant: "destructive" })
    }

    return Promise.reject(error)
  }
)

export default instance
