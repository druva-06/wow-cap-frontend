export function setToken(token: string) {
  try {
    localStorage.setItem("wowcap_access_token", token)
  } catch (e) {}
}

export function setRefreshToken(token: string) {
  try {
    localStorage.setItem("wowcap_refresh_token", token)
  } catch (e) {}
}

export function clearTokens() {
  try {
    localStorage.removeItem("wowcap_access_token")
    localStorage.removeItem("wowcap_refresh_token")
    sessionStorage.removeItem("wowcap_access_token")
    sessionStorage.removeItem("wowcap_refresh_token")
  } catch (e) {}
}

export function getToken(): string | null {
  try {
    return localStorage.getItem("wowcap_access_token") || sessionStorage.getItem("wowcap_access_token")
  } catch (e) {
    return null
  }
}

export function saveToken(token: string, remember = false) {
  try {
    if (remember) {
      localStorage.setItem("wowcap_access_token", token)
    } else {
      sessionStorage.setItem("wowcap_access_token", token)
    }
  } catch (e) {}
}

export function saveRefreshToken(token: string, remember = false) {
  try {
    if (remember) {
      localStorage.setItem("wowcap_refresh_token", token)
    } else {
      sessionStorage.setItem("wowcap_refresh_token", token)
    }
  } catch (e) {}
}
