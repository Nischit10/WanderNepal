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
        self.assertEqual(len(response.data), 1)

    def test_get_destination_detail_valid(self):
        url = reverse('destination-detail', kwargs={'pk': self.destination.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Pokhara")

    def test_get_destination_detail_invalid(self):
        url = reverse('destination-detail', kwargs={'pk': 999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
