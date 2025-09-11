import { IAmenity } from "@/types";
import DynamicIcon from "./ui/dynamic-icon";

interface AmenitiesSectionProps {
  amenities: IAmenity[];
}
export default function FeaturesSection({ amenities }: AmenitiesSectionProps) {

  const filtered = (amenities || []).filter(a => a.group !== 'Food & Dining');
  const grouped = filtered.reduce<Record<string, IAmenity[]>>((acc, a) => {
    const key = a.group || 'Other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(a);
    return acc;
  }, {});

  return (
    <section className="py-16 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <div className="block md:hidden">
            <h2 className="text-3xl font-light mb-4">What this place offers</h2>
            {/* <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black border-b border-gray-300 hover:border-black transition-colors">
              <Download className="w-4 h-4" />
              Download full amenities PDF
            </button> */}
          </div>

          <div className="hidden md:flex items-center justify-between">
            <h2 className="text-3xl lg:text-5xl font-light">What this place offers</h2>
            {/* <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black border-b border-gray-300 hover:border-black transition-colors">
              <Download className="w-4 h-4" />
              Download full amenities PDF
            </button> */}
          </div>
        </div>

        {Object.entries(grouped).map(([groupName, items], index) => (
          <div key={groupName} className={index !== Object.entries(grouped).length - 1 ? 'mb-12' : ''}>
            <h3 className="text-2xl mb-6 font-light">{groupName}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((amenity) => (
                <div
                  key={amenity.id}
                  className="flex items-start gap-4 py-4 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="text-gray-700 flex-shrink-0 mt-1">
                    <DynamicIcon
                      iconName={amenity.icon?.name ?? ''}
                      className="w-[17.5px] h-[17.5px]"
                    />
                  </div>
                  <div>
                    <div className="font-medium mb-1">{amenity.name}</div>
                    <div className="text-sm text-gray-600">{amenity.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}