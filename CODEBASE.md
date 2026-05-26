# WanderNepal - Full Codebase Documentation

This document provides a comprehensive overview of the WanderNepal project, detailing the architecture, features, and implementation of both the frontend and backend.

---

## 1. Project Overview
WanderNepal is a full-stack travel booking application designed for exploring Nepal. It allows users to browse destinations, view detailed itineraries (including navigation info), book trips, and manage their profile and bookings.

---

## 2. Technology Stack

### Backend
- **Framework:** Django 6.0 (Python 3.14+)
- **API Framework:** Django REST Framework (DRF)
- **Database:** SQLite (Development) / MySQL (Configured for Production)
- **Authentication:** Token-based authentication (DRF Token)

### Frontend
- **Framework:** React 19+
- **Routing:** React Router v7
- **Styling:** Vanilla CSS (Global and Component-level)
- **State Management:** React Context API (AuthContext)
- **API Client:** Axios

---

## 3. Backend Architecture (Django)

The backend is organized into a main core project (`core/`) and a primary application (`api/`).

### Models (`backend/api/models/`)
- **User:** Custom user model extending `AbstractUser`, using `email` as the primary identifier.
- **Destination:** Stores travel destinations with details like name, city, country, price per night, rating, category, and images.
- **Booking:** Tracks user reservations, including start/end dates, total price, and status (PENDING, CONFIRMED, CANCELLED).
- **Navigation:** (Partial) Stores route information (start, end, waypoints, distance, time) linked to a Destination.

### Features & API Endpoints (`backend/api/urls.py`)

#### Authentication
- `POST /api/signup/`: Register a new user.
- `POST /api/signin/`: Login and receive a DRF Token.

#### Destinations
- `GET /api/destinations/`: List all available destinations.
- `GET /api/destinations/<id>/`: Retrieve details for a specific destination.

#### Bookings
- `POST /api/bookings/`: Create a new trip booking.
- `GET /api/bookings/me/`: List all bookings for the authenticated user.
- `GET /api/bookings/<id>/`: Retrieve details of a specific booking.
- `PATCH /api/bookings/<id>/cancel/`: Cancel an existing booking.

---

## 4. Frontend Architecture (React)

The frontend is a single-page application (SPA) with protected routes and dynamic data fetching.

### Routing (`frontend/src/App.js`)

#### Public Pages
- **Landing Page (`/`):** Hero section with featured destinations.
- **Destinations Page (`/destinations`):** Search and filter all available trips.
- **Destination Detail (`/destinations/:id`):** Full itinerary, pricing, and navigation map.
- **Auth Pages (`/signup`, `/signin`):** User registration and login.
- **Static Pages:** About, Privacy, Terms, Contact.

#### Protected Pages (Require Login)
- **Dashboard (`/dashboard`):** User overview with quick access to bookings and profile.
- **My Bookings (`/bookings`):** List of all current and past reservations.
- **Booking Form (`/booking/:id`):** Calendar-based booking interface for a destination.
- **Booking Detail (`/bookings/:id`):** Status and summary of a specific booking.
- **Profile (`/profile`):** User personal information and settings.

### Services (`frontend/src/services/api.js`)
Handles all communication with the Django API, including:
- **Interceptors:** Automatically adds the `Authorization: Token <key>` header to requests.
- **Mappers:** Transforms Django's snake_case data into camelCase objects for easier React consumption.
- **Error Handling:** Centralized parsing of API error responses.

---

## 5. Key Workflows

### User Authentication
1. User submits credentials via `LoginPage.js`.
2. `AuthContext` calls the sign-in API and stores the token in `localStorage`.
3. The app redirects to the `/dashboard`.
4. Subsequent requests use the stored token via Axios interceptors.

### Booking a Trip
1. User selects a destination from `DestinationsPage.js`.
2. On `DestinationDetailPage.js`, user clicks "Book Now".
3. `BookingFormPage.js` calculates the total price based on selected dates and `price_per_night`.
4. API call creates a `Booking` record with `status: CONFIRMED`.

---

## 6. Directory Structure
```text
WanderNepal/
├── backend/            # Django Project
│   ├── api/            # Main application logic (models, views, serializers)
│   ├── core/           # Project configuration (settings, urls)
│   └── Documentation/  # Feature-specific docs
├── frontend/           # React Project
│   ├── src/
│   │   ├── components/ # Reusable UI components (Navbar, Footer)
│   │   ├── context/    # Global state (Auth)
│   │   ├── pages/      # Route-level components
│   │   └── services/   # API integration
└── docs/               # API Collections and Guides
```
