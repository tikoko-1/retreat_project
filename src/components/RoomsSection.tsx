import { Users, Bed, Bath, Wifi, AirVent, Flower } from "lucide-react";

interface Room {
  name: string;
  capacity: string;
  size: string;
  description: string;
  amenities: string[];
  priceRange: string;
}

const rooms: Room[] = [
  {
    name: "Garden Villa",
    capacity: "2-3 guests",
    size: "45 sqm",
    description: "Spacious villa with private garden terrace and jungle views. Features traditional Balinese architecture with modern amenities.",
    amenities: ["Private terrace", "Garden view", "King bed", "Ensuite bathroom", "Air conditioning", "Mini fridge"],
    priceRange: "$180-220 / night"
  },
  {
    name: "Deluxe Suite",
    capacity: "2 guests",
    size: "35 sqm", 
    description: "Elegant suite with infinity pool views and premium furnishings. Perfect for couples seeking luxury and tranquility.",
    amenities: ["Pool view", "Balcony", "Queen bed", "Rainfall shower", "Smart TV", "Coffee station"],
    priceRange: "$150-180 / night"
  },
  {
    name: "Yoga Retreat Room",
    capacity: "1-2 guests",
    size: "30 sqm",
    description: "Minimalist design focused on peace and meditation. Includes dedicated yoga space and meditation corner.",
    amenities: ["Yoga area", "Meditation corner", "Twin beds", "Natural lighting", "Sound isolation", "Essential oils"],
    priceRange: "$120-150 / night"
  },
  {
    name: "Family Pavilion",
    capacity: "4-6 guests",
    size: "65 sqm",
    description: "Two-bedroom pavilion ideal for families or small groups. Includes shared living area and private outdoor space.",
    amenities: ["2 bedrooms", "Living area", "Private garden", "2 bathrooms", "Kitchenette", "Dining space"],
    priceRange: "$280-350 / night"
  },
  {
    name: "Jungle Bungalow",
    capacity: "2 guests",
    size: "25 sqm",
    description: "Intimate bungalow nestled deep in the jungle canopy. Features open-air design and natural ventilation.",
    amenities: ["Jungle immersion", "Open-air design", "Queen bed", "Outdoor shower", "Natural ventilation", "Bird watching"],
    priceRange: "$100-130 / night"
  },
  {
    name: "Master Suite",
    capacity: "2-4 guests",
    size: "55 sqm",
    description: "Our most luxurious accommodation with panoramic views and premium spa amenities. Includes private butler service.",
    amenities: ["Panoramic views", "Private butler", "King bed + sofa bed", "Spa bathroom", "Private deck", "Premium amenities"],
    priceRange: "$300-400 / night"
  }
];

export default function RoomsSection() {
  return (
    <section className="py-16 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-5xl mb-6 font-light">Accommodation Options</h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
            Choose from our thoughtfully designed rooms and suites, each offering a unique perspective on comfort, 
            tranquility, and connection with nature. All accommodations include organic amenities and daily housekeeping.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:border-gray-300 transition-colors">
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">{room.name}</h3>
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4" />
                    <span>{room.size}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {room.description}
                </p>
              </div>

              <div className="mb-8">
                <h4 className="font-medium text-sm text-gray-900 mb-4">Amenities included:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {room.amenities.map((amenity, amenityIndex) => (
                    <div key={amenityIndex} className="text-xs text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="text-2xl font-light text-gray-900 mb-2">{room.priceRange}</div>
                <div className="text-sm text-gray-500">Rates vary by season and booking length</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}