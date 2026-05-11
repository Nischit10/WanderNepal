from django.db import models

class Destination(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    description = models.TextField()
    image_url = models.URLField()
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)
    rating = models.FloatField()

    def __str__(self):
        return self.name
