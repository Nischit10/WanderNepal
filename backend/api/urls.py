from django.urls import path
from .views import SignupView, SigninView, DestinationListView, DestinationDetailView, BookingCreateView, UserBookingListView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('signin/', SigninView.as_view(), name='signin'),
    path('destinations/', DestinationListView.as_view(), name='destinations'),
    path('destinations/<int:pk>/', DestinationDetailView.as_view(), name='destination-detail'),
    path('bookings/', BookingCreateView.as_view(), name='bookings'),
    path('bookings/me/', UserBookingListView.as_view(), name='my-bookings'),
]
