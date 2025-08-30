import { Utensils, Leaf, Apple, Coffee, ChefHat, Clock, Users, Sparkles } from "lucide-react";

export default function FoodSection() {
  const foodOptions = [
    {
      icon: <Leaf className="w-5 h-5" />,
      title: "Organic & Local",
      description: "Farm-to-table ingredients sourced locally\nSupporting Balinese farmers and communities"
    },
    {
      icon: <Apple className="w-5 h-5" />,
      title: "Dietary Accommodations",
      description: "Vegetarian, vegan, gluten-free options\nCustomized menus for specific requirements"
    },
    {
      icon: <ChefHat className="w-5 h-5" />,
      title: "Professional Chef",
      description: "Experienced in wellness cuisine\nTraditional Balinese and international dishes"
    },
    {
      icon: <Coffee className="w-5 h-5" />,
      title: "All-Day Refreshments",
      description: "Herbal teas, fresh juices, healthy snacks\nPurified water throughout the property"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Flexible Meal Times",
      description: "Breakfast: 7:00-9:30 AM\nLunch: 12:00-2:00 PM • Dinner: 6:00-8:00 PM"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Group Dining",
      description: "Communal dining experience\nPrivate dining arrangements available"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Special Occasions",
      description: "Welcome dinner and farewell feast\nCelebration meals for special events"
    },
    {
      icon: <Utensils className="w-5 h-5" />,
      title: "Cooking Classes",
      description: "Optional Balinese cooking workshops\nLearn traditional recipes and techniques"
    }
  ];

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
          {foodOptions.map((item, index) => (
            <div 
              key={index} 
              className="flex items-start gap-4 py-4 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="text-gray-700 flex-shrink-0 mt-1">
                {item.icon}
              </div>
              <div>
                <div className="font-medium mb-1">{item.title}</div>
                <div className="text-sm text-gray-600 whitespace-pre-line">{item.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Sample Menu */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-light mb-6">Sample Daily Menu</h3>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-medium mb-3 text-gray-900">Breakfast</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Tropical fruit bowl with coconut yogurt</li>
                <li>• Balinese rice porridge with ginger</li>
                <li>• Fresh pressed green juice</li>
                <li>• Herbal tea selection</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-gray-900">Lunch</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Gado-gado with organic vegetables</li>
                <li>• Quinoa Buddha bowl</li>
                <li>• Fresh spring rolls</li>
                <li>• Coconut water and detox water</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-gray-900">Dinner</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Grilled fish with sambal matah</li>
                <li>• Tempeh rendang with brown rice</li>
                <li>• Steamed vegetables with turmeric</li>
                <li>• Traditional herbal drinks</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            *Menu items may vary based on seasonal availability and dietary requirements
          </p>
        </div>
      </div>
    </section>
  );
}