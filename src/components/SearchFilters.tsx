import { useState, useRef, useEffect } from "react";
import { Search, Users, DollarSign, SlidersHorizontal, MapPin, Star, Shield, Utensils, Home, Wifi, Car } from "lucide-react";
import { TreePine, Heart, Waves, Dumbbell, ChefHat, Clock, Mic, Accessibility, Bed, Bath, Ruler, Coffee, Grape, Leaf, Pizza, BellRing, CreditCard, Award, CheckCircle, Camera } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export interface FilterState {
  search: string;
  guests: string;
  priceRange: string;
  sortBy: string;
  amenities: string[];
  // New filter fields
  area: number[];
  bedrooms: string;
  bathrooms: string;
  venueTypes: string[];
  foodOptions: string[];
  cancellationPolicy: string;
  hasReviews: boolean;
  topRated: boolean;
}

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultCount: number;
  onSearch?: () => void;
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
  { name: 'France', type: 'country', popular: true },
  { name: 'Italy', type: 'country', popular: true },
  { name: 'Spain', type: 'country', popular: true },
  { name: 'Morocco', type: 'country', popular: true },
  { name: 'Guatemala', type: 'country', popular: false },
  { name: 'Nepal', type: 'country', popular: false },
  { name: 'Sri Lanka', type: 'country', popular: false },
  
  // Cities
  { name: 'Ubud, Indonesia', type: 'city', popular: true },
  { name: 'Rishikesh, India', type: 'city', popular: true },
  { name: 'Tulum, Mexico', type: 'city', popular: true },
  { name: 'Sedona, United States', type: 'city', popular: true },
  { name: 'Nosara, Costa Rica', type: 'city', popular: true },
  { name: 'Byron Bay, Australia', type: 'city', popular: true },
  { name: 'Sacred Valley, Peru', type: 'city', popular: true },
  { name: 'Sintra, Portugal', type: 'city', popular: true },
  { name: 'San Marcos, Guatemala', type: 'city', popular: false },
  { name: 'Koh Samui, Thailand', type: 'city', popular: true },
  { name: 'Mykonos, Greece', type: 'city', popular: true },
  { name: 'Provence, France', type: 'city', popular: true },
  { name: 'Tuscany, Italy', type: 'city', popular: true },
  { name: 'Ibiza, Spain', type: 'city', popular: true },
  { name: 'Marrakech, Morocco', type: 'city', popular: true },
  { name: 'Paris, France', type: 'city', popular: false },
  { name: 'London, United Kingdom', type: 'city', popular: false },
  { name: 'New York, United States', type: 'city', popular: false },
  { name: 'Los Angeles, United States', type: 'city', popular: false },
  { name: 'Miami, United States', type: 'city', popular: false },
];

// Filter options
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

const bedroomOptions = [
  { value: '1-5', label: '1–5 bedrooms' },
  { value: '6-10', label: '6–10 bedrooms' },
  { value: '11-20', label: '11–20 bedrooms' },
  { value: '21-30', label: '21–30 bedrooms' },
  { value: '30+', label: '30+ bedrooms' },
];

const bathroomOptions = [
  { value: '1-3', label: '1–3 bathrooms' },
  { value: '4-6', label: '4–6 bathrooms' },
  { value: '7-10', label: '7–10 bathrooms' },
  { value: '11-15', label: '11–15 bathrooms' },
  { value: '15+', label: '15+ bathrooms' },
];

const venueTypeOptions = [
  { value: 'resort', label: 'Resort', description: 'Full-service retreat resort' },
  { value: 'villa', label: 'Private Villa', description: 'Exclusive private property' },
  { value: 'hotel', label: 'Boutique Hotel', description: 'Wellness-focused hotel' },
  { value: 'camp', label: 'Retreat Camp', description: 'Nature-based camp setting' },
  { value: 'center', label: 'Wellness Center', description: 'Dedicated wellness facility' },
  { value: 'monastery', label: 'Monastery/Ashram', description: 'Spiritual retreat space' },
];

