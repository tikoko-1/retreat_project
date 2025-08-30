import { Bed, Plus, Edit, Trash2 } from "lucide-react";

const accommodations = [
  {
    id: "1",
    name: "Garden Villa",
    capacity: "2-3 guests",
    size: "45 sqm",
    priceRange: "$180-220",
    amenities: ["Private terrace", "Garden view", "King bed", "Ensuite bathroom"],
    availability: "Available"
  },
  {
    id: "2", 
    name: "Deluxe Suite",
    capacity: "2 guests",
    size: "35 sqm",
    priceRange: "$150-180",
    amenities: ["Pool view", "Balcony", "Queen bed", "Rainfall shower"],
    availability: "Available"
  }
];

export default function AccommodationSection() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-light mb-2">Accommodation</h1>
            <p className="text-gray-600">Manage room types, pricing, and availability.</p>
          </div>
          <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            <Plus className="w-5 h-5" />
            Add Room Type
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {accommodations.map((room) => (
          <div key={room.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">{room.name}</h3>
                <p className="text-sm text-gray-600">{room.capacity} • {room.size}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-lg font-medium text-gray-900">{room.priceRange}/night</p>
              <p className="text-sm text-green-600">{room.availability}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}