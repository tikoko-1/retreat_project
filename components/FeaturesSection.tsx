import { 
  Wifi, Waves, TreePine, Volume2, Flower, Leaf, MapPin, Clock, 
  Coffee, Car, Shield, Thermometer, Wind, Zap, Users, Utensils,
  Bed, Bath, AirVent, Tv, Refrigerator, Microwave, WashingMachine,
  Wrench, Sofa, Lamp, Camera, Phone, Mail, Calendar, Star, Heart,
  Sun, Moon, Mountain, Gift, Music, Book, Dumbbell, Bike,
  Plane, Train, Bus, Taxi, ChefHat, Wine, Cookie, Apple,
  Shirt, Scissors, Sparkles, CheckCircle, AlertCircle, Info, Download
} from "lucide-react";

// Core amenities that facilitators care most about
const coreAmenities = [
  { icon: <TreePine className="w-5 h-5" />, title: "Dedicated Yoga Shala", subtitle: "1,200 sq ft with acoustic design\\nPanoramic jungle views" },
  { icon: <Utensils className="w-5 h-5" />, title: "Organic Meals", subtitle: "Vegan/vegetarian options\\nCustomized dietary accommodations" },
  { icon: <Volume2 className="w-5 h-5" />, title: "Professional AV", subtitle: "Sound system & projectors\\nWorkshop-ready equipment" },
  { icon: <Wifi className="w-5 h-5" />, title: "High‑speed Fiber Wi‑Fi", subtitle: "Reliable throughout property\\nPerfect for virtual sessions" },
  { icon: <Shield className="w-5 h-5" />, title: "24/7 On‑site Support & Security", subtitle: "Dedicated staff team\\nGated property with medical support" },
  { icon: <MapPin className="w-5 h-5" />, title: "Prime Location", subtitle: "5 min to Ubud center\\nEasy airport access (75 min)" }
];

// Extra amenities for enhanced experience
const extraAmenities = [
  { icon: <Waves className="w-5 h-5" />, title: "Infinity Pool", subtitle: "25m heated saltwater pool\\Panoramic jungle views with lounging deck" },
  { icon: <Flower className="w-5 h-5" />, title: "Spa Services", subtitle: "Traditional Balinese treatments\\Authentic massages and healing therapies" },
  { icon: <ChefHat className="w-5 h-5" />, title: "Private Chef", subtitle: "Personalized meal preparation\\Accommodates all dietary requirements" },
  { icon: <Leaf className="w-5 h-5" />, title: "Eco‑certified", subtitle: "100% renewable solar energy\\Sustainable practices throughout property" },
  { icon: <Book className="w-5 h-5" />, title: "Wellness Library", subtitle: "Curated spiritual and wellness texts\\Quiet reading space with garden views" },
  { icon: <Wine className="w-5 h-5" />, title: "Bar Service", subtitle: "Premium cocktails and local wines\\Sunset terrace with craft beverages" },
  { icon: <Dumbbell className="w-5 h-5" />, title: "Fitness Center", subtitle: "Modern gym equipment\\Floor-to-ceiling jungle views" },
  { icon: <Car className="w-5 h-5" />, title: "Free Parking", subtitle: "Secure covered parking spaces\\24/7 gated property access" },
  { icon: <Bike className="w-5 h-5" />, title: "Bike Rental", subtitle: "Complimentary high-quality bicycles\\Perfect for exploring Ubud's rice terraces" },
  { icon: <Plane className="w-5 h-5" />, title: "Airport Transfer", subtitle: "Professional transportation service\\Direct shuttle from Ngurah Rai Airport" }
];

const roomAmenities = [
  { icon: <Bed className="w-5 h-5" />, title: "Premium bedding", subtitle: "Organic cotton linens\\nHypoallergenic pillows and mattresses" },
  { icon: <Bath className="w-5 h-5" />, title: "Private bathrooms", subtitle: "Rainfall showers\\nNatural stone finishes throughout" },
  { icon: <AirVent className="w-5 h-5" />, title: "Air conditioning", subtitle: "Individual room control\\nQuiet operation for peaceful rest" },
  { icon: <Tv className="w-5 h-5" />, title: "Smart TV", subtitle: "Streaming capabilities\\nAccess to international channels" },
  { icon: <Refrigerator className="w-5 h-5" />, title: "Mini fridge", subtitle: "Personal storage\\nEnergy-efficient and silent operation" },
  { icon: <Microwave className="w-5 h-5" />, title: "Kitchenette", subtitle: "Basic cooking facilities\\nInduction cooktop and cookware included" },
  { icon: <WashingMachine className="w-5 h-5" />, title: "Laundry service", subtitle: "Daily cleaning available\\nEco-friendly detergents used" },
  { icon: <Wrench className="w-5 h-5" />, title: "Iron & board", subtitle: "In-room convenience\\nSteam iron for wrinkle-free clothes" },
  { icon: <Sofa className="w-5 h-5" />, title: "Seating area", subtitle: "Comfortable lounge space\\nPerfect for meditation or reading" },
  { icon: <Lamp className="w-5 h-5" />, title: "Reading lights", subtitle: "Adjustable bedside lighting\\nWarm LED bulbs for evening relaxation" },
  { icon: <Camera className="w-5 h-5" />, title: "Privacy", subtitle: "No cameras in rooms\\nComplete guest privacy guaranteed" },
  { icon: <Phone className="w-5 h-5" />, title: "Room phone", subtitle: "Direct staff contact\\n24/7 guest services available" }
];

export default function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          {/* Mobile: Stack vertically */}
          <div className="block md:hidden">
            <h2 className="text-3xl font-light mb-4">What this place offers</h2>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black border-b border-gray-300 hover:border-black transition-colors">
              <Download className="w-4 h-4" />
              Download full amenities PDF
            </button>
          </div>
          
          {/* Tablet & Desktop: Side by side */}
          <div className="hidden md:flex items-center justify-between">
            <h2 className="text-3xl lg:text-5xl font-light">What this place offers</h2>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black border-b border-gray-300 hover:border-black transition-colors">
              <Download className="w-4 h-4" />
              Download full amenities PDF
            </button>
          </div>
        </div>
        
        {/* Core Amenities - 2 columns from 600px+, 3 columns from 1000px+ */}
        <div className="mb-12">
          <h3 className="text-2xl mb-6 font-light">Core Amenities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreAmenities.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 py-4 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="text-gray-700 flex-shrink-0 mt-1">
                  {feature.icon}
                </div>
                <div>
                  <div className="font-medium mb-1">{feature.title}</div>
                  <div className="text-sm text-gray-600 whitespace-pre-line">{feature.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Extra Amenities - 2 columns from 600px+, 3 columns from 1000px+ */}
        <div className="mb-12">
          <h3 className="text-2xl mb-6 font-light">Extras</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {extraAmenities.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 py-4 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="text-gray-700 flex-shrink-0 mt-1">
                  {feature.icon}
                </div>
                <div>
                  <div className="font-medium mb-1">{feature.title}</div>
                  <div className="text-sm text-gray-600 whitespace-pre-line">{feature.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room Amenities - 2 columns from 600px+, 3 columns from 1000px+ */}
        <div>
          <h3 className="text-2xl mb-6 font-light">Room amenities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomAmenities.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="text-gray-700 flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <div className="font-medium">{feature.title}</div>
                  <div className="text-sm text-gray-600 whitespace-pre-line">{feature.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}