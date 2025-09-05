import { useState, useRef, useEffect } from "react";
import { Search, Users, MapPin, X, Star, Utensils, Home, Bed, Shield } from "lucide-react";
import { TreePine, Heart, Waves, Dumbbell, ChefHat, PersonStanding, MoonStar, Presentation, Flame, UtensilsCrossed, Salad, BedSingle, ShowerHead, Snowflake, TreePalm, ParkingSquare, Plane, Sprout, Bike, WineOff, PawPrint, Baby, Accessibility, Wifi, Leaf, Coffee, Landmark, Tent, Hotel, House, Building2, HeartPulse } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { FilterState } from "./SearchFilters";

interface HeaderSearchModalProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onSearch: () => void;
}

// Popular retreat locations for auto-suggest  
const popularLocations = [
  // Countries
  { name: 'Indonesia', type: 'country', popular: true },
  { name: 'India', type: 'country', popular: true },
  { name: 'Mexico', type: 'country', popular: true },
  { name: 'United States', type: 'country', popular: true },
  { name: 'Costa Rica', type: 'country', popular: true },
  { name: 'Australia', type: 'country', popular: true },
  { name: 'Peru', type: 'country', popular: true },
  { name: 'Portugal', type: 'country', popular: true },
  { name: 'Thailand', type: 'country', popular: true },
  { name: 'Greece', type: 'country', popular: true },
  
  // Cities
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

const venueTypeOptions = [
  { value: 'retreat-center', label: 'Retreat Center', icon: Home },
  { value: 'ashram-monastery', label: 'Ashram / Monastery', icon: Landmark },
  { value: 'eco-lodge', label: 'Eco-lodge / Retreat Camp', icon: Tent },
  { value: 'resort', label: 'Resort', icon: Hotel },
  { value: 'villa-house', label: 'Villa / Private House', icon: House },
  { value: 'boutique-hotel', label: 'Boutique Hotel', icon: Building2 },
  { value: 'wellness-center', label: 'Wellness Center', icon: HeartPulse },
  { value: 'guesthouse-bnb', label: 'Guesthouse / BnB', icon: Bed },
];

// Comprehensive amenity categories from Advanced Filters
const amenityCategories = {
  'Practice & Wellness': [
    { id: 'yoga-hall', label: 'Yoga hall / shala', icon: PersonStanding },
    { id: 'meditation-hall', label: 'Meditation space / hall', icon: MoonStar },
    { id: 'spa-massage', label: 'Spa / massage room', icon: Heart },
    { id: 'workshop-av', label: 'Event / Workshop space (AV/projector)', icon: Presentation },
    { id: 'fitness-gym', label: 'Fitness / gym area', icon: Dumbbell },
    { id: 'sauna-steam', label: 'Sauna / steam / jacuzzi', icon: Flame },
  ],
  'Food & Dining': [
    { id: 'dining-area', label: 'Dining area', icon: UtensilsCrossed },
    { id: 'kitchen-shared', label: 'Kitchen (shared or professional)', icon: ChefHat },
    { id: 'vegetarian-vegan', label: 'Vegetarian / vegan meals available', icon: Leaf },
    { id: 'restaurant-onsite', label: 'Restaurant on site', icon: Utensils },
    { id: 'tea-coffee', label: 'Tea / Coffee station', icon: Coffee },
    { id: 'special-diet', label: 'Special diet meals (gluten-free/ayurvedic)', icon: Salad },
  ],
  'Living & Comfort': [
    { id: 'private-rooms', label: 'Private rooms', icon: BedSingle },
    { id: 'shared-rooms', label: 'Shared rooms / Dorms', icon: Users },
    { id: 'ensuite-bathrooms', label: 'En-suite bathrooms', icon: ShowerHead },
    { id: 'wifi-internet', label: 'Wi-Fi / Internet', icon: Wifi },
    { id: 'air-conditioning', label: 'Air conditioning', icon: Snowflake },
    { id: 'heating-system', label: 'Heating (for cold regions)', icon: Flame },
  ],
  'Extras & Nature': [
    { id: 'swimming-pool', label: 'Swimming pool', icon: Waves },
    { id: 'outdoor-garden', label: 'Outdoor space / garden', icon: TreePalm },
    { id: 'parking-onsite', label: 'Parking on site', icon: ParkingSquare },
    { id: 'airport-transfer', label: 'Airport transfer', icon: Plane },
    { id: 'eco-friendly', label: 'Eco-friendly', icon: Sprout },
    { id: 'activities', label: 'Activities (cooking class, tours, biking, etc.)', icon: Bike },
  ],
  'Infrastructure & Policies': [
    { id: 'accessibility', label: 'Accessibility / wheelchair friendly', icon: Accessibility },
    { id: 'alcohol-free', label: 'Alcohol-free policy', icon: WineOff },
    { id: 'pet-friendly', label: 'Pet friendly', icon: PawPrint },
    { id: 'child-friendly', label: 'Child-friendly', icon: Baby },
  ],
};

export default function HeaderSearchModal({ filters, onFiltersChange, onSearch }: HeaderSearchModalProps) {
  const [suggestions, setSuggestions] = useState<typeof popularLocations>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [inputFocused, setInputFocused] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  // Debounced search suggestions  
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only show suggestions if user has actually interacted with the field
      if (!inputFocused || !hasUserInteracted) {
        setShowSuggestions(false);
        return;
      }
      
      if (filters.search.length > 0) {
        const filtered = popularLocations.filter(location =>
          location.name.toLowerCase().includes(filters.search.toLowerCase())
        ).slice(0, 8);
        
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      } else {
        const popularOnly = popularLocations.filter(loc => loc.popular).slice(0, 6);
        setSuggestions(popularOnly);
        setShowSuggestions(popularOnly.length > 0);
      }
      setSelectedSuggestionIndex(-1);
    }, 150);

    return () => clearTimeout(timer);
  }, [filters.search, inputFocused, hasUserInteracted]);

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
    setHasUserInteracted(true);
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

  const clearAllFilters = () => {
    updateFilters({
      search: '',
      guests: '',
      amenities: [],
      venueTypes: [],
    });
  };

  return (
    <div className="space-y-8 pb-0">
      {/* Location Search - Advanced Filters Style */}
      <div>
        <h3 className="text-base font-semibold mb-6 text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-600" />
          Location
        </h3>
        
        <div className="relative">
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Where do you want to go?</Label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search by country, city, or venue name"
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              className="pl-11 h-12"
              autoFocus={false}
            />
            
            {/* Auto-suggest Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {suggestions.length > 0 ? (
                  <>
                    {filters.search.length === 0 && (
                      <div className="px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
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
      </div>

      {/* Property Details - Advanced Filters Style */}
      <div>
        <h3 className="text-base font-semibold mb-6 text-gray-900 flex items-center gap-2">
          <Home className="w-5 h-5 text-gray-600" />
          Property Details
        </h3>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Number of guests</Label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Select value={filters.guests} onValueChange={(value) => updateFilters({ guests: value })}>
              <SelectTrigger className="pl-11 h-12">
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                {guestOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="text-sm font-medium text-gray-900 hover:bg-gray-50 focus:bg-gray-50 cursor-pointer px-4 py-2"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Venue Type */}
      <div>
        <h3 className="text-base font-semibold mb-4 text-gray-900 flex items-center gap-2">
          <TreePine className="w-5 h-5 text-gray-600" />
          Venue Type
        </h3>
        <div className="flex flex-wrap gap-2">
          {venueTypeOptions.map((type) => {
            const IconComponent = type.icon;
            const isSelected = filters.venueTypes.includes(type.value);
            return (
              <button
                key={type.value}
                onClick={() => toggleVenueType(type.value)}
                className={`modal-filter-tag ${isSelected ? 'active' : 'inactive'}`}
              >
                <IconComponent className="w-4 h-4" />
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Practice & Wellness */}
      <div>
        <h3 className="text-base font-semibold mb-4 text-gray-900 flex items-center gap-2">
          <Star className="w-5 h-5 text-gray-600" />
          Practice & Wellness
        </h3>
        <div className="flex flex-wrap gap-2">
          {amenityCategories['Practice & Wellness'].map((amenity) => {
            const IconComponent = amenity.icon;
            const isSelected = filters.amenities.includes(amenity.id);
            return (
              <button
                key={amenity.id}
                onClick={() => toggleAmenity(amenity.id)}
                className={`modal-filter-tag ${isSelected ? 'active' : 'inactive'}`}
              >
                <IconComponent className="w-4 h-4" />
                {amenity.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Food & Dining */}
      <div>
        <h3 className="text-base font-semibold mb-4 text-gray-900 flex items-center gap-2">
          <Utensils className="w-5 h-5 text-gray-600" />
          Food & Dining
        </h3>
        <div className="flex flex-wrap gap-2">
          {amenityCategories['Food & Dining'].map((item) => {
            const IconComponent = item.icon;
            const isSelected = filters.amenities.includes(item.id);
            
            return (
              <button
                key={item.id}
                onClick={() => toggleAmenity(item.id)}
                className={`modal-filter-tag ${isSelected ? 'active' : 'inactive'}`}
              >
                <IconComponent className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Living & Comfort */}
      <div>
        <h3 className="text-base font-semibold mb-4 text-gray-900 flex items-center gap-2">
          <Bed className="w-5 h-5 text-gray-600" />
          Living & Comfort
        </h3>
        <div className="flex flex-wrap gap-2">
          {amenityCategories['Living & Comfort'].map((item) => {
            const IconComponent = item.icon;
            const isSelected = filters.amenities.includes(item.id);
            
            return (
              <button
                key={item.id}
                onClick={() => toggleAmenity(item.id)}
                className={`modal-filter-tag ${isSelected ? 'active' : 'inactive'}`}
              >
                <IconComponent className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Extras & Nature */}
      <div>
        <h3 className="text-base font-semibold mb-4 text-gray-900 flex items-center gap-2">
          <TreePine className="w-5 h-5 text-gray-600" />
          Extras & Nature
        </h3>
        <div className="flex flex-wrap gap-2">
          {amenityCategories['Extras & Nature'].map((item) => {
            const IconComponent = item.icon;
            const isSelected = filters.amenities.includes(item.id);
            
            return (
              <button
                key={item.id}
                onClick={() => toggleAmenity(item.id)}
                className={`modal-filter-tag ${isSelected ? 'active' : 'inactive'}`}
              >
                <IconComponent className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Infrastructure & Policies */}
      <div>
        <h3 className="text-base font-semibold mb-4 text-gray-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-gray-600" />
          Infrastructure & Policies
        </h3>
        <div className="flex flex-wrap gap-2">
          {amenityCategories['Infrastructure & Policies'].map((item) => {
            const IconComponent = item.icon;
            const isSelected = filters.amenities.includes(item.id);
            
            return (
              <button
                key={item.id}
                onClick={() => toggleAmenity(item.id)}
                className={`modal-filter-tag ${isSelected ? 'active' : 'inactive'}`}
              >
                <IconComponent className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>


    </div>
  );
}