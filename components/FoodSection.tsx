import { IAmenity, IFoodDining } from "@/types";
import { Utensils, Leaf, Apple, Coffee, ChefHat, Clock, Users, Sparkles, Star } from "lucide-react";
import * as LucideIcons from "lucide-react";

function DynamicIcon({
  iconName,
  className,
}: {
  iconName: string;
  className?: string;
}) {
  const pascalCaseName = iconName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  const IconComponent = (LucideIcons as any)[pascalCaseName];
  if (!IconComponent) {
    return <Star className={className} />;
  }
  return <IconComponent className={className} />;
}

interface AmenitiesSectionProps {
  amenities: IAmenity[];
  foodDining: IFoodDining[];
}

export default function FoodSection({ amenities, foodDining }: AmenitiesSectionProps) {

  const foodAmenities = amenities.filter((a) => {
    const g = (a.group || '').toLowerCase();
    return g === 'food & dining';
  });

  return (
    <section className="py-16 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-5xl mb-6 font-light">Food & Dining</h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
            Nourish your body and soul with our carefully crafted meals. Our chef creates healthy,
            delicious cuisine using the finest organic ingredients from local Balinese farms,
            supporting both your wellness journey and the local community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {foodAmenities && foodAmenities.length > 0 && foodAmenities.map((a) => (
            <div
              key={a.id}
              className="flex items-start gap-4 py-4 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="text-gray-700 flex-shrink-0 mt-1">
                <DynamicIcon iconName={a.icon?.name || ''} className="w-[17.5px] h-[17.5px]" />
              </div>
              <div>
                <div className="font-medium mb-1">{a.name}</div>
                <div className="text-sm text-gray-600 whitespace-pre-line">{a.description}</div>
              </div>
            </div>
          ))}
        </div>

        {foodDining && foodDining.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-light mb-6">Sample Daily Menu</h3>
            <div className="grid md:grid-cols-3 gap-x-12 gap-y-6">
              {foodDining.map((meal, index) => (
                <div key={index}>
                  <h4 className="font-medium mb-3 text-gray-900 capitalize">{meal.meal_type}</h4>
                  {/* <p className="text-sm text-gray-600 mb-3">{meal.description}</p> */}
                  {meal.diet_options && meal.diet_options.length > 0 && (
                    <ul className="space-y-2 text-sm text-gray-600">
                      {meal.diet_options.map((option, optionIndex) => (
                        <li key={optionIndex}>• {option}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-6">
              *Menu items may vary based on seasonal availability and dietary requirements
            </p>
          </div>
        )}
      </div>
    </section>
  );
}