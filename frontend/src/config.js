/** Django API (override for deployed builds: REACT_APP_API_BASE_URL). */
const env = process.env.REACT_APP_API_BASE_URL;

// Default to empty string for development proxy support, 
// but ensure it's a clean string.
export const API_BASE = (env && env.trim()) ? env.trim().replace(/\/$/, "") : "";

export function apiUrl(path) {
  if (!path) return API_BASE;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}
