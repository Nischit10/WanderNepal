import axios from "axios";
import { API_BASE } from "../config";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token") || localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Token ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

function parseApiError(err) {
  const data = err.response?.data;
  if (!data) return err.message || "Request failed";
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;
  const first = Object.values(data)[0];
  if (Array.isArray(first)) return first[0];
  if (typeof first === "string") return first;
  return "Request failed";
}

function mapBooking(b, destinationsById = {}) {
  const destId = b.destinationId != null ? String(b.destinationId) : null;
  const dest = destId ? destinationsById[destId] : null;
  return {
    id: String(b.id),
    destinationId: destId,
    destinationName: b.destinationName || dest?.name || "Trip",
    city: dest?.city || "",
    image: dest?.image_url || dest?.image || "",
    startDate: b.startDate,
    endDate: b.endDate,
    status: b.status || "CONFIRMED",
    totalPrice: Number(b.totalPrice),
  };
}

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------

export async function createBooking(payload) {
  const body = {
    destinationId: Number(payload.destinationId),
    startDate: payload.startDate,
    endDate: payload.endDate,
  };
  try {
    const res = await api.post("/api/bookings/", body);
    return mapBooking(res.data);
  } catch (err) {
    throw Object.assign(new Error(parseApiError(err)), { status: err.response?.status });
  }
}

export async function getMyBookings() {
  const [bookRes, destRes] = await Promise.all([
    api.get("/api/bookings/me/"),
    api.get("/api/destinations/"),
  ]);
  const byId = {};
  (destRes.data || []).forEach((d) => {
    byId[String(d.id)] = d;
  });
  return (bookRes.data || []).map((b) => mapBooking(b, byId));
}

export async function getBookingById(id) {
  const [bookRes, destRes] = await Promise.all([
    api.get(`/api/bookings/${id}/`),
    api.get("/api/destinations/"),
  ]);
  const byId = {};
  (destRes.data || []).forEach((d) => {
    byId[String(d.id)] = d;
  });
  return mapBooking(bookRes.data, byId);
}

export async function cancelBooking(id) {
  try {
    const res = await api.patch(`/api/bookings/${id}/cancel/`);
    return mapBooking(res.data);
  } catch (err) {
    throw Object.assign(new Error(parseApiError(err)), { status: err.response?.status });
  }
}

export default api;

