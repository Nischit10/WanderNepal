# Issue Fix: Overlapping Bookings (ISSUE-001)

## Description
The system previously allowed multiple bookings for the same destination on overlapping dates, leading to double booking.

## Changes Made
- Modified `backend/api/serializers/booking.py` to add validation logic in the `validate` method.
- Implemented the overlap check using the formula: `(start1 <= end2) AND (end1 >= start2)`.
- The validation now queries existing `Booking` records for the same destination and checks if any overlap with the requested `startDate` and `endDate`.
- If an overlap is detected, a `serializers.ValidationError` is raised with the message: "This destination is unavailable for the selected dates."

## Verification Results
- Created a reproduction test file `backend/api/tests_overlap.py`.
- **Initial run:** Failed (overlapping booking was allowed, returning 201 Created).
- **Post-fix run:** Passed (overlapping booking returned 400 Bad Request).
- Ran all existing tests in `backend/api/tests_booking.py`, and all 5 tests passed successfully.

## Validation Logic Detail
```python
        overlapping_bookings = Booking.objects.filter(
            destination=destination,
            start_date__lte=end_date,
            end_date__gte=start_date
        )
```
This query efficiently identifies any record where the existing booking's duration overlaps with the requested range.