const cancellationOptions = [
  { value: 'flexible', label: 'Flexible (Free until 7 days)' },
  { value: 'moderate', label: 'Moderate (Free until 14 days)' },
  { value: 'strict', label: 'Strict (Free until 30 days)' },
  { value: 'super-strict', label: 'Super Strict (50% refund only)' },
];

// Comprehensive amenity categories
const amenityCategories = {
  'Core Retreat Spaces': [
    { id: 'yoga-hall', label: 'Yoga Hall', icon: TreePine },
    { id: 'meditation-hall', label: 'Meditation Hall', icon: Heart },
    { id: 'workshop-room', label: 'Workshop Room', icon: Users },
    { id: 'conference-room', label: 'Conference Room', icon: Mic },
    { id: 'breakout-rooms', label: 'Breakout Rooms', icon: Home },
    { id: 'outdoor-pavilion', label: 'Outdoor Pavilion', icon: TreePine },
    { id: 'therapy-rooms', label: 'Therapy Rooms', icon: Heart },
    { id: 'dance-studio', label: 'Dance Studio', icon: Users },
  ],
  'Wellness & Recreation': [
    { id: 'pool-heated', label: 'Heated Pool', icon: Waves },
    { id: 'pool-infinity', label: 'Infinity Pool', icon: Waves },
    { id: 'hot-tub', label: 'Hot Tub/Jacuzzi', icon: Waves },
    { id: 'sauna-steam', label: 'Sauna/Steam', icon: Waves },
    { id: 'spa-massage', label: 'Spa & Massage', icon: Heart },
    { id: 'fitness-gym', label: 'Fitness Center', icon: Dumbbell },
    { id: 'nature-trails', label: 'Nature Trails', icon: TreePine },
    { id: 'beach-access', label: 'Beach Access', icon: Waves },
    { id: 'tennis-court', label: 'Tennis Court', icon: Dumbbell },
    { id: 'volleyball-court', label: 'Volleyball Court', icon: Dumbbell },
  ],
  'Infrastructure & Technology': [
    { id: 'high-speed-wifi', label: 'High-speed Wi-Fi', icon: Wifi },
    { id: 'professional-av', label: 'Professional AV', icon: Mic },
    { id: 'sound-system', label: 'Sound System', icon: Mic },
    { id: 'projector-screen', label: 'Projector & Screen', icon: Mic },
    { id: 'air-conditioning', label: 'Air Conditioning', icon: Home },
    { id: 'heating-system', label: 'Heating System', icon: Home },
    { id: 'backup-generator', label: 'Backup Generator', icon: Home },
    { id: 'water-filtration', label: 'Water Filtration', icon: Waves },
  ],
  'Logistics & Services': [
    { id: 'airport-transfer', label: 'Airport Transfer', icon: Car },
    { id: 'concierge-service', label: 'Concierge Service', icon: BellRing },
    { id: 'housekeeping', label: 'Daily Housekeeping', icon: Home },
    { id: 'laundry-service', label: 'Laundry Service', icon: Home },
    { id: 'onsite-staff', label: 'On-site Staff 24/7', icon: Clock },
    { id: 'parking', label: 'Free Parking', icon: Car },
    { id: 'accessibility', label: 'Accessibility Features', icon: Accessibility },
    { id: 'pet-friendly', label: 'Pet Friendly', icon: Heart },
  ],
};

const foodCategories = {
  'Dietary Options': [
    { id: 'vegetarian', label: 'Vegetarian', icon: Leaf },
    { id: 'vegan', label: 'Vegan', icon: Leaf },
    { id: 'raw-food', label: 'Raw Food', icon: Leaf },
    { id: 'gluten-free', label: 'Gluten-Free', icon: Leaf },
    { id: 'organic', label: 'Organic', icon: Leaf },
    { id: 'local-sourced', label: 'Locally Sourced', icon: Leaf },
  ],
  'Meal Services': [
    { id: 'private-chef', label: 'Private Chef', icon: ChefHat },
    { id: 'commercial-kitchen', label: 'Commercial Kitchen', icon: Utensils },
    { id: 'catering-service', label: 'Catering Service', icon: Utensils },
    { id: 'cooking-classes', label: 'Cooking Classes', icon: ChefHat },
    { id: 'juice-bar', label: 'Juice Bar', icon: Coffee },
    { id: 'tea-ceremony', label: 'Tea Ceremony', icon: Coffee },
  ],
};

