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

const CATEGORY_META = {
  Culture: { nights: 5, difficulty: "Easy", maxElevation: "1,400m" },
  Adventure: { nights: 10, difficulty: "Challenging", maxElevation: "5,416m" },
  Wildlife: { nights: 4, difficulty: "Easy", maxElevation: "300m" },
  Nature: { nights: 6, difficulty: "Moderate", maxElevation: "2,200m" },
  Religious: { nights: 4, difficulty: "Easy", maxElevation: "150m" },
  History: { nights: 3, difficulty: "Easy", maxElevation: "1,350m" },
};

function metaFor(category) {
  return CATEGORY_META[category] || { nights: 5, difficulty: "Moderate", maxElevation: "2,500m" };
}

const FALLBACK_IMAGES = {
  Wildlife: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
  Culture: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
  Adventure: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  Nature: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
  Religious: "https://images.unsplash.com/photo-1623062362573-057a66b262f1?w=800&q=80",
  History: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&q=80",
  default: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
};

function galleryFor(category, primary) {
  const base = primary || FALLBACK_IMAGES[category] || FALLBACK_IMAGES.default;
  const alt = FALLBACK_IMAGES[category] || FALLBACK_IMAGES.default;
  if (base === alt) {
    return [base, "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&q=80", base];
  }
  return [base, alt, "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80"];
}

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

/** Map Django destination → frontend shape */
export function mapDestination(d) {
  const meta = metaFor(d.category);
  const perNight = Number(d.price_per_night);
  const nights = meta.nights;
  const image = d.image_url || FALLBACK_IMAGES[d.category] || FALLBACK_IMAGES.default;
  return {
    id: String(d.id),
    name: d.name,
    city: d.city,
    country: d.country,
    pricePerNight: perNight,
    price: perNight,
    priceFrom: Math.round(perNight * nights),
    duration: `${nights} Days`,
    difficulty: meta.difficulty,
    category: d.category,
    rating: d.rating,
    reviews: Math.round(d.rating * 28),
    image,
    images: galleryFor(d.category, image),
    description: d.description,
    maxElevation: meta.maxElevation,
    groupSize: "2–12 People",
    bestSeason: "Mar–May, Oct–Nov",
    accommodation: d.category === "Adventure" ? "Teahouse" : "Hotel / Lodge",
    highlights: [
      { icon: "🏔️", title: d.category, desc: `Explore ${d.city} with local guides.` },
      { icon: "📍", title: "Highlights", desc: d.description.slice(0, 120) + (d.description.length > 120 ? "…" : "") },
    ],
    related: [],
  };
}

function mapBooking(b, destinationsById = {}) {
  const destId = b.destinationId != null ? String(b.destinationId) : null;
  const dest = destId ? destinationsById[destId] : null;
  return {
    id: String(b.id),
    destinationId: destId,
    destinationName: b.destinationName || dest?.name || "Trip",
    city: dest?.city || "",
    image: dest?.image || "",
    startDate: b.startDate,
    endDate: b.endDate,
    status: b.status || "CONFIRMED",
    totalPrice: Number(b.totalPrice),
  };
}

function mapNavigation(nav) {
  return {
    startPoint: nav.startPoint,
    waypoints: nav.waypoints || [],
    endPoint: nav.endPoint,
    distanceKm: nav.distanceKm,
    estimatedHours: Math.round((nav.estimatedTimeMinutes || 0) / 60),
  };
}

// ---------------------------------------------------------------------------
// Destinations
// ---------------------------------------------------------------------------

export async function getDestinations() {
  const res = await api.get("/api/destinations/");
  const list = (res.data || []).map(mapDestination);
  list.forEach((d, i, arr) => {
    d.related = arr.filter((x) => x.id !== d.id).slice(0, 3).map((x) => x.id);
  });
  return list;
}

export async function getDestinationById(id) {
  const res = await api.get(`/api/destinations/${id}/`);
  const dest = mapDestination(res.data);
  try {
    const all = await getDestinations();
    dest.related = all.filter((x) => x.id !== dest.id).slice(0, 3).map((x) => x.id);
  } catch {
    dest.related = [];
  }
  return dest;
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
    byId[String(d.id)] = mapDestination(d);
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
    byId[String(d.id)] = mapDestination(d);
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

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export async function getNavigation(id) {
  try {
    const res = await api.get(`/api/navigation/${id}/`);
    return mapNavigation(res.data);
  } catch (err) {
    throw Object.assign(new Error(parseApiError(err)), { status: err.response?.status });
  }
}

export function destinationImageFallback(category) {
  return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.default;
}

export default api;
