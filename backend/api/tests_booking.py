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

    def test_get_bookings_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        Booking.objects.create(
            user=self.user,
            destination=self.destination,
            start_date=date.today() + timedelta(days=1),
            end_date=date.today() + timedelta(days=2),
            total_price=50.00
        )
        url = reverse('bookings')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

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

    def test_get_my_bookings(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        
        # Create two bookings
        Booking.objects.create(
            user=self.user,
            destination=self.destination,
            start_date=date.today() + timedelta(days=1),
            end_date=date.today() + timedelta(days=2),
            total_price=50.00
        )
        
        another_destination = Destination.objects.create(
            name='Kathmandu',
            city='Kathmandu',
            country='Nepal',
            description='Capital city',
            image_url='http://example.com/kathmandu.jpg',
            price_per_night=40.00,
            category='Culture',
            rating=4.8
        )
        
        Booking.objects.create(
            user=self.user,
            destination=another_destination,
            start_date=date.today() + timedelta(days=5),
            end_date=date.today() + timedelta(days=7),
            total_price=80.00
        )
        
        url = reverse('my-bookings')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        # Check if destinationName is present
        self.assertTrue('destinationName' in response.data[0])
        # The latest booking (created_at descending) should be first
        self.assertEqual(response.data[0]['destinationName'], 'Kathmandu')
        self.assertEqual(response.data[1]['destinationName'], 'Pokhara')

    def test_get_my_bookings_unauthorized(self):
        url = reverse('my-bookings')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_booking_detail_success(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        booking = Booking.objects.create(
            user=self.user,
            destination=self.destination,
            start_date=date.today() + timedelta(days=1),
            end_date=date.today() + timedelta(days=2),
            total_price=50.00
        )
        url = reverse('booking-detail', kwargs={'pk': booking.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], booking.id)
        self.assertEqual(response.data['status'], 'CONFIRMED')

    def test_get_booking_detail_forbidden(self):
        other_user = User.objects.create_user(
            email='other@example.com',
            password='password123',
            full_name='Other User',
            username='otheruser'
        )
        booking = Booking.objects.create(
            user=other_user,
            destination=self.destination,
            start_date=date.today() + timedelta(days=1),
            end_date=date.today() + timedelta(days=2),
            total_price=50.00
        )
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse('booking-detail', kwargs={'pk': booking.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cancel_booking_success(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        booking = Booking.objects.create(
            user=self.user,
            destination=self.destination,
            start_date=date.today() + timedelta(days=1),
            end_date=date.today() + timedelta(days=2),
            total_price=50.00
        )
        url = reverse('booking-cancel', kwargs={'pk': booking.id})
        response = self.client.patch(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'CANCELLED')
        booking.refresh_from_db()
        self.assertEqual(booking.status, 'CANCELLED')

    def test_cancel_booking_forbidden(self):
        other_user = User.objects.create_user(
            email='other2@example.com',
            password='password123',
            full_name='Other User 2',
            username='otheruser2'
        )
        booking = Booking.objects.create(
            user=other_user,
            destination=self.destination,
            start_date=date.today() + timedelta(days=1),
            end_date=date.today() + timedelta(days=2),
            total_price=50.00
        )
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = reverse('booking-cancel', kwargs={'pk': booking.id})
        response = self.client.patch(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        booking.refresh_from_db()
        self.assertEqual(booking.status, 'CONFIRMED')
