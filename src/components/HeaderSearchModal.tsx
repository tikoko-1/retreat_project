import { useState, useRef, useEffect } from "react";
import { Search, Users, MapPin, X, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { FilterState } from "./SearchFilters";

interface HeaderSearchModalProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onSearch: () => void;
}

// Popular retreat locations for auto-suggest
const popularLocations = [
  { name: 'Ubud, Indonesia', type: 'city', popular: true },
  { name: 'Rishikesh, India', type: 'city', popular: true },
  { name: 'Tulum, Mexico', type: 'city', popular: true },
  { name: 'Sedona, United States', type: 'city', popular: true },
  { name: 'Nosara, Costa Rica', type: 'city', popular: true },
  { name: 'Byron Bay, Australia', type: 'city', popular: true },
  { name: 'Sacred Valley, Peru', type: 'city', popular: true },
  { name: 'Sintra, Portugal', type: 'city', popular: true },
  { name: 'Koh Samui, Thailand', type: 'city', popular: true },
  { name: 'Mykonos, Greece', type: 'city', popular: true },
];

const guestOptions = [
  { value: '1-10', label: '1–10 guests' },
  { value: '11-20', label: '11–20 guests' },
  { value: '21-30', label: '21–30 guests' },
  { value: '31-50', label: '31–50 guests' },
  { value: '50+', label: '50+ guests' },
];

const priceOptions = [
  { value: '0-100', label: '$0–100' },
  { value: '100-300', label: '$100–300' },
  { value: '300-600', label: '$300–600' },
  { value: '600-1000', label: '$600–1000' },
  { value: '1000+', label: '$1000+' },
];

const venueTypeOptions = [
  { value: 'resort', label: 'Resort' },
  { value: 'villa', label: 'Private Villa' },
  { value: 'hotel', label: 'Boutique Hotel' },
  { value: 'camp', label: 'Retreat Camp' },
  { value: 'center', label: 'Wellness Center' },
  { value: 'monastery', label: 'Monastery/Ashram' },
];

