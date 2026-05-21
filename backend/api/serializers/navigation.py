from rest_framework import serializers
from api.models.navigation import Navigation

class NavigationSerializer(serializers.ModelSerializer):
    startPoint = serializers.CharField(source='start_point')
    endPoint = serializers.CharField(source='end_point')
    estimatedTimeMinutes = serializers.IntegerField(source='estimated_time_minutes')
    distanceKm = serializers.FloatField(source='distance_km')

    class Meta:
        model = Navigation
        fields = ['startPoint', 'waypoints', 'endPoint', 'estimatedTimeMinutes', 'distanceKm']
