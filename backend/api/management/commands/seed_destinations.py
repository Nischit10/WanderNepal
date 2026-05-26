from django.core.management.base import BaseCommand
from api.models import Destination

class Command(BaseCommand):
    help = 'Seeds the database with 10+ destinations'

    def handle(self, *args, **kwargs):
        destinations = [
            {
                "name": "Phewa Lake",
                "city": "Pokhara",
                "country": "Nepal",
                "description": "A beautiful freshwater lake in Pokhara, famous for the reflection of Mount Machhapuchhre.",
                "image_url": "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
                "price_per_night": 45.00,
                "category": "Nature",
                "rating": 4.8
            },
            {
                "name": "Boudhanath Stupa",
                "city": "Kathmandu",
                "country": "Nepal",
                "description": "One of the largest spherical stupas in Nepal and the world.",
                "image_url": "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699",
                "price_per_night": 30.00,
                "category": "Culture",
                "rating": 4.9
            },
            {
                "name": "Everest Base Camp",
                "city": "Solukhumbu",
                "country": "Nepal",
                "description": "The gateway to the highest peak in the world.",
                "image_url": "https://images.unsplash.com/photo-1585141940905-189f383f9824",
                "price_per_night": 120.00,
                "category": "Adventure",
                "rating": 5.0
            },
            {
                "name": "Chitwan National Park",
                "city": "Chitwan",
                "country": "Nepal",
                "description": "A world heritage site known for its biodiversity and one-horned rhinos.",
                "image_url": "https://images.unsplash.com/photo-1605649440416-cc8a72a5a04a",
                "price_per_night": 65.00,
                "category": "Wildlife",
                "rating": 4.7
            },
            {
                "name": "Lumbini Garden",
                "city": "Lumbini",
                "country": "Nepal",
                "description": "The birthplace of Lord Buddha, a sacred site for Buddhists.",
                "image_url": "https://images.unsplash.com/photo-1623062362573-057a66b262f1",
                "price_per_night": 25.00,
                "category": "Religious",
                "rating": 4.8
            },
            {
                "name": "Nagarkot Sunrise View",
                "city": "Nagarkot",
                "country": "Nepal",
                "description": "Known for its views of the Himalayas, including Mount Everest.",
                "image_url": "https://images.unsplash.com/photo-1528484621453-d95c7401d2ce",
                "price_per_night": 55.00,
                "category": "Nature",
                "rating": 4.6
            },
            {
                "name": "Patan Durbar Square",
                "city": "Lalitpur",
                "country": "Nepal",
                "description": "A marvel of Newari architecture and a UNESCO World Heritage Site.",
                "image_url": "https://images.unsplash.com/photo-1536431311719-398b6704d4cc",
                "price_per_night": 40.00,
                "category": "History",
                "rating": 4.7
            },
            {
                "name": "Sarangkot Paragliding",
                "city": "Pokhara",
                "country": "Nepal",
                "description": "Famous for paragliding and sunrise views over the Annapurna range.",
                "image_url": "https://images.unsplash.com/photo-1623062362573-057a66b262f1",
                "price_per_night": 80.00,
                "category": "Adventure",
                "rating": 4.9
            },
            {
                "name": "Rara Lake",
                "city": "Mugu",
                "country": "Nepal",
                "description": "The largest and deepest freshwater lake in the Nepal Himalayas.",
                "image_url": "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
                "price_per_night": 75.00,
                "category": "Nature",
                "rating": 4.8
            },
            {
                "name": "Janaki Mandir",
                "city": "Janakpur",
                "country": "Nepal",
                "description": "A Hindu temple dedicated to the goddess Sita, built in Hindu-Koiri architecture.",
                "image_url": "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699",
                "price_per_night": 20.00,
                "category": "Religious",
                "rating": 4.6
            },
            {
                "name": "Ghorepani Poon Hill",
                "city": "Myagdi",
                "country": "Nepal",
                "description": "A popular trekking destination offering panoramic mountain views.",
                "image_url": "https://images.unsplash.com/photo-1585141940905-189f383f9824",
                "price_per_night": 50.00,
                "category": "Adventure",
                "rating": 4.8
            }
        ]

        for dest_data in destinations:
            Destination.objects.update_or_create(
                name=dest_data['name'],
                defaults=dest_data
            )
            self.stdout.write(self.style.SUCCESS(f'Successfully seeded {dest_data["name"]}'))

        self.stdout.write(self.style.SUCCESS('Successfully seeded all destinations'))
