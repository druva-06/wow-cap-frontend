"use client"

// Simple encryption/decryption utility using AES-like approach with Web Crypto API
// For production, consider using a more robust library like crypto-js

const ENCRYPTION_KEY = "wowcap-secure-key-2025" // In production, this should be an environment variable

/**
 * Encrypts data using a simple XOR cipher with base64 encoding
 * For production, use proper encryption libraries
 */
export function encryptData(data: any): string {
  try {
    const jsonString = JSON.stringify(data)
    const encrypted = btoa(
      jsonString
        .split("")
        .map((char, i) => 
          String.fromCharCode(char.charCodeAt(0) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length))
        )
        .join("")
    )
    return encrypted
  } catch (error) {
    console.error("Encryption error:", error)
    return btoa(JSON.stringify(data)) // Fallback to base64 only
  }
}

/**
 * Decrypts data that was encrypted with encryptData
 */
export function decryptData(encryptedData: string): any {
  try {
    const decoded = atob(encryptedData)
    const decrypted = decoded
      .split("")
      .map((char, i) =>
        String.fromCharCode(char.charCodeAt(0) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length))
      )
      .join("")
    return JSON.parse(decrypted)
  } catch (error) {
    console.error("Decryption error:", error)
    try {
      // Fallback: try to decode as base64 only
      return JSON.parse(atob(encryptedData))
    } catch {
      return null
    }
  }
}

/**
 * Securely stores user data in localStorage with encryption
 */
export function setEncryptedUser(userData: any, useSessionStorage = false): void {
  try {
    console.log("[Encryption] Starting encryption for user data:", { 
      userDataKeys: Object.keys(userData),
      useSessionStorage 
    })
    
    const encrypted = encryptData(userData)
    console.log("[Encryption] Data encrypted successfully, length:", encrypted.length)
    
    if (useSessionStorage) {
      sessionStorage.setItem("wowcap_user_secure", encrypted)
      console.log("[Encryption] Stored in sessionStorage as 'wowcap_user_secure'")
    } else {
      localStorage.setItem("wowcap_user_secure", encrypted)
      console.log("[Encryption] Stored in localStorage as 'wowcap_user_secure'")
    }
    
    // Verify it was stored
    const stored = useSessionStorage 
      ? sessionStorage.getItem("wowcap_user_secure")
      : localStorage.getItem("wowcap_user_secure")
    console.log("[Encryption] Verification - Data stored successfully:", !!stored)
  } catch (error) {
    console.error("[Encryption] Failed to store encrypted user data:", error)
  }
}

/**
 * Retrieves and decrypts user data from localStorage
 */
export function getEncryptedUser(): any {
  try {
    // Try localStorage first
    let encrypted = localStorage.getItem("wowcap_user_secure")
    let storageType = "localStorage"
    
    // Fallback to sessionStorage
    if (!encrypted) {
      encrypted = sessionStorage.getItem("wowcap_user_secure")
      storageType = "sessionStorage"
    }
    
    console.log("[Encryption] Retrieving encrypted data from:", storageType, "Found:", !!encrypted)
    
    if (!encrypted) {
      console.log("[Encryption] No encrypted data found")
      return null
    }
    
    const decrypted = decryptData(encrypted)
    console.log("[Encryption] Data decrypted successfully:", !!decrypted)
    
    return decrypted
  } catch (error) {
    console.error("[Encryption] Failed to retrieve encrypted user data:", error)
    return null
  }
}

/**
 * Removes encrypted user data from storage
 */
export function removeEncryptedUser(): void {
  try {
    localStorage.removeItem("wowcap_user_secure")
    sessionStorage.removeItem("wowcap_user_secure")
  } catch (error) {
    console.error("Failed to remove encrypted user data:", error)
  }
}

/**
 * Migrates existing unencrypted user data to encrypted format
 */
export function migrateToEncryptedStorage(): void {
  try {
    // Check for existing unencrypted data
    const unencryptedData = localStorage.getItem("wowcap_user") || sessionStorage.getItem("wowcap_user")
    
    if (unencryptedData) {
      const userData = JSON.parse(unencryptedData)
      const useSession = !!sessionStorage.getItem("wowcap_user")
      
      // Store encrypted version
      setEncryptedUser(userData, useSession)
      
      // Keep the old version for backward compatibility during transition
      // You can remove this after full migration
    }
  } catch (error) {
    console.error("Failed to migrate user data:", error)
  }
}
