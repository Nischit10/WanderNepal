# WanderNepal API Documentation Guide

This guide provides an overview of the WanderNepal backend API to assist with frontend integration.

## Base URL
The local development server runs at:
`http://localhost:8000/api/`

## Authentication
Most booking-related endpoints require Token Authentication. 

1. **Get Token:** Use the `/signin/` endpoint with your credentials.
2. **Use Token:** Include the token in the `Authorization` header for protected requests:
   ```http
   Authorization: Token your_generated_token_here
   ```

---

## Endpoints Overview

### 1. Authentication
*   **POST** `/signup/`: Create a new user account.
*   **POST** `/signin/`: Authenticate and receive an API token.

### 2. Destinations
*   **GET** `/destinations/`: List all destinations. 
    *   *Query Params:* `category`, `search`, `city`, `country`.
    *   *Pagination:* Supported via `page` and `page_size`.
*   **GET** `/destinations/{id}/`: Retrieve details for a specific destination.

### 3. Bookings (Authentication Required)
*   **POST** `/bookings/`: Create a new booking for a destination.
*   **GET** `/bookings/me/`: List all bookings for the authenticated user.
*   **GET** `/bookings/{id}/`: View details of a specific booking.
*   **PATCH** `/bookings/{id}/cancel/`: Cancel an existing booking.

### 4. Navigation
*   **GET** `/navigation/{destination_id}/`: Get route and travel information for a destination.

---

## Using the Postman Collection
A full Postman collection is available in this folder: `WanderNepal_API.postman_collection.json`.

1. Open Postman.
2. Click **Import**.
3. Drag and drop the `.json` file.
4. Set the `base_url` collection variable if your server is running on a different port.
5. After signing in, update the `token` variable to test protected endpoints.

---
*Last Updated: May 20, 2026*
