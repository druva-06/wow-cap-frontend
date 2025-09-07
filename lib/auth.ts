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
  } catch (e) {}
}
