import axios from "axios";
import { API_BASE } from "../config";

// ---------------------------------------------------------------------------
// Axios instance
// ---------------------------------------------------------------------------
const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Auth interceptor – DRF Token auth (NOT Bearer)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token") || localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------------------------------------------------------------------
// Mock toggle – flip to false when backend destinations/bookings are ready
// ---------------------------------------------------------------------------
const USE_MOCK = true;

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
const MOCK_DESTINATIONS = [
  {
    id: "1",
    name: "Annapurna Sanctuary",
    city: "Pokhara",
    country: "Nepal",
    price: 1200,
    duration: "12 Days",
    difficulty: "Moderate–Challenging",
    rating: 4.8,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    ],
    description:
      "The Annapurna Sanctuary trek is a spectacular journey into the heart of the Annapurna massif. This unique glacial basin is surrounded by a ring of eleven peaks over 7,000 meters, creating a natural amphitheater that has been revered as a sacred space for centuries. As we ascend from the subtropical lowlands of Pokhara through rhododendron forests and terraced hillsides, the landscape transforms into a high-altitude alpine wonderland.",
    maxElevation: "4,130m",
    groupSize: "2–12 People",
    bestSeason: "Mar–May",
    accommodation: "Lodge / Teahouse",
    highlights: [
      { icon: "⛺", title: "Base Camp Arrival", desc: "Reach 4,130m at the base of the world's 10th highest peak." },
      { icon: "🌸", title: "Rhododendron Forests", desc: "Walk through vibrant blooms and diverse mountain ecosystems." },
    ],
    related: ["2", "5", "6"],
  },
  {
    id: "2",
    name: "Everest Base Camp",
    city: "Lukla",
    country: "Nepal",
    price: 1850,
    duration: "16 Days",
    difficulty: "Challenging",
    rating: 4.9,
    reviews: 340,
    image: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=80",
      "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    ],
    description:
      "Stand at the foot of the world's highest mountain on this iconic trek through the Khumbu Valley. Experience legendary Sherpa culture, high-altitude glaciers, and some of the most dramatic mountain scenery on Earth. The journey to Base Camp at 5,364m is one of the great adventures of a lifetime.",
    maxElevation: "5,364m",
    groupSize: "2–16 People",
    bestSeason: "Apr–May, Oct–Nov",
    accommodation: "Teahouse",
    highlights: [
      { icon: "🏔️", title: "Khumbu Glacier", desc: "Trek alongside one of the world's most famous glaciers." },
      { icon: "🏘️", title: "Namche Bazaar", desc: "Explore the vibrant gateway town to the Khumbu region." },
    ],
    related: ["1", "5", "6"],
  },
  {
    id: "3",
    name: "Kathmandu Cultural Tour",
    city: "Kathmandu",
    country: "Nepal",
    price: 650,
    duration: "5 Days",
    difficulty: "Easy",
    rating: 4.7,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    ],
    description:
      "Immerse yourself in the living heritage of Nepal's ancient capital. Explore UNESCO World Heritage Sites, vibrant bazaars, sacred temples, and the unique Newari culture that has shaped this Himalayan city for over a millennium.",
    maxElevation: "1,400m",
    groupSize: "2–20 People",
    bestSeason: "Oct–Apr",
    accommodation: "Hotel (3★)",
    highlights: [
      { icon: "🛕", title: "Pashupatinath Temple", desc: "Visit Nepal's most sacred Hindu temple on the Bagmati river." },
      { icon: "☸️", title: "Boudhanath Stupa", desc: "Circumambulate one of the world's largest Buddhist stupas." },
    ],
    related: ["4", "1", "2"],
  },
  {
    id: "4",
    name: "Lakeside Retreat",
    city: "Pokhara",
    country: "Nepal",
    price: 420,
    duration: "4 Days",
    difficulty: "Easy",
    rating: 4.6,
    reviews: 183,
    image: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&q=80",
    ],
    description:
      "Unwind in Nepal's most scenic city on the shores of Phewa Lake with the Annapurna range as your backdrop. Enjoy boat rides, paragliding, cave exploration, and vibrant lakeside dining in this beloved mountain retreat.",
    maxElevation: "827m",
    groupSize: "2–20 People",
    bestSeason: "Oct–May",
    accommodation: "Lakeside Resort",
    highlights: [
      { icon: "🚣", title: "Phewa Lake", desc: "Paddle across the reflective lake with Machhapuchhre in view." },
      { icon: "🪂", title: "Paragliding", desc: "Soar over the valley for breathtaking aerial Himalayan views." },
    ],
    related: ["3", "1", "5"],
  },
  {
    id: "5",
    name: "Langtang Valley Trek",
    city: "Rasuwa",
    country: "Nepal",
    price: 980,
    duration: "10 Days",
    difficulty: "Moderate",
    rating: 4.7,
    reviews: 97,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
      "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ],
    description:
      "Known as the valley of glaciers, Langtang offers an intimate trekking experience close to Kathmandu. Walk through dense forests, ancient Tamang villages, and high yak pastures with stunning views of Langtang Lirung.",
    maxElevation: "4,984m",
    groupSize: "2–12 People",
    bestSeason: "Mar–May, Oct–Nov",
    accommodation: "Teahouse",
    highlights: [
      { icon: "🧀", title: "Kyanjin Gompa", desc: "Visit the historic monastery and famous yak cheese factory." },
      { icon: "🦅", title: "Tserko Ri", desc: "Summit the peak for a panoramic Himalayan sunrise." },
    ],
    related: ["2", "1", "6"],
  },
  {
    id: "6",
    name: "Upper Mustang Expedition",
    city: "Mustang",
    country: "Nepal",
    price: 2400,
    duration: "14 Days",
    difficulty: "Moderate–Challenging",
    rating: 4.9,
    reviews: 62,
    image: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
      "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
    ],
    description:
      "Journey into the forbidden kingdom of Lo, a remote high-altitude desert closed to outsiders until 1992. Discover ancient cave monasteries, medieval walled cities, and a Tibetan culture preserved in isolation for centuries.",
    maxElevation: "3,840m",
    groupSize: "2–10 People",
    bestSeason: "May–Oct",
    accommodation: "Guesthouse / Camping",
    highlights: [
      { icon: "🏯", title: "Lo Manthang", desc: "Explore the walled capital of the ancient Lo Kingdom." },
      { icon: "🕌", title: "Cave Monasteries", desc: "Discover centuries-old murals in cliff-side caves." },
    ],
    related: ["2", "5", "1"],
  },
];

