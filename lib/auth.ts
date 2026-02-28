export function setToken(token: string) {
  try {
    localStorage.setItem("meritcap_access_token", token)
  } catch (e) {}
}

export function setRefreshToken(token: string) {
  try {
    localStorage.setItem("meritcap_refresh_token", token)
  } catch (e) {}
}

export function clearTokens() {
  try {
    localStorage.removeItem("meritcap_access_token")
    localStorage.removeItem("meritcap_refresh_token")
    sessionStorage.removeItem("meritcap_access_token")
    sessionStorage.removeItem("meritcap_refresh_token")
  } catch (e) {}
}

export function getToken(): string | null {
  try {
    return localStorage.getItem("meritcap_access_token") || sessionStorage.getItem("meritcap_access_token")
  } catch (e) {
    return null
  }
}

export function saveToken(token: string, remember = false) {
  try {
    if (remember) {
      localStorage.setItem("meritcap_access_token", token)
    } else {
      sessionStorage.setItem("meritcap_access_token", token)
    }
  } catch (e) {}
}

export function saveRefreshToken(token: string, remember = false) {
  try {
    if (remember) {
      localStorage.setItem("meritcap_refresh_token", token)
    } else {
      sessionStorage.setItem("meritcap_refresh_token", token)
    }
  } catch (e) {}
}

export function getRefreshToken(): string | null {
  try {
    return localStorage.getItem("meritcap_refresh_token") || sessionStorage.getItem("meritcap_refresh_token")
  } catch (e) {
    return null
  }
}
