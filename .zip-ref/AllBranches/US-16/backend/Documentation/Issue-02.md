# Issue-02: Missing Rating Constraints on Destinations

## Description
The `rating` field in the `Destination` model was a `FloatField` without any validators. This allowed invalid values such as negative numbers or ratings greater than 5.0.

## Changes Made

### 1. Model Constraints
Updated `backend/api/models/destination.py` to include `MinValueValidator` and `MaxValueValidator` from `django.core.validators`.

```python
from django.core.validators import MinValueValidator, MaxValueValidator

# ... in Destination model
rating = models.FloatField(
    validators=[MinValueValidator(0.0), MaxValueValidator(5.0)]
)
```

### 2. Serializer Validation
The `DestinationSerializer` in `backend/api/serializers/destination.py` is a `ModelSerializer`, so it automatically inherits these validators. No explicit changes were needed in the serializer file.

### 3. Database Migration
Generated a new migration file `0006_alter_destination_rating.py` to reflect the changes in the database (although these validators are primarily enforced at the application/Django level, it's good practice to keep migrations in sync).

## Verification
Automated tests were added to `backend/api/tests.py` (`test_destination_rating_validation_low` and `test_destination_rating_validation_high`) to verify:
- The serializer's `is_valid()` method returns `False` for data with ratings outside [0, 5].
- The error response includes the `rating` field.

The model validation was also verified manually using `full_clean()` during development.
All tests passed after the implementation of the fixes.
