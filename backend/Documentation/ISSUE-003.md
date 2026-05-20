# ISSUE-003: Missing Pagination for Destination List

## Issue Description
The `/api/destinations/` endpoint returned all destinations in a single array. This could lead to performance issues as the number of destinations grows.

## Changes Made
1.  **Modified `backend/api/views/destination.py`**:
    *   Defined `DestinationPagination` class inheriting from `PageNumberPagination`.
    *   Set default `page_size` to 10.
    *   Enabled `page_size_query_param` so clients can request different page sizes (up to 100).
    *   Applied `DestinationPagination` to `DestinationListView`.
    *   Added explicit ordering (`.order_by('id')`) to the queryset to ensure consistent pagination and avoid Django warnings.
2.  **Updated `backend/api/tests.py`**:
    *   Updated `test_get_destination_list` to handle the new paginated response format (expecting `count`, `next`, `previous`, and `results` keys).

## What to Expect
*   The `/api/destinations/` endpoint now returns a paginated response.
*   Response format:
    ```json
    {
        "count": 1,
        "next": null,
        "previous": null,
        "results": [
            {
                "id": 1,
                "name": "Pokhara",
                ...
            }
        ]
    }
    ```
*   Query parameters `page` and `page_size` can be used to navigate through results.
