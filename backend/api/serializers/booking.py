from rest_framework import serializers
from api.models import Booking, Destination
from datetime import date

class BookingSerializer(serializers.ModelSerializer):
    destinationId = serializers.PrimaryKeyRelatedField(
        queryset=Destination.objects.all(), 
        source='destination'
    )
    startDate = serializers.DateField(source='start_date')
    endDate = serializers.DateField(source='end_date')
    totalPrice = serializers.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        source='total_price', 
        read_only=True
    )

    destinationName = serializers.CharField(source='destination.name', read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'destinationId', 'destinationName', 'startDate', 'endDate', 'totalPrice', 'status', 'created_at']
        read_only_fields = ['id', 'totalPrice', 'status', 'created_at']

    def validate(self, data):
        if data['start_date'] >= data['end_date']:
            raise serializers.ValidationError("End date must be after start date.")
        if data['start_date'] < date.today():
            raise serializers.ValidationError("Start date cannot be in the past.")

        # Check for overlapping bookings
        destination = data.get('destination')
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        
        overlapping_bookings = Booking.objects.filter(
            destination=destination,
            start_date__lte=end_date,
            end_date__gte=start_date
        )
        
        if overlapping_bookings.exists():
            raise serializers.ValidationError("This destination is unavailable for the selected dates.")

        return data

    def create(self, validated_data):
        destination = validated_data['destination']
        start_date = validated_data['start_date']
        end_date = validated_data['end_date']
        
        nights = (end_date - start_date).days
        total_price = destination.price_per_night * nights
        
        validated_data['total_price'] = total_price
        # User will be passed from the view
        return super().create(validated_data)
