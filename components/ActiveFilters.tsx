"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FilterState } from "@/types";

interface ActiveFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function ActiveFilters({
  filters,
  onFiltersChange,
}: ActiveFiltersProps) {
  const [venueTypeOptions, setVenueTypeOptions] = useState<
    { name: string; icon: { name: string }; slug: string; id: string }[]
  >([]);
  const [amenityOptions, setAmenityOptions] = useState<
    {
      name: string;
      icon: { name: string };
      slug: string;
      id: string;
    }[]
  >([]);

  useEffect(() => {
    const loadVenueTypes = async () => {
      const { data: possibleVenueTypes } = await supabase
        .from("venue_types")
        .select("*");
      if (possibleVenueTypes) {
        setVenueTypeOptions(possibleVenueTypes);
      }
    };
    const loadAmenities = async () => {
      const { data: allAmenities } = await supabase
        .from("amenities")
        .select("*");
      if (allAmenities) {
        setAmenityOptions(allAmenities);
      }
    };
    Promise.all([loadVenueTypes(), loadAmenities()]);
  }, []);

  const removeFilter = (filterType: keyof FilterState, value?: string) => {
    const newFilters = { ...filters };

    if (filterType === "amenities" && value) {
      newFilters.amenities = newFilters.amenities.filter(
        (amenity) => amenity !== value
      );
    } else if (filterType === "venueTypes" && value) {
      newFilters.venueTypes = newFilters.venueTypes.filter(
        (type) => type !== value
      );
    } else {
      (newFilters as any)[filterType] = "";
    }
    onFiltersChange(newFilters);
  };

  const resetAllFilters = () => {
    onFiltersChange({
      search: filters.search,
      guests: "",
      sortBy: filters.sortBy,
      amenities: [],
      bedrooms: "",
      bathrooms: "",
      venueTypes: [],
    });
  };

  const hasActiveFilters =
    filters.guests ||
    filters.amenities.length > 0 ||
    filters.bedrooms ||
    filters.bathrooms ||
    filters.venueTypes.length > 0;

  if (
    !hasActiveFilters ||
    venueTypeOptions.length === 0 ||
    amenityOptions.length === 0
  ) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Guests Filter */}
      {filters.guests && (
        <div className="group flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:border-gray-300">
          <span>{filters.guests} guests</span>
          <button
            onClick={() => removeFilter("guests")}
            className="w-4 h-4 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all duration-200"
            aria-label="Remove guest filter"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Bedrooms Filter */}
      {filters.bedrooms && (
        <div className="group flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:border-gray-300">
          <span>{filters.bedrooms} Bedrooms</span>
          <button
            onClick={() => removeFilter("bedrooms")}
            className="w-4 h-4 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all duration-200"
            aria-label="Remove bedrooms filter"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Bathrooms Filter */}
      {filters.bathrooms && (
        <div className="group flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:border-gray-300">
          <span>{filters.bathrooms} Bathrooms</span>
          <button
            onClick={() => removeFilter("bathrooms")}
            className="w-4 h-4 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all duration-200"
            aria-label="Remove bathrooms filter"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Venue Type Filters */}
      {filters.venueTypes.map((venueType) => (
        <div
          key={venueType}
          className="group flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:border-gray-300"
        >
          <span>
            {venueTypeOptions.find((vt) => vt.id === venueType)?.name ||
              venueType}
          </span>
          <button
            onClick={() => removeFilter("venueTypes", venueType)}
            className="w-4 h-4 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all duration-200"
            aria-label={`Remove ${
              venueTypeOptions.find((vt) => vt.id === venueType)?.name ||
              venueType
            } filter`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}

      {/* Amenity Filters */}
      {filters.amenities.map((amenity) => (
        <div
          key={amenity}
          className="group flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:border-gray-300"
        >
          <span>
            {amenityOptions.find((a) => a.id === amenity)?.name || amenity}
          </span>
          <button
            onClick={() => removeFilter("amenities", amenity)}
            className="w-4 h-4 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all duration-200"
            aria-label={`Remove ${
              amenityOptions.find((a) => a.id === amenity)?.name || amenity
            } filter`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}

      {/* Reset All Button - Show when there are multiple filters or when it makes sense */}
      {hasActiveFilters && (
        <>
          <div className="w-px h-4 bg-gray-200 mx-1"></div>
          <button
            onClick={resetAllFilters}
            className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-200"
          >
            Reset all
          </button>
        </>
      )}
    </div>
  );
}
