from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api.models.destination import Destination

class DestinationTests(APITestCase):
    def setUp(self):
        self.destination = Destination.objects.create(
            name="Pokhara",
            city="Pokhara",
            country="Nepal",
            description="Beautiful lake city",
            image_url="http://example.com/image.jpg",
            price_per_night=50.00,
            category="Nature",
            rating=4.5
        )

    def test_get_destination_list(self):
        url = reverse('destinations')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # With pagination, response.data is a dict with 'count', 'next', 'previous', 'results'
        self.assertEqual(len(response.data['results']), 1)
        self.assertIn('count', response.data)
        self.assertIn('next', response.data)
        self.assertIn('previous', response.data)

    def test_search_destination(self):
        url = reverse('destinations') + '?search=Pokhara'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], "Pokhara")

    def test_filter_destination_category(self):
        url = reverse('destinations') + '?category=Nature'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['category'], "Nature")

    def test_filter_destination_category_no_match(self):
        url = reverse('destinations') + '?category=Beach'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)

    def test_get_destination_detail_valid(self):
        url = reverse('destination-detail', kwargs={'pk': self.destination.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Pokhara")

    def test_get_destination_detail_invalid(self):
        url = reverse('destination-detail', kwargs={'pk': 999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_destination_rating_validation_low(self):
        """Test that a rating below 0 is invalid in the serializer."""
        data = {
            "name": "Invalid", "city": "Test", "country": "Test", "description": "Test",
            "image_url": "http://test.com", "price_per_night": 10, "category": "Test",
            "rating": -1.0
        }
        from api.serializers.destination import DestinationSerializer
        serializer = DestinationSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('rating', serializer.errors)

    def test_destination_rating_validation_high(self):
        """Test that a rating above 5 is invalid in the serializer."""
        data = {
            "name": "Invalid", "city": "Test", "country": "Test", "description": "Test",
            "image_url": "http://test.com", "price_per_night": 10, "category": "Test",
            "rating": 6.0
        }
        from api.serializers.destination import DestinationSerializer
        serializer = DestinationSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('rating', serializer.errors)
