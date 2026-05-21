from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from api.models.navigation import Navigation
from api.models.destination import Destination
from api.serializers.navigation import NavigationSerializer

class NavigationView(APIView):
    def get(self, request, destination_id):
        # Ensure destination exists
        destination = get_object_or_404(Destination, pk=destination_id)
        
        # Ensure navigation exists for this destination
        navigation = get_object_or_404(Navigation, destination=destination)
        
        serializer = NavigationSerializer(navigation)
        return Response(serializer.data, status=status.HTTP_200_OK)
