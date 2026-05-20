from django.urls import path
from .views import (
    SignupView, SigninView, BookingCreateView, UserBookingListView, BookingDetailView, BookingCancelView
)

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('signin/', SigninView.as_view(), name='signin'),
    path('bookings/', BookingCreateView.as_view(), name='bookings'),
    path('bookings/me/', UserBookingListView.as_view(), name='my-bookings'),
    path('bookings/<int:pk>/', BookingDetailView.as_view(), name='booking-detail'),
    path('bookings/<int:pk>/cancel/', BookingCancelView.as_view(), name='booking-cancel'),
]

