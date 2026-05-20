from django.core.management.base import BaseCommand
from api.models import Destination

# Affordable per-night rates (USD). Display "from" price = rate × typical nights in frontend mapper.
DESTINATIONS = [
    {
        "name": "Kathmandu Valley Heritage Tour",
        "city": "Kathmandu",
        "country": "Nepal",
        "description": "Explore UNESCO World Heritage sites across Kathmandu, Patan, and Bhaktapur — temples, stupas, and living Newari culture.",
        "image_url": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        "price_per_night": 18.00,
        "category": "Culture",
        "rating": 4.9,
    },
    {
        "name": "Annapurna Circuit Trek",
        "city": "Myagdi",
        "country": "Nepal",
        "description": "Classic Himalayan circuit through rhododendron forests, Thorong La pass, and Annapurna massif viewpoints.",
        "image_url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        "price_per_night": 35.00,
        "category": "Adventure",
        "rating": 4.8,
    },
    {
        "name": "Chitwan Safari Experience",
        "city": "Chitwan",
        "country": "Nepal",
        "description": "Jungle safari in Chitwan National Park — rhinos, elephants, canoe rides, and Tharu village culture.",
        "image_url": "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
        "price_per_night": 25.00,
        "category": "Wildlife",
        "rating": 4.7,
    },
    {
        "name": "Phewa Lake Retreat",
        "city": "Pokhara",
        "country": "Nepal",
        "description": "Relax by Phewa Lake with Annapurna views, boat rides, and lakeside cafés.",
        "image_url": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
        "price_per_night": 22.00,
        "category": "Nature",
        "rating": 4.8,
    },
    {
        "name": "Boudhanath & Pashupatinath",
        "city": "Kathmandu",
        "country": "Nepal",
        "description": "Sacred Hindu and Buddhist sites in the Kathmandu Valley.",
        "image_url": "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80",
        "price_per_night": 15.00,
        "category": "Culture",
        "rating": 4.9,
    },
    {
        "name": "Everest Base Camp Trek",
        "city": "Solukhumbu",
        "country": "Nepal",
        "description": "Trek to the foot of the world's highest peak through Sherpa villages and Khumbu glaciers.",
        "image_url": "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
        "price_per_night": 55.00,
        "category": "Adventure",
        "rating": 5.0,
    },
    {
        "name": "Lumbini Pilgrimage",
        "city": "Lumbini",
        "country": "Nepal",
        "description": "Visit the birthplace of Lord Buddha and peaceful monastic zones.",
        "image_url": "https://images.unsplash.com/photo-1623062362573-057a66b262f1?w=800&q=80",
        "price_per_night": 12.00,
        "category": "Religious",
        "rating": 4.8,
    },
    {
        "name": "Nagarkot Sunrise Trek",
        "city": "Nagarkot",
        "country": "Nepal",
        "description": "Short escape for Himalayan sunrise views over the Kathmandu Valley.",
        "image_url": "https://images.unsplash.com/photo-1528484621453-d95c7401d2ce?w=800&q=80",
        "price_per_night": 20.00,
        "category": "Nature",
        "rating": 4.6,
    },
    {
        "name": "Patan Durbar Square",
        "city": "Lalitpur",
        "country": "Nepal",
        "description": "Newari architecture and royal palace courtyards in Patan.",
        "image_url": "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&q=80",
        "price_per_night": 16.00,
        "category": "History",
        "rating": 4.7,
    },
    {
        "name": "Sarangkot Paragliding",
        "city": "Pokhara",
        "country": "Nepal",
        "description": "Paragliding and sunrise views over the Annapurna range from Sarangkot.",
        "image_url": "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80",
        "price_per_night": 40.00,
        "category": "Adventure",
        "rating": 4.9,
    },
    {
        "name": "Ghorepani Poon Hill",
        "city": "Myagdi",
        "country": "Nepal",
        "description": "Short trek with panoramic Annapurna and Dhaulagiri views from Poon Hill.",
        "image_url": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
        "price_per_night": 28.00,
        "category": "Adventure",
        "rating": 4.8,
    },
    {
        "name": "Rara Lake Escape",
        "city": "Mugu",
        "country": "Nepal",
        "description": "Remote alpine lake in far-west Nepal — pristine wilderness and quiet trails.",
        "image_url": "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&q=80",
        "price_per_night": 32.00,
        "category": "Nature",
        "rating": 4.8,
    },
]


class Command(BaseCommand):
    help = "Seeds destinations with affordable Nepal tour packages"

    def handle(self, *args, **kwargs):
        for dest_data in DESTINATIONS:
            Destination.objects.update_or_create(
                name=dest_data["name"],
                defaults=dest_data,
            )
            self.stdout.write(self.style.SUCCESS(f"Seeded: {dest_data['name']}"))

        self.stdout.write(self.style.SUCCESS("All destinations seeded."))
