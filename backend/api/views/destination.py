from rest_framework import generics
from api.models.destination import Destination
from api.serializers import DestinationSerializer

class DestinationListView(generics.ListAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer

class DestinationDetailView(generics.RetrieveAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
