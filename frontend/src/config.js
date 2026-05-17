/** Django API (override for deployed builds: REACT_APP_API_BASE_URL). */
const env = process.env.REACT_APP_API_BASE_URL;
export const API_BASE = (env && env.trim()) ? env.trim().replace(/\/$/, "") : "http://127.0.0.1:8000";

export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}