/** Mutable mock store so create/cancel update My Bookings without a real backend. */
let mockBookings = [
  {
    id: "b1",
    destinationId: "1",
    destinationName: "Annapurna Sanctuary",
    city: "Pokhara",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    startDate: "2025-03-15",
    endDate: "2025-03-27",
    status: "CONFIRMED",
    totalPrice: 1200,
  },
  {
    id: "b2",
    destinationId: "3",
    destinationName: "Kathmandu Cultural Tour",
    city: "Kathmandu",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80",
    startDate: "2025-05-10",
    endDate: "2025-05-15",
    status: "PENDING",
    totalPrice: 650,
  },
  {
    id: "b3",
    destinationId: "4",
    destinationName: "Lakeside Retreat",
    city: "Pokhara",
    image: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=400&q=80",
    startDate: "2024-11-20",
    endDate: "2024-11-24",
    status: "CANCELLED",
    totalPrice: 420,
  },
];

const delay = (ms = 600) => new Promise((res) => setTimeout(res, ms));

// ---------------------------------------------------------------------------
// Exported API functions
// ---------------------------------------------------------------------------

export async function getDestinations() {
  if (USE_MOCK) { await delay(); return MOCK_DESTINATIONS; }
  const res = await api.get("/api/destinations/");
  return res.data;
}

