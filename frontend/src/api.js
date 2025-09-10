import axios from "axios";
import { API_BASE } from "./config";
import { getAccessToken, setAccessToken } from "./auth";

const API = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token to requests
API.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response && err.response.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refresh = localStorage.getItem("refresh_token");
        if (!refresh) throw new Error("No refresh token");
        const r = await axios.post(`${API_BASE}/api/token/refresh/`, { refresh });
        const { access } = r.data;
        setAccessToken(access);
        original.headers.Authorization = `Bearer ${access}`;
        return axios(original);
      } catch (e) {
        // refresh failed — clear tokens
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }
    return Promise.reject(err);
  }
);

export default API;