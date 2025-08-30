import { X } from "lucide-react";
import { FilterState } from "./SearchFilters";

interface ActiveFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

// Labels mapping for all filter options
const filterLabels: Record<string, string> = {
  // Amenities
  'yoga-hall': 'Yoga Hall',
  'meditation-hall': 'Meditation Hall',
  'workshop-room': 'Workshop Room',
  'conference-room': 'Conference Room',
  'breakout-rooms': 'Breakout Rooms',
  'outdoor-pavilion': 'Outdoor Pavilion',
  'therapy-rooms': 'Therapy Rooms',
  'dance-studio': 'Dance Studio',
  'pool-heated': 'Heated Pool',
  'pool-infinity': 'Infinity Pool',
  'hot-tub': 'Hot Tub',
  'sauna-steam': 'Sauna/Steam',
  'spa-massage': 'Spa & Massage',
  'fitness-gym': 'Fitness Center',
  'nature-trails': 'Nature Trails',
  'beach-access': 'Beach Access',
  'tennis-court': 'Tennis Court',
  'volleyball-court': 'Volleyball Court',
  'high-speed-wifi': 'Wi-Fi',
  'professional-av': 'AV Equipment',
  'sound-system': 'Sound System',
  'projector-screen': 'Projector & Screen',
  'air-conditioning': 'Air Conditioning',
  'heating-system': 'Heating',
  'backup-generator': 'Generator',
  'water-filtration': 'Water Filtration',
  'airport-transfer': 'Airport Transfer',
  'concierge-service': 'Concierge',
  'housekeeping': 'Housekeeping',
  'laundry-service': 'Laundry',
  'onsite-staff': 'On-site Staff 24/7',
  'parking': 'Parking',
  'accessibility': 'Accessibility',
  'pet-friendly': 'Pet Friendly',
  
  // Food Options
  'vegetarian': 'Vegetarian',
  'vegan': 'Vegan',
  'raw-food': 'Raw Food',
  'gluten-free': 'Gluten-Free',
  'organic': 'Organic',
  'local-sourced': 'Local Sourced',
  'private-chef': 'Private Chef',
  'commercial-kitchen': 'Commercial Kitchen',
  'catering-service': 'Catering',
  'cooking-classes': 'Cooking Classes',
  'juice-bar': 'Juice Bar',
  'tea-ceremony': 'Tea Ceremony',
  
  // Venue Types
  'resort': 'Resort',
  'villa': 'Private Villa',
  'hotel': 'Boutique Hotel',
  'camp': 'Retreat Camp',
  'center': 'Wellness Center',
  'monastery': 'Monastery/Ashram',
  
  // Cancellation Policies
  'flexible': 'Flexible (7 days)',
  'moderate': 'Moderate (14 days)',
  'strict': 'Strict (30 days)',
  'super-strict': 'Super Strict',
};

export default function ActiveFilters({ filters, onFiltersChange }: ActiveFiltersProps) {
  // Remove individual filter
  const removeFilter = (filterType: keyof FilterState, value?: string) => {
    const newFilters = { ...filters };
    
    if (filterType === 'amenities' && value) {
      newFilters.amenities = newFilters.amenities.filter(amenity => amenity !== value);
    } else if (filterType === 'foodOptions' && value) {
      newFilters.foodOptions = newFilters.foodOptions?.filter(food => food !== value) || [];
    } else if (filterType === 'venueTypes' && value) {
      newFilters.venueTypes = newFilters.venueTypes.filter(type => type !== value);
    } else if (filterType === 'hasReviews' || filterType === 'topRated') {
      (newFilters as any)[filterType] = false;
    } else if (filterType === 'venueTypes') {
      newFilters.venueTypes = [];
    } else {
      (newFilters as any)[filterType] = '';
    }
    
    onFiltersChange(newFilters);
  };

  // Reset all filters except search
  const resetAllFilters = () => {
    onFiltersChange({
      search: filters.search, // Keep search
      guests: '',
      priceRange: '',
      sortBy: filters.sortBy, // Keep sort
      amenities: [],
      area: [100, 10000],
      bedrooms: '',
      bathrooms: '',
      venueTypes: [],
      foodOptions: [],
      cancellationPolicy: '',
      hasReviews: false,
      topRated: false,
    });
  };

  // Check if any filters are active
  const hasActiveFilters = filters.guests || filters.priceRange || filters.amenities.length > 0 ||
    filters.bedrooms || filters.bathrooms || filters.venueTypes.length > 0 || filters.foodOptions?.length > 0 ||
    filters.cancellationPolicy || filters.hasReviews || filters.topRated;

  if (!hasActiveFilters) {
    return null;
  }

  // Format price range display
  const formatPriceRange = (priceRange: string) => {
    return priceRange.replace('-', '–');
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Guests Filter */}
      {filters.guests && (
        <div className="group flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:border-gray-300">
          <span>{filters.guests}</span>
          <button
            onClick={() => removeFilter('guests')}
            className="w-4 h-4 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all duration-200"
            aria-label="Remove guest filter"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Price Range Filter */}
      {filters.priceRange && (
        <div className="group flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:border-gray-300">
          <span>{formatPriceRange(filters.priceRange)}</span>
          <button
            onClick={() => removeFilter('priceRange')}
            className="w-4 h-4 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all duration-200"
            aria-label="Remove price filter"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Bedrooms Filter */}
      {filters.bedrooms && (
        <div className="group flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:border-gray-300">
          <span>{filters.bedrooms}</span>
          <button
            onClick={() => removeFilter('bedrooms')}
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
          <span>{filters.bathrooms}</span>
          <button
            onClick={() => removeFilter('bathrooms')}
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
          <span>{filterLabels[venueType] || venueType}</span>
          <button
            onClick={() => removeFilter('venueTypes', venueType)}
            className="w-4 h-4 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all duration-200"
            aria-label={`Remove ${filterLabels[venueType] || venueType} filter`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}

      {/* Cancellation Policy Filter */}
      {filters.cancellationPolicy && (
        <div className="group flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:border-gray-300">
          <span>{filterLabels[filters.cancellationPolicy] || filters.cancellationPolicy}</span>
          <button
            onClick={() => removeFilter('cancellationPolicy')}
            className="w-4 h-4 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all duration-200"
            aria-label="Remove cancellation policy filter"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Has Reviews Filter */}
      {filters.hasReviews && (
        <div className="group flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:border-gray-300">
          <span>With Reviews</span>
          <button
            onClick={() => removeFilter('hasReviews')}
            className="w-4 h-4 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all duration-200"
            aria-label="Remove reviews filter"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Top Rated Filter */}
      {filters.topRated && (
        <div className="group flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:border-gray-300">
          <span>Top Rated (4.5+)</span>
          <button
            onClick={() => removeFilter('topRated')}
            className="w-4 h-4 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all duration-200"
            aria-label="Remove top rated filter"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Amenity Filters */}
      {filters.amenities.map((amenity) => (
        <div
          key={amenity}
          className="group flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:border-gray-300"
        >
          <span>{filterLabels[amenity] || amenity}</span>
          <button
            onClick={() => removeFilter('amenities', amenity)}
            className="w-4 h-4 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all duration-200"
            aria-label={`Remove ${filterLabels[amenity] || amenity} filter`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}

      {/* Food Option Filters */}
      {filters.foodOptions?.map((food) => (
        <div
          key={food}
          className="group flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:border-gray-300"
        >
          <span>{filterLabels[food] || food}</span>
          <button
            onClick={() => removeFilter('foodOptions', food)}
            className="w-4 h-4 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all duration-200"
            aria-label={`Remove ${filterLabels[food] || food} filter`}
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