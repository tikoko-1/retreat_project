import { Users, MapPin, Heart, Home, Bath } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import { RetreatCenter } from "@/types";
import { getSupabaseImageUrl, formatPriceNumber } from "@/lib/utils";

interface RetreatCenterCardProps {
  retreat: RetreatCenter;
  onSelect: (id: string) => void;
}

export default function RetreatCenterCard({
  retreat,
  onSelect,
}: RetreatCenterCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  // Determine status label
  const getStatusLabel = () => {
    if (retreat.label)
      return {
        text: retreat.label,
        color:
          "bg-white/90 backdrop-blur-sm text-gray-900 border border-white/50",
      };
    return null;
  };

  const statusLabel = getStatusLabel();

  // Generate mock bedroom/bathroom data if not provided
  const bedrooms = retreat.bedrooms || Math.ceil(retreat.capacity_max / 3);
  const bathrooms = retreat.bathrooms || Math.ceil(bedrooms / 2);

  return (
    <div
      className="group cursor-pointer bg-white rounded-md overflow-hidden hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
      onClick={() => onSelect(retreat.id)}
    >
      {/* Image Container - 16:9 aspect ratio */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <ImageWithFallback
          src={getSupabaseImageUrl(retreat.photos[0])}
          alt={retreat.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Status Label - Top left */}
        {statusLabel && (
          <div className="absolute top-3 left-3">
            <span
              className={`px-2.5 py-1 text-xs font-medium rounded-md ${statusLabel.color}`}
            >
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
            className={`w-4 h-4 transition-colors ${isLiked
              ? "fill-red-500 text-red-500"
              : "text-gray-600 hover:text-red-500"
              }`}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title and Location - Bigger title */}
        <div>
          <h3 className="text-[21px] lg:text-[24px] font-light text-gray-900 line-clamp-1 mb-1.5">
            {retreat.title}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">
              {retreat.city}, {retreat.country}
            </span>
          </div>
        </div>

        {/* Key Tags */}
        <div className="flex flex-wrap gap-2">
          {retreat.amenity_names.map((tag, index) => (
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
            <span>Up to {retreat.capacity_max} guests</span>
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
            <span className="font-medium text-gray-900">
              {retreat.avg_rating.toFixed(1)}
            </span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">
              {retreat.review_count} reviews
            </span>
          </div>

          <div className="text-right">
            <div className="flex items-baseline gap-1">
              <span className="font-semibold text-gray-900">
                ${formatPriceNumber(retreat.price_min)} - ${formatPriceNumber(retreat.price_max)}
              </span>
              <span className="text-gray-500 text-sm font-normal">
                {retreat.price_unit === "weekend"
                  ? "/ weekend"
                  : retreat.price_unit === "per_night"
                    ? "/ night"
                    : retreat.price_unit === "per_person"
                      ? "/ person"
                      : retreat.price_unit === "week"
                        ? "/ week"
                        : retreat.price_unit === "custom"
                          ? ""
                          : "/ night"}
              </span>
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
