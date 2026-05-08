from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from api.models import User, Destination, Booking
from datetime import date, timedelta
from rest_framework.authtoken.models import Token

class BookingTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='testuser@example.com',
            password='password123',
            full_name='Test User',
            username='testuser'
        )
        self.token = Token.objects.create(user=self.user)
        self.destination = Destination.objects.create(
            name='Pokhara',
            city='Pokhara',
            country='Nepal',
            description='City of lakes',
            image_url='http://example.com/image.jpg',
            price_per_night=50.00,
            category='Adventure',
            rating=4.5
        )
        self.url = reverse('bookings')

    def test_create_booking_success(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        start_date = date.today() + timedelta(days=1)
        end_date = date.today() + timedelta(days=4) # 3 nights
        
        data = {
            'destinationId': self.destination.id,
            'startDate': start_date.isoformat(),
            'endDate': end_date.isoformat()
        }
        
        response = self.client.post(self.url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(float(response.data['totalPrice']), 150.00)
        self.assertEqual(Booking.objects.count(), 1)
        booking = Booking.objects.first()
        self.assertEqual(booking.user, self.user)
        self.assertEqual(booking.destination, self.destination)

    def test_create_booking_unauthorized(self):
        data = {
            'destinationId': self.destination.id,
            'startDate': (date.today() + timedelta(days=1)).isoformat(),
            'endDate': (date.today() + timedelta(days=4)).isoformat()
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_booking_invalid_dates(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        data = {
            'destinationId': self.destination.id,
            'startDate': (date.today() + timedelta(days=5)).isoformat(),
            'endDate': (date.today() + timedelta(days=2)).isoformat()
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
