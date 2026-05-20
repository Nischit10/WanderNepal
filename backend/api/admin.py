from django.contrib import admin
from .models import User, Booking

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'full_name', 'is_staff', 'is_superuser')
    search_fields = ('email', 'full_name')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'destination', 'start_date', 'end_date', 'total_price', 'created_at')
    list_filter = ('start_date', 'end_date', 'destination')
    search_fields = ('user__email', 'destination__name')