export async function getDestinationById(id) {
  if (USE_MOCK) {
    await delay();
    const dest = MOCK_DESTINATIONS.find((d) => d.id === String(id));
    if (!dest) throw Object.assign(new Error("Destination not found"), { status: 404 });
    return dest;
  }
  const res = await api.get(`/api/destinations/${id}/`);
  return res.data;
}

export async function createBooking(payload) {
  if (USE_MOCK) {
    await delay(800);
    const dest = MOCK_DESTINATIONS.find((d) => String(d.id) === String(payload.destinationId));
    const booking = {
      id: `b${Date.now()}`,
      destinationId: String(payload.destinationId),
      destinationName: payload.destinationName,
      city: payload.city,
      image: payload.image || dest?.image || "",
      startDate: payload.startDate,
      endDate: payload.endDate,
      status: "PENDING",
      totalPrice: Number(payload.totalPrice) || dest?.price || 0,
    };
    mockBookings = [booking, ...mockBookings];
    return booking;
  }
  const res = await api.post("/api/bookings/", payload);
  return res.data;
}

export async function getMyBookings() {
  if (USE_MOCK) {
    await delay();
    return mockBookings.map((b) => ({ ...b }));
  }
  const res = await api.get("/api/bookings/me/");
  return res.data;
}

export async function getBookingById(id) {
  if (USE_MOCK) {
    await delay();
    const booking = mockBookings.find((b) => String(b.id) === String(id));
    if (!booking) throw Object.assign(new Error("Booking not found"), { status: 404 });
    return { ...booking };
  }
  const res = await api.get(`/api/bookings/${id}/`);
  return res.data;
}

export async function cancelBooking(id) {
  if (USE_MOCK) {
    await delay(500);
    const idx = mockBookings.findIndex((b) => String(b.id) === String(id));
    if (idx === -1) throw Object.assign(new Error("Booking not found"), { status: 404 });
    mockBookings[idx] = { ...mockBookings[idx], status: "CANCELLED" };
    return { id: mockBookings[idx].id, status: "CANCELLED" };
  }
  const res = await api.patch(`/api/bookings/${id}/cancel/`);
  return res.data;
}

const MOCK_NAVIGATION = {
  "1": { startPoint: "Pokhara (Lakeside)", waypoints: ["Birethanti", "Chomrong", "Dovan", "Machapuchare Base Camp"], endPoint: "Annapurna Base Camp (4,130m)", distanceKm: 110, estimatedHours: 96 },
  "2": { startPoint: "Lukla Airport", waypoints: ["Namche Bazaar", "Tengboche", "Dingboche", "Lobuche"], endPoint: "Everest Base Camp (5,364m)", distanceKm: 130, estimatedHours: 144 },
  "3": { startPoint: "Tribhuvan Int'l Airport, Kathmandu", waypoints: ["Thamel", "Pashupatinath Temple", "Boudhanath Stupa", "Swayambhunath"], endPoint: "Patan Durbar Square", distanceKm: 25, estimatedHours: 20 },
  "4": { startPoint: "Pokhara Bus Station", waypoints: ["Phewa Lake", "Peace Stupa", "Gupteswar Cave"], endPoint: "Sarangkot Viewpoint", distanceKm: 18, estimatedHours: 8 },
  "5": { startPoint: "Syabrubesi (Rasuwa)", waypoints: ["Lama Hotel", "Langtang Village", "Kyanjin Gompa"], endPoint: "Tserko Ri Summit (4,984m)", distanceKm: 65, estimatedHours: 56 },
  "6": { startPoint: "Pokhara Airport", waypoints: ["Jomsom", "Kagbeni", "Charang", "Tsarang"], endPoint: "Lo Manthang (3,840m)", distanceKm: 185, estimatedHours: 80 },
};

export async function getNavigation(id) {
  if (USE_MOCK) {
    await delay(400);
    const nav = MOCK_NAVIGATION[String(id)];
    if (!nav) throw Object.assign(new Error("No route data available"), { status: 404 });
    return nav;
  }
  const res = await api.get(`/api/navigation/${id}/`);
  return res.data;
}

export default api;