export default function SearchFilters({ filters, onFiltersChange, resultCount, onSearch }: SearchFiltersProps) {
  const [showModal, setShowModal] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterState>(filters);
  
  // Auto-suggest states
  const [suggestions, setSuggestions] = useState<typeof popularLocations>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [inputFocused, setInputFocused] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  // Initialize temp filters when modal opens
  useEffect(() => {
    if (showModal) {
      setTempFilters(filters);
    }
  }, [showModal, filters]);

  // Debounced search suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.search.length > 0) {
        const filtered = popularLocations.filter(location =>
          location.name.toLowerCase().includes(filters.search.toLowerCase())
        ).slice(0, 8);
        
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
        } else if (onSearch) {
          // If no suggestion selected but onSearch is provided, trigger search
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

  const updateTempFilters = (updates: Partial<FilterState>) => {
    setTempFilters(prev => ({ ...prev, ...updates }));
  };

  const toggleAmenity = (amenityId: string) => {
    setTempFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId) 
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const toggleFoodOption = (foodId: string) => {
    setTempFilters(prev => ({
      ...prev,
      foodOptions: prev.foodOptions.includes(foodId) 
        ? prev.foodOptions.filter(id => id !== foodId)
        : [...prev.foodOptions, foodId]
    }));
  };

  const toggleVenueType = (venueTypeId: string) => {
    setTempFilters(prev => ({
      ...prev,
      venueTypes: prev.venueTypes.includes(venueTypeId) 
        ? prev.venueTypes.filter(id => id !== venueTypeId)
        : [...prev.venueTypes, venueTypeId]
    }));
  };

  const applyFilters = () => {
    onFiltersChange(tempFilters);
    setShowModal(false);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      search: filters.search,
      guests: '',
      priceRange: '',
      sortBy: 'relevance',
      amenities: [],
      area: [100, 10000],
      bedrooms: '',
      bathrooms: '',
      venueTypes: [],
      foodOptions: [],
      cancellationPolicy: '',
      hasReviews: false,
      topRated: false,
    };
    setTempFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    setShowModal(false);
  };

  const openModal = () => {
    setTempFilters(filters);
    setShowModal(true);
  };

  const hasActiveFilters = filters.guests || filters.priceRange || filters.amenities.length > 0 || 
    filters.bedrooms || filters.bathrooms || filters.venueTypes.length > 0 || filters.foodOptions.length > 0 ||
    filters.cancellationPolicy || filters.hasReviews || filters.topRated;

  return (
    <>
      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full max-w-5xl mx-auto">
        {/* Search Field with Auto-suggest - Full width on mobile, flex-1 on desktop */}
        <div className="relative w-full lg:flex-1 lg:max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search by country, city, or venue name"
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="w-full h-12 pl-11 pr-4 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-900 placeholder:text-gray-500 placeholder:font-normal transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:bg-white focus:outline-none"
            style={{ height: '48px', lineHeight: '1.5' }}
          />
          
          {/* Auto-suggest Dropdown */}
          {showSuggestions && (
            <div 
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto"
            >
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

        {/* Secondary filters - Row on mobile, inline on desktop */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Guests */}
          <Select value={filters.guests} onValueChange={(value) => updateFilters({ guests: value })}>
            <SelectTrigger 
              className="flex-1 lg:w-40 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-900 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:bg-white"
              style={{ height: '48px', lineHeight: '1.5', minHeight: '48px', maxHeight: '48px' }}
            >
              <Users className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
              <SelectValue placeholder="Guests" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg">
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

          {/* More Filters */}
          <button
            onClick={openModal}
            className={`flex-1 lg:flex-none px-4 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-900 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:bg-white focus:outline-none flex items-center justify-center gap-2.5 whitespace-nowrap ${hasActiveFilters ? 'border-gray-900 bg-gray-50' : ''}`}
            style={{ height: '48px', lineHeight: '1.5', minHeight: '48px', maxHeight: '48px' }}
          >
            <SlidersHorizontal className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>More filters</span>
            {hasActiveFilters && (
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full flex-shrink-0"></span>
            )}
          </button>

          {/* Search Button - only show when onSearch is provided */}
          {onSearch && (
            <button
              onClick={onSearch}
              className="flex-1 lg:flex-none px-6 bg-gray-600 text-white rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:ring-gray-600/10 focus:outline-none flex items-center justify-center gap-2 whitespace-nowrap"
              style={{ height: '48px', lineHeight: '1.5', minHeight: '48px', maxHeight: '48px' }}
            >
              <Search className="w-4 h-4 flex-shrink-0" />
              <span>Search</span>
            </button>
          )}
        </div>
      </div>

      {/* Extended Filters Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl h-[85vh] p-0 flex flex-col rounded-lg border border-gray-200 shadow-xl">
          <div className="flex flex-col h-full">
            {/* Header */}
            <DialogHeader className="px-6 py-5 border-b border-gray-100 bg-white">
              <DialogTitle className="text-xl font-semibold text-gray-900">Advanced Filters</DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-1">
                Refine your search with detailed criteria to find the perfect retreat venue.
              </DialogDescription>
            </DialogHeader>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-white" style={{ maxHeight: 'calc(85vh - 180px)' }}>
              <div className="space-y-8">
                {/* Property Details */}
                <div>
                  <h3 className="text-base font-semibold mb-6 text-gray-900 flex items-center gap-2">
                    <Home className="w-5 h-5 text-gray-600" />
                    Property Details
                  </h3>
                  
                  {/* Area Size Slider */}
                  <div className="mb-8">
                    <Label className="text-sm font-medium text-gray-700 mb-4 block">
                      Total Area: {tempFilters.area?.[0] || 100} - {tempFilters.area?.[1] || 10000} sq ft
                    </Label>
                    <Slider
                      value={tempFilters.area || [100, 10000]}
                      onValueChange={(value) => updateTempFilters({ area: value })}
                      max={20000}
                      min={100}
                      step={100}
                      className="mb-3"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>100 sq ft</span>
                      <span>20,000 sq ft</span>
                    </div>
                  </div>

                  {/* Bedrooms & Bathrooms */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">Bedrooms</Label>
                      <div className="relative">
                        <Bed className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="Any"
                          value={tempFilters.bedrooms}
                          onChange={(e) => updateTempFilters({ bedrooms: e.target.value })}
                          className="pl-11 h-12"
                          min="0"
                          max="50"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">Bathrooms</Label>
                      <div className="relative">
                        <Bath className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="Any"
                          value={tempFilters.bathrooms}
                          onChange={(e) => updateTempFilters({ bathrooms: e.target.value })}
                          className="pl-11 h-12"
                          min="0"
                          max="30"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Venue Type */}
                <div>
                  <h3 className="text-base font-semibold mb-4 text-gray-900 flex items-center gap-2">
                    <TreePine className="w-5 h-5 text-gray-600" />
                    Venue Type
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {venueTypeOptions.map((type) => {
                      const isSelected = tempFilters.venueTypes.includes(type.value);
                      return (
                        <div key={type.value} className="flex items-center space-x-3">
                          <Checkbox
                            id={type.value}
                            checked={isSelected}
                            onCheckedChange={() => toggleVenueType(type.value)}
                          />
                          <Label htmlFor={type.value} className="text-sm font-medium text-gray-900 cursor-pointer">
                            {type.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Core Amenities */}
                <div>
                  <h3 className="text-base font-semibold mb-4 text-gray-900 flex items-center gap-2">
                    <Star className="w-5 h-5 text-gray-600" />
                    Core Amenities
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {amenityCategories['Core Retreat Spaces'].concat(amenityCategories['Wellness & Recreation']).map((amenity) => {
                      const IconComponent = amenity.icon;
                      const isSelected = tempFilters.amenities.includes(amenity.id);
                      return (
                        <div key={amenity.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={amenity.id}
                            checked={isSelected}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                toggleAmenity(amenity.id);
                              } else {
                                toggleAmenity(amenity.id);
                              }
                            }}
                          />
                          <Label htmlFor={amenity.id} className="flex items-center gap-2 text-sm cursor-pointer">
                            <IconComponent className="w-4 h-4 text-gray-600" />
                            {amenity.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Food & Services */}
                <div>
                  <h3 className="text-base font-semibold mb-4 text-gray-900 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-gray-600" />
                    Food & Services
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.values(foodCategories).flat().concat(amenityCategories['Logistics & Services']).map((item) => {
                      const IconComponent = item.icon;
                      const isFood = tempFilters.foodOptions.includes(item.id);
                      const isAmenity = tempFilters.amenities.includes(item.id);
                      const isSelected = isFood || isAmenity;
                      
                      const handleChange = (checked: boolean) => {
                        if (Object.values(foodCategories).flat().some(food => food.id === item.id)) {
                          toggleFoodOption(item.id);
                        } else {
                          toggleAmenity(item.id);
                        }
                      };
                      
                      return (
                        <div key={item.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={item.id}
                            checked={isSelected}
                            onCheckedChange={handleChange}
                          />
                          <Label htmlFor={item.id} className="flex items-center gap-2 text-sm cursor-pointer">
                            <IconComponent className="w-4 h-4 text-gray-600" />
                            {item.label}
                          </Label>
                        </div>
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
                  
                  {/* Infrastructure Amenities */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3 text-gray-700">Infrastructure</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {amenityCategories['Infrastructure & Technology'].map((amenity) => {
                        const IconComponent = amenity.icon;
                        const isSelected = tempFilters.amenities.includes(amenity.id);
                        return (
                          <div key={amenity.id} className="flex items-center space-x-3">
                            <Checkbox
                              id={amenity.id}
                              checked={isSelected}
                              onCheckedChange={() => toggleAmenity(amenity.id)}
                            />
                            <Label htmlFor={amenity.id} className="flex items-center gap-2 text-sm cursor-pointer">
                              <IconComponent className="w-4 h-4 text-gray-600" />
                              {amenity.label}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Cancellation Policy */}
                  <div className="mb-6">
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Cancellation Policy</Label>
                    <Select value={tempFilters.cancellationPolicy} onValueChange={(value) => updateTempFilters({ cancellationPolicy: value })}>
                      <SelectTrigger className="h-12">
                        <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                        <SelectValue placeholder="Any policy" />
                      </SelectTrigger>
                      <SelectContent>
                        {cancellationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quality Toggles */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">Venues with Reviews</div>
                          <div className="text-sm text-gray-500">Only show venues that have guest reviews</div>
                        </div>
                      </div>
                      <Switch
                        checked={tempFilters.hasReviews}
                        onCheckedChange={(checked) => updateTempFilters({ hasReviews: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">Top Rated Only</div>
                          <div className="text-sm text-gray-500">Show only venues with 4.5+ star rating</div>
                        </div>
                      </div>
                      <Switch
                        checked={tempFilters.topRated}
                        onCheckedChange={(checked) => updateTempFilters({ topRated: checked })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 bg-white px-6 py-5">
              <div className="flex justify-between items-center gap-4">
                <Button 
                  variant="ghost" 
                  onClick={clearAllFilters}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium transition-all duration-200 h-12 px-6"
                >
                  Clear all filters
                </Button>
                <Button 
                  onClick={applyFilters} 
                  className="bg-gray-900 text-white hover:bg-gray-800 px-8 h-12 rounded-md font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Show {resultCount} venues
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}