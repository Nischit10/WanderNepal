# ISSUE-004: Missing Search and Filtering for Destinations

## Issue Description
There was no way to search for a destination by name or filter by category, city, or country via the API. Users had to fetch all destinations and filter them on the client side.

## Changes Made
1.  **Installed Dependency**:
    *   Installed `django-filter` to support advanced filtering in Django REST Framework.
2.  **Modified `backend/core/settings/base.py`**:
    *   Added `django_filters` to `INSTALLED_APPS`.
3.  **Modified `backend/api/views/destination.py`**:
    *   Imported `filters` from `rest_framework` and `DjangoFilterBackend` from `django_filters.rest_framework`.
    *   Added `DjangoFilterBackend` and `filters.SearchFilter` to `filter_backends` in `DestinationListView`.
    *   Configured `filterset_fields` to allow filtering by `category`, `city`, and `country`.
    *   Configured `search_fields` to allow searching by `name` and `description`.
4.  **Updated `backend/api/tests.py`**:
    *   Added `test_search_destination` to verify search by name.
    *   Added `test_filter_destination_category` to verify filtering by category.
    *   Added `test_filter_destination_category_no_match` to verify filtering returns empty results when no match is found.

## What to Expect
*   The `/api/destinations/` endpoint now supports search and filtering via query parameters.
*   **Search**: `/api/destinations/?search=Pokhara` (searches in name and description).
*   **Filtering**:
    *   `/api/destinations/?category=Nature`
    *   `/api/destinations/?city=Pokhara`
    *   `/api/destinations/?country=Nepal`
*   Combined: `/api/destinations/?category=Nature&search=lake`
