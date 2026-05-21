from django.db import models
from .destination import Destination

class Navigation(models.Model):
    destination = models.OneToOneField(Destination, on_delete=models.CASCADE, related_name='navigation')
    start_point = models.CharField(max_length=255)
    waypoints = models.JSONField(default=list)
    end_point = models.CharField(max_length=255)
    estimated_time_minutes = models.IntegerField()
    distance_km = models.FloatField()

    def __str__(self):
        return f"Navigation for {self.destination.name}"
