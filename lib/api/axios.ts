"use client"

import axios from "axios"
import { toast } from "@/hooks/use-toast"
import { getToken, clearTokens, getRefreshToken, saveToken } from "@/lib/auth"

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

    // Attempt token refresh on 401 for authenticated requests
    if (status === 401) {
      try {
        const originalRequest = error.config
        // avoid infinite loops
        if (!originalRequest || originalRequest._retry) {
          clearTokens()
          if (typeof window !== "undefined") window.dispatchEvent(new Event("authStateChanged"))
          toast({ title: "Session expired", description: "Please login again", variant: "destructive" })
          return Promise.reject(error)
        }

        const refreshToken = getRefreshToken()
        if (!refreshToken) {
          clearTokens()
          if (typeof window !== "undefined") window.dispatchEvent(new Event("authStateChanged"))
          toast({ title: "Session expired", description: "Please login again", variant: "destructive" })
          return Promise.reject(error)
        }

        // Mark request as retried
        originalRequest._retry = true

        // Call refresh endpoint - adjust path if backend uses different route
        return instance
          .post("/api/auth/refresh-token", { refresh_token: refreshToken })
          .then((resp) => {
            const newAccess = resp?.data?.response?.access_token || resp?.data?.access_token || null
            if (newAccess) {
              // save new token in the same storage mechanism
              try {
                saveToken(newAccess, !!localStorage.getItem("wowcap_refresh_token"))
              } catch (e) {}
              // update header and retry original request
              if (originalRequest.headers) originalRequest.headers["Authorization"] = `Bearer ${newAccess}`
              return instance(originalRequest)
            }

            // Refresh failed - clear tokens
            clearTokens()
            if (typeof window !== "undefined") window.dispatchEvent(new Event("authStateChanged"))
            toast({ title: "Session expired", description: "Please login again", variant: "destructive" })
            return Promise.reject(error)
          })
          .catch((refreshErr) => {
            clearTokens()
            if (typeof window !== "undefined") window.dispatchEvent(new Event("authStateChanged"))
            toast({ title: "Session expired", description: "Please login again", variant: "destructive" })
            return Promise.reject(refreshErr)
          })
      } catch (e) {
        clearTokens()
        if (typeof window !== "undefined") window.dispatchEvent(new Event("authStateChanged"))
        toast({ title: "Session expired", description: "Please login again", variant: "destructive" })
        return Promise.reject(error)
      }
    }

    toast({ title: "API Error", description: String(message), variant: "destructive" })

    return Promise.reject(error)
  }
)

export default instance
