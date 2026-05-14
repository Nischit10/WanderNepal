from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from api.models import Destination, Navigation

class NavigationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
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
        self.navigation = Navigation.objects.create(
            destination=self.destination,
            start_point='Kathmandu',
            waypoints=['Nagarkot', 'Kurintar'],
            end_point='Pokhara',
            estimated_time_minutes=360,
            distance_km=200.5
        )

    def test_get_navigation_success(self):
        url = reverse('navigation', kwargs={'destination_id': self.destination.id})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['startPoint'], 'Kathmandu')
        self.assertEqual(response.data['waypoints'], ['Nagarkot', 'Kurintar'])
        self.assertEqual(response.data['endPoint'], 'Pokhara')
        self.assertEqual(response.data['estimatedTimeMinutes'], 360)
        self.assertEqual(response.data['distanceKm'], 200.5)

    def test_get_navigation_destination_not_found(self):
        url = reverse('navigation', kwargs={'destination_id': 999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_navigation_route_not_found(self):
        destination_without_nav = Destination.objects.create(
            name='Kathmandu',
            city='Kathmandu',
            country='Nepal',
            description='Capital',
            image_url='http://example.com/ktm.jpg',
            price_per_night=40.00,
            category='Culture',
            rating=4.8
        )
        url = reverse('navigation', kwargs={'destination_id': destination_without_nav.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
