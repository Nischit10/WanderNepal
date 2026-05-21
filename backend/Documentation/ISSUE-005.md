# ISSUE-005: No Endpoint to List User's Own Bookings

## Issue Description
While users could create bookings via `/api/bookings/` (POST), there was no way for an authenticated user to retrieve a list of their own bookings via the same endpoint (GET).

## Changes Made
1.  **Modified `backend/api/views/booking.py`**:
    *   Added a `get` method to `BookingCreateView`.
    *   The `get` method filters `Booking` objects by the current authenticated user (`request.user`).
    *   Results are ordered by `created_at` in descending order.
    *   Uses `BookingSerializer` with `many=True` to return the list of bookings.
2.  **Updated `backend/api/tests_booking.py`**:
    *   Added `test_get_bookings_list` to verify that an authenticated request to `GET /api/bookings/` returns only the user's bookings.

## What to Expect
*   Authenticated users can now send a `GET` request to `/api/bookings/` to see their booking history.
*   The response will be a list of booking objects.
*   Example Response:
    ```json
    [
        {
            "id": 1,
            "destinationName": "Pokhara",
            "startDate": "2026-05-21",
            "endDate": "2026-05-24",
            "totalPrice": "150.00",
            "status": "CONFIRMED",
            ...
        }
    ]
    ```
