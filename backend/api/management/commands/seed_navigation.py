from django.core.management.base import BaseCommand
from api.models import Destination, Navigation

ROUTES = {
    "Kathmandu Valley Heritage Tour": {
        "start_point": "Tribhuvan International Airport, Kathmandu",
        "waypoints": ["Thamel", "Swayambhunath", "Pashupatinath", "Boudhanath", "Patan Durbar Square"],
        "end_point": "Bhaktapur Durbar Square",
        "estimated_time_minutes": 1200,
        "distance_km": 45.0,
    },
    "Annapurna Circuit Trek": {
        "start_point": "Besisahar, Lamjung",
        "waypoints": ["Chame", "Manang", "Thorong Phedi", "Muktinath", "Jomsom"],
        "end_point": "Nayapul, Pokhara",
        "estimated_time_minutes": 8640,
        "distance_km": 160.0,
    },
    "Chitwan Safari Experience": {
        "start_point": "Bharatpur / Sauraha",
        "waypoints": ["Elephant Breeding Centre", "Rapti River canoe", "Jungle walk", "Tharu village"],
        "end_point": "Chitwan National Park HQ",
        "estimated_time_minutes": 480,
        "distance_km": 35.0,
    },
    "Everest Base Camp Trek": {
        "start_point": "Lukla Airport",
        "waypoints": ["Namche Bazaar", "Tengboche", "Dingboche", "Lobuche"],
        "end_point": "Everest Base Camp (5,364m)",
        "estimated_time_minutes": 8640,
        "distance_km": 130.0,
    },
    "Phewa Lake Retreat": {
        "start_point": "Pokhara Lakeside",
        "waypoints": ["Phewa Lake boat", "World Peace Pagoda", "Devi's Fall"],
        "end_point": "Sarangkot viewpoint",
        "estimated_time_minutes": 360,
        "distance_km": 18.0,
    },
}


class Command(BaseCommand):
    help = "Seeds navigation routes for destinations"

    def handle(self, *args, **kwargs):
        for name, route in ROUTES.items():
            try:
                destination = Destination.objects.get(name=name)
            except Destination.DoesNotExist:
                self.stdout.write(self.style.WARNING(f"Skipped (no destination): {name}"))
                continue

            Navigation.objects.update_or_create(
                destination=destination,
                defaults=route,
            )
            self.stdout.write(self.style.SUCCESS(f"Navigation: {name}"))

        self.stdout.write(self.style.SUCCESS("Navigation seeding complete."))
