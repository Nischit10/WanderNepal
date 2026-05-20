from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from api.models.destination import Destination
from api.serializers import DestinationSerializer

class DestinationPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class DestinationListView(generics.ListAPIView):
    queryset = Destination.objects.all().order_by('id')
    serializer_class = DestinationSerializer
    pagination_class = DestinationPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category', 'city', 'country']
    search_fields = ['name', 'description']

class DestinationDetailView(generics.RetrieveAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