const popularAmenities = [
  { id: 'yoga-hall', label: 'Yoga Hall' },
  { id: 'meditation-hall', label: 'Meditation Hall' },
  { id: 'pool-heated', label: 'Heated Pool' },
  { id: 'spa-massage', label: 'Spa & Massage' },
  { id: 'high-speed-wifi', label: 'High-speed Wi-Fi' },
  { id: 'airport-transfer', label: 'Airport Transfer' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
];

export default function HeaderSearchModal({ filters, onFiltersChange, onSearch }: HeaderSearchModalProps) {
  const [suggestions, setSuggestions] = useState<typeof popularLocations>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [inputFocused, setInputFocused] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  // Debounced search suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.search.length > 0) {
        const filtered = popularLocations.filter(location =>
          location.name.toLowerCase().includes(filters.search.toLowerCase())
        ).slice(0, 6);
        
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0 && inputFocused);
      } else {
        const popularOnly = popularLocations.filter(loc => loc.popular).slice(0, 6);
        setSuggestions(popularOnly);
        setShowSuggestions(inputFocused && popularOnly.length > 0);
      }
      setSelectedSuggestionIndex(-1);
    }, 150);

    return () => clearTimeout(timer);
  }, [filters.search, inputFocused]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
          updateFilters({ search: suggestions[selectedSuggestionIndex].name });
          setShowSuggestions(false);
          setSelectedSuggestionIndex(-1);
          searchInputRef.current?.blur();
        } else {
          onSearch();
          setShowSuggestions(false);
          setSelectedSuggestionIndex(-1);
          searchInputRef.current?.blur();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        searchInputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion: typeof popularLocations[0]) => {
    updateFilters({ search: suggestion.name });
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    searchInputRef.current?.blur();
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setInputFocused(false);
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }, 150);
  };

  const toggleAmenity = (amenityId: string) => {
    const newAmenities = filters.amenities.includes(amenityId) 
      ? filters.amenities.filter(id => id !== amenityId)
      : [...filters.amenities, amenityId];
    updateFilters({ amenities: newAmenities });
  };

  const toggleVenueType = (venueTypeId: string) => {
    const newVenueTypes = filters.venueTypes.includes(venueTypeId) 
      ? filters.venueTypes.filter(id => id !== venueTypeId)
      : [...filters.venueTypes, venueTypeId];
    updateFilters({ venueTypes: newVenueTypes });
  };

  const clearFilter = (filterType: string, value?: string) => {
    switch (filterType) {
      case 'guests':
        updateFilters({ guests: '' });
        break;
      case 'priceRange':
        updateFilters({ priceRange: '' });
        break;
      case 'amenity':
        updateFilters({ amenities: filters.amenities.filter(id => id !== value) });
        break;
      case 'venueType':
        updateFilters({ venueTypes: filters.venueTypes.filter(id => id !== value) });
        break;
    }
  };

  const clearAllFilters = () => {
    updateFilters({
      search: '',
      guests: '',
      priceRange: '',
      amenities: [],
      venueTypes: [],
    });
  };

  // Get active filter tags
  const getActiveFilterTags = () => {
    const tags = [];
    
    if (filters.guests) {
      const guestLabel = guestOptions.find(opt => opt.value === filters.guests)?.label;
      if (guestLabel) tags.push({ type: 'guests', label: guestLabel, value: filters.guests });
    }
    
    if (filters.priceRange) {
      const priceLabel = priceOptions.find(opt => opt.value === filters.priceRange)?.label;
      if (priceLabel) tags.push({ type: 'priceRange', label: priceLabel, value: filters.priceRange });
    }
    
    filters.amenities.forEach(amenityId => {
      const amenity = popularAmenities.find(a => a.id === amenityId);
      if (amenity) tags.push({ type: 'amenity', label: amenity.label, value: amenityId });
    });
    
    filters.venueTypes.forEach(venueTypeId => {
      const venueType = venueTypeOptions.find(v => v.value === venueTypeId);
      if (venueType) tags.push({ type: 'venueType', label: venueType.label, value: venueTypeId });
    });
    
    return tags;
  };

  const activeFilterTags = getActiveFilterTags();

  return (
    <div className="space-y-8">
      {/* Main Search Fields - Two Rows */}
      <div className="space-y-4">
        {/* First Row - Destination */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Where do you want to go?
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search destinations, cities, or venue names"
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              className="w-full h-14 pl-12 pr-4 bg-white border border-gray-200 rounded-lg text-base font-medium text-gray-900 placeholder:text-gray-500 placeholder:font-normal transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:bg-white focus:outline-none"
            />
            
            {/* Auto-suggest Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {suggestions.length > 0 ? (
                  <>
                    {filters.search.length === 0 && (
                      <div className="px-4 py-3 text-xs font-medium text-gray-500 border-b border-gray-100">
                        Popular destinations
                      </div>
                    )}
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={`${suggestion.name}-${suggestion.type}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 flex items-center gap-3 ${
                          index === selectedSuggestionIndex ? 'bg-gray-50' : ''
                        }`}
                      >
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900">
                            {suggestion.name}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">
                            {suggestion.type}
                          </div>
                        </div>
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    No suggestions found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Second Row - Guests and Budget */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Number of guests
            </label>
            <Select value={filters.guests} onValueChange={(value) => updateFilters({ guests: value })}>
              <SelectTrigger className="h-14 bg-white border border-gray-200 rounded-lg text-base font-medium text-gray-900 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:bg-white">
                <Users className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" />
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                {guestOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="text-base font-medium text-gray-900 hover:bg-gray-50 focus:bg-gray-50 cursor-pointer px-4 py-3"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Budget per night
            </label>
            <Select value={filters.priceRange} onValueChange={(value) => updateFilters({ priceRange: value })}>
              <SelectTrigger className="h-14 bg-white border border-gray-200 rounded-lg text-base font-medium text-gray-900 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:bg-white">
                <span className="text-gray-400 mr-3">$</span>
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                {priceOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="text-base font-medium text-gray-900 hover:bg-gray-50 focus:bg-gray-50 cursor-pointer px-4 py-3"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="space-y-6">
        {/* Venue Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Venue type
          </label>
          <div className="flex flex-wrap gap-2">
            {venueTypeOptions.map((venueType) => {
              const isSelected = filters.venueTypes.includes(venueType.value);
              return (
                <button
                  key={venueType.value}
                  onClick={() => toggleVenueType(venueType.value)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {venueType.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Popular Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Popular amenities
          </label>
          <div className="flex flex-wrap gap-2">
            {popularAmenities.map((amenity) => {
              const isSelected = filters.amenities.includes(amenity.id);
              return (
                <button
                  key={amenity.id}
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {amenity.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Filter Tags */}
      {activeFilterTags.length > 0 && (
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-gray-700">
              Active filters
            </label>
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilterTags.map((tag, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {tag.label}
                <button
                  onClick={() => clearFilter(tag.type, tag.value)}
                  className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Search Button */}
      <div className="border-t border-gray-100 pt-6">
        <Button
          onClick={onSearch}
          className="w-full h-14 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-base font-medium transition-all duration-200 flex items-center justify-center gap-3"
        >
          <Search className="w-5 h-5" />
          Search retreat centers
        </Button>
      </div>
    </div>
  );
}