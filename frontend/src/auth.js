import { jwtDecode } from "jwt-decode"; 

export function setAccessToken(token) {
  if (token) localStorage.setItem("access_token", token);
  else localStorage.removeItem("access_token");
}
export function setRefreshToken(token) {
  if (token) localStorage.setItem("refresh_token", token);
  else localStorage.removeItem("refresh_token");
}
export function getAccessToken() {
  return localStorage.getItem("access_token");
}
export function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}
export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
}
export function isTokenExpired(token) {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  } catch (e) {
    return true;
  }
}