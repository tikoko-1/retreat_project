import { Users, MapPin, Heart, Home, Bath, Leaf, TreePine, Waves, Dumbbell, Utensils, Wifi, Car } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface RetreatCenter {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  capacity: number;
  priceRange: string;
  amenities: string[];
  highlights: string[];
  isFeatured?: boolean;
  bedrooms?: number;
  bathrooms?: number;
  isNew?: boolean;
  isVerified?: boolean;
}

interface RetreatCenterCardProps {
  retreat: RetreatCenter;
  onSelect: (id: string) => void;
}

// Enhanced amenity mapping with icons
const amenityConfig: Record<string, { label: string; icon: any }> = {
  'yoga-hall': { label: 'Yoga Hall', icon: TreePine },
  'meditation-hall': { label: 'Meditation', icon: TreePine },
  'pool-heated': { label: 'Pool', icon: Waves },
  'pool-infinity': { label: 'Pool', icon: Waves },
  'pool': { label: 'Pool', icon: Waves },
  'spa-massage': { label: 'Spa', icon: Heart },
  'fitness-gym': { label: 'Gym', icon: Dumbbell },
  'eco-certified': { label: 'Eco-certified', icon: Leaf },
  'nature-trails': { label: 'Nature', icon: TreePine },
  'nature-setting': { label: 'Nature', icon: TreePine },
  'beachfront': { label: 'Beachfront', icon: Waves },
  'beach-access': { label: 'Beach Access', icon: Waves },
  'commercial-kitchen': { label: 'Kitchen', icon: Utensils },
  'high-speed-wifi': { label: 'WiFi', icon: Wifi },
  'fiber-wifi': { label: 'WiFi', icon: Wifi },
  'professional-av': { label: 'AV Equipment', icon: Wifi },
  'parking-ev': { label: 'Parking', icon: Car },
  'parking': { label: 'Parking', icon: Car },
};

export default function RetreatCenterCard({ retreat, onSelect }: RetreatCenterCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  // Get top 3-4 amenity tags for display
  const getDisplayTags = (amenities: string[], highlights: string[]) => {
    const amenityTags = amenities.slice(0, 2).map(amenity => amenityConfig[amenity]?.label).filter(Boolean);
    const highlightTags = highlights.slice(0, 2);
    
    return [...amenityTags, ...highlightTags].slice(0, 4);
  };

  const displayTags = getDisplayTags(retreat.amenities, retreat.highlights);

  // Determine status label
  const getStatusLabel = () => {
    if (retreat.isNew) return { text: 'New', color: 'bg-white/90 backdrop-blur-sm text-gray-900 border border-white/50' };
    if (retreat.isVerified) return { text: 'Verified', color: 'bg-white/90 backdrop-blur-sm text-gray-900 border border-white/50' };
    if (retreat.rating >= 4.8) return { text: 'Popular', color: 'bg-white/90 backdrop-blur-sm text-gray-900 border border-white/50' };
    return null;
  };

  const statusLabel = getStatusLabel();

  // Generate mock bedroom/bathroom data if not provided
  const bedrooms = retreat.bedrooms || Math.ceil(retreat.capacity / 3);
  const bathrooms = retreat.bathrooms || Math.ceil(bedrooms / 2);

  return (
    <div 
      className="group cursor-pointer bg-white rounded-md overflow-hidden hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
      onClick={() => onSelect(retreat.id)}
    >
      {/* Image Container - 16:9 aspect ratio */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <ImageWithFallback
          src={retreat.image}
          alt={retreat.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Status Label - Top left */}
        {statusLabel && (
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${statusLabel.color}`}>
              {statusLabel.text}
            </span>
          </div>
        )}
        
        {/* Save Heart Button - Top right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-md flex items-center justify-center hover:bg-white transition-all"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
            }`} 
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title and Location - Bigger title */}
        <div>
          <h3 className="text-[21px] lg:text-[24px] font-light text-gray-900 line-clamp-1 mb-1.5">
            {retreat.name}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{retreat.location}</span>
          </div>
        </div>

        {/* Key Tags */}
        <div className="flex flex-wrap gap-2">
          {displayTags.map((tag, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-md border border-gray-100"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Capacity and Rooms Info */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>Up to {retreat.capacity} guests</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Home className="w-4 h-4" />
              <span>{bedrooms} bedrooms</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{bathrooms} bathrooms</span>
            </div>
          </div>
        </div>

        {/* Rating and Price - Updated format */}
        <div className="flex items-center justify-between border-t border-gray-50 pt-3">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 text-sm">★</span>
            <span className="font-medium text-gray-900">{retreat.rating}</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">{retreat.reviewCount} reviews</span>
          </div>
          
          <div className="text-right">
            <div className="flex items-baseline gap-1">
              <span className="font-semibold text-gray-900">{retreat.priceRange}</span>
              <span className="text-gray-500 text-sm font-normal">/ night</span>
            </div>
            <div className="text-xs text-gray-500">
              Rates vary by group size
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { RetreatCenter };