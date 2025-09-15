"use client"

import { useState, useEffect } from "react";
import { Star, MapPin, Users, Home, Bath } from "lucide-react";
import { Button } from "./ui/button";
import { RetreatDetails } from "@/types";
import { formatPriceNumber } from "@/lib/utils";

interface StickyPricingBarProps {
  onReserveClick?: () => void;
  retreat: RetreatDetails
}

export default function StickyPricingBar({ onReserveClick, retreat }: StickyPricingBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find the pricing overview section
      const pricingSection = document.querySelector('[data-pricing-section]');
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        const isHidden = rect.bottom <= 0;
        setIsVisible(isHidden);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-[56px] min-[724px]:top-[60px] lg:top-[64px] left-0 right-0 z-40 bg-white border-b border-gray-100 animate-in slide-in-from-top-2 duration-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3.5">
        {/* Mobile Version - Only pricing and button (до 724px) */}
        <div className="flex items-center justify-between min-[724px]:hidden">
          {/* Pricing info */}
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold text-gray-900">${formatPriceNumber(retreat.price_min ?? 0)}–${formatPriceNumber(retreat.price_max ?? 0)}</span>
              <span className="text-gray-500 text-sm font-normal">{retreat.price_unit === "per_night" ? "/ night" : retreat.price_unit === "per_person" ? "/ person" : retreat.price_unit === "week" ? "/ week" : retreat.price_unit === "weekend" ? "/ weekend" : retreat.price_unit === "custom" ? "" : "/ night"}</span>
            </div>
            <div className="text-xs text-gray-500">
              Rates vary by group size
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={onReserveClick}
            className="bg-black text-white hover:bg-gray-800 px-4 py-2 text-sm font-medium"
          >
            Reserve
          </Button>
        </div>

        {/* Medium Version - Name, location, pricing and button (724px - 1023px) */}
        <div className="hidden min-[724px]:flex lg:hidden items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Name and Location */}
            <div>
              <h3 className="font-medium text-gray-900">{retreat.title}</h3>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-sm text-gray-600">{retreat.city}, {retreat.country}</span>
              </div>
            </div>

            {/* Separator */}
            <div className="w-px h-10 bg-gray-200"></div>

            {/* Pricing info */}
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-semibold text-gray-900">${formatPriceNumber(retreat.price_min ?? 0)}–${formatPriceNumber(retreat.price_max ?? 0)}</span>
                <span className="text-gray-500 text-sm font-normal">{retreat.price_unit === "per_night" ? "/ night" : retreat.price_unit === "per_person" ? "/ person" : retreat.price_unit === "week" ? "/ week" : retreat.price_unit === "weekend" ? "/ weekend" : retreat.price_unit === "custom" ? "" : "/ night"}</span>
              </div>
              <div className="text-xs text-gray-500">
                Rates vary by group size
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={onReserveClick}
            className="bg-black text-white hover:bg-gray-800 px-6 py-2 text-sm font-medium"
          >
            Request Availability
          </Button>
        </div>

        {/* Desktop Version - Full info (1024px+) */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Left side - Complete retreat info */}
          <div className="flex items-center gap-4">
            {/* Name and Location */}
            <div>
              <h3 className="font-medium text-gray-900">{retreat.title}</h3>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-sm text-gray-600">{retreat.city}, {retreat.country}</span>
              </div>
            </div>

            {/* Separator */}
            <div className="w-px h-10 bg-gray-200"></div>

            {/* Capacity and Rooms - Full version for large screens */}
            <div className="hidden xl:flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Up to {retreat.capacity_max ?? 0} guests</span>
              </div>
              <div className="flex items-center gap-1">
                <Home className="w-4 h-4" />
                <span>{retreat.bedrooms ?? 0} bedrooms</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{retreat.bathrooms ?? 0} bathrooms</span>
              </div>
            </div>

            {/* Compact version for smaller screens */}
            <div className="xl:hidden flex items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{retreat.capacity_max ?? 0} guests</span>
              </div>
              <div className="flex items-center gap-1">
                <Home className="w-4 h-4" />
                <span>{retreat.rooms?.length ?? 0} rooms</span>
              </div>
            </div>

            {/* Separator */}
            <div className="w-px h-10 bg-gray-200"></div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-black text-black" />
              <span className="text-sm font-medium">{retreat.review_stats.avg_rating.toFixed(1) ?? 0.0}</span>
              <span className="text-sm text-gray-600">· {retreat.review_stats.review_count ?? 0} reviews</span>
            </div>

            {/* Separator */}
            <div className="w-px h-10 bg-gray-200"></div>

            {/* Pricing info */}
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-semibold text-gray-900">${formatPriceNumber(retreat.price_min ?? 0)}–${formatPriceNumber(retreat.price_max ?? 0)}</span>
                <span className="text-gray-500 text-sm font-normal">{retreat.price_unit === "per_night" ? "/ night" : retreat.price_unit === "per_person" ? "/ person" : retreat.price_unit === "week" ? "/ week" : retreat.price_unit === "weekend" ? "/ weekend" : retreat.price_unit === "custom" ? "" : "/ night"}</span>
              </div>
              <div className="text-xs text-gray-500">
                Rates vary by group size
              </div>
            </div>
          </div>

          {/* Right side - CTA Button */}
          <Button
            onClick={onReserveClick}
            className="bg-black text-white hover:bg-gray-800 px-6 py-2 text-sm font-medium"
          >
            Request Availability
          </Button>
        </div>
      </div>
    </div>
  );
}