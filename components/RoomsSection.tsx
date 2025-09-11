import { Users, Bed } from "lucide-react";
import { EPriceUnit, IRoom } from "@/types";


interface RoomsSectionProps {
  rooms?: IRoom[];
}
export default function RoomsSection({ rooms }: RoomsSectionProps) {
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
          {rooms?.map((room, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:border-gray-300 transition-colors flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-xl font-medium mb-4">{room.name}</h3>
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{room.capacity_max ? `${room.capacity_min ?? 0}-${room.capacity_max ?? 0}` : `${room.capacity_min ?? 0}+`} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4" />
                    <span>{room.size_sqft ?? 0} sqm</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-8">
                  {room.description}
                </p>
                <div className="mb-8">
                  <h4 className="font-medium text-sm text-gray-900 mb-4">Amenities included:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {room.amenities?.map((amenity, amenityIndex) => (
                      <div key={amenityIndex} className="text-xs text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-6 ">
                <div className="text-2xl font-light text-gray-900 mb-2">{room.currency}{room.price_min ?? 0}-{room.price_max ?? 0} {room.billing_unit == EPriceUnit.PerNight ? '/ night' : room.billing_unit == EPriceUnit.PerPerson ? '/ person' : room.billing_unit == EPriceUnit.Weekend ? '/ weekend' : room.billing_unit == EPriceUnit.Week ? '/ week' : ''}</div>
                <div className="text-sm text-gray-500">{room.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}