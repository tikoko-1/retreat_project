import { useState, useRef, useEffect } from "react";
import { Users, MapPin, Star, Utensils, Home, Bed, Shield } from "lucide-react";
import { TreePine } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { FilterState } from "./SearchFilters";
import { supabase } from "@/lib/supabase";
import DynamicIcon from "./ui/dynamic-icon";

interface HeaderSearchModalProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onSearch: () => void;
}

// Popular retreat countries for auto-suggest
const popularCountries = [
  { name: "Indonesia (Bali)", popular: true },
  { name: "Thailand", popular: true },
  { name: "India", popular: true },
  { name: "Sri Lanka", popular: true },
  { name: "Nepal", popular: true },
  { name: "Costa Rica", popular: true },
  { name: "Mexico", popular: true },
  { name: "United States", popular: true },
  { name: "Canada", popular: true },
  { name: "Portugal", popular: true },
  { name: "Spain", popular: true },
  { name: "Greece", popular: true },
  { name: "Italy", popular: true },
  { name: "France", popular: true },
  { name: "Turkey", popular: true },
  { name: "Morocco", popular: true },
  { name: "Egypt", popular: true },
  { name: "South Africa", popular: true },
  { name: "Peru", popular: true },
  { name: "Brazil", popular: true },
  { name: "Colombia", popular: true },
  { name: "Chile", popular: true },
  { name: "Argentina", popular: true },
  { name: "Australia", popular: true },
  { name: "New Zealand", popular: true },
  { name: "Japan", popular: true },
  { name: "Vietnam", popular: true },
  { name: "Cambodia", popular: true },
  { name: "Philippines", popular: true },
  { name: "Malaysia", popular: true },
];

// Filter options
const guestOptions = [
  { value: "1-7", label: "1–7 guests" },
  { value: "8-12", label: "8–12 guests" },
  { value: "13-15", label: "13–15 guests" },
  { value: "16-19", label: "16–19 guests" },
  { value: "20-24", label: "20–24 guests" },
  { value: "25-29", label: "25–29 guests" },
  { value: "30-34", label: "30–34 guests" },
  { value: "35-39", label: "35–39 guests" },
  { value: "40-49", label: "40–49 guests" },
  { value: "50-59", label: "50–59 guests" },
  { value: "60-69", label: "60–69 guests" },
  { value: "70-99", label: "70–99 guests" },
  { value: "100+", label: "100+ guests" },
];

export default function HeaderSearchModal({ filters, onFiltersChange, onSearch }: HeaderSearchModalProps) {
  const [suggestions, setSuggestions] = useState<
    { name: string; popular: boolean }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [inputFocused, setInputFocused] = useState(false);
  const [searchableCountries, setSearchableCountries] = useState<
    { name: string; popular: boolean }[]
  >([...popularCountries]);
  const [venueTypeOptions, setVenueTypeOptions] = useState<
    { name: string; icon: { name: string }; slug: string; id: string }[]
  >([]);
  const [amenityCategories, setAmenityCategories] = useState<{
    "Practice & Wellness": {
      id: string;
      name: string;
      slug: string;
      icon: { name: string };
    }[];
    "Food & Dining": {
      id: string;
      name: string;
      slug: string;
      icon: { name: string };
    }[];
    "Living & Comfort": {
      id: string;
      name: string;
      slug: string;
      icon: { name: string };
    }[];
    "Extras & Nature": {
      id: string;
      name: string;
      slug: string;
      icon: { name: string };
    }[];
    "Infrastructure & Policies": {
      id: string;
      name: string;
      slug: string;
      icon: { name: string };
    }[];
  }>({
    "Practice & Wellness": [
      {
        id: "",
        name: "",
        slug: "",
        icon: { name: "" },
      },
    ],
    "Food & Dining": [
      {
        id: "",
        name: "",
        slug: "",
        icon: { name: "" },
      },
    ],
    "Living & Comfort": [
      {
        id: "",
        name: "",
        slug: "",
        icon: { name: "" },
      },
    ],
    "Extras & Nature": [
      {
        id: "",
        name: "",
        slug: "",
        icon: { name: "" },
      },
    ],
    "Infrastructure & Policies": [
      {
        id: "",
        name: "",
        slug: "",
        icon: { name: "" },
      },
    ],
  });
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  useEffect(() => {
    const loadSearchableCountries = async () => {
      const { data: possibleCountries } = await supabase
        .from("venues")
        .select("country")
        .eq("status", "published");
      if (possibleCountries) {
        const uniqueCountries = Array.from(
          new Set(
            possibleCountries.map((possibleCountry) => possibleCountry.country)
          )
        ).filter(
          (country) => !popularCountries.map((pc) => pc.name).includes(country)
        );
        setSearchableCountries([
          ...popularCountries,
          ...uniqueCountries.map((country) => ({
            name: country,
            popular: false,
          })),
        ]);
      }
    };

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
        const groupedAmenities = allAmenities.reduce((acc, amenity) => {
          const group = amenity.group;
          if (!acc[group]) {
            acc[group] = [];
          }
          acc[group].push(amenity);
          return acc;
        }, {} as Record<string, any[]>);
        setAmenityCategories(groupedAmenities);
      }
    };

    Promise.all([loadSearchableCountries(), loadVenueTypes(), loadAmenities()]);
  }, []);

  // Debounced search suggestions  
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only show suggestions if user has actually interacted with the field
      if (!inputFocused || !hasUserInteracted) {
        setShowSuggestions(false);
        return;
      }

      if (filters.search.length > 0) {
        const filtered = searchableCountries.filter(location =>
          location.name.toLowerCase().includes(filters.search.toLowerCase())
        ).slice(0, 8);

        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      } else {
        setSuggestions(searchableCountries);
        setShowSuggestions(searchableCountries.length > 0);
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

  const handleSuggestionClick = (suggestion: { name: string; popular: boolean }) => {
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
                    {filters.search.length === 0 && searchableCountries.filter((sc) => sc.popular).length > 0 && (
                      <div className="px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
                        Popular destinations
                      </div>
                    )}
                    {suggestions.filter((suggestion) => suggestion.popular).map((suggestion, index) => (
                      <button
                        key={`${suggestion.name}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 flex items-center gap-3 ${index === selectedSuggestionIndex ? 'bg-gray-50' : ''
                          }`}
                      >
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900">
                            {suggestion.name}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">
                            Country
                          </div>
                        </div>
                      </button>
                    ))}
                    {filters.search.length === 0 && searchableCountries.filter((sc) => !sc.popular).length > 0 && (
                      <div className="px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
                        General destinations
                      </div>
                    )}
                    {suggestions.filter((suggestion) => !suggestion.popular).map((suggestion, index) => (
                      <button
                        key={`${suggestion.name}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 flex items-center gap-3 ${index === selectedSuggestionIndex ? 'bg-gray-50' : ''
                          }`}
                      >
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900">
                            {suggestion.name}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">
                            Country
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
            const isSelected = filters.venueTypes.includes(type.id);
            return (
              <button
                key={type.id}
                onClick={() => toggleVenueType(type.id)}
                className={`modal-filter-tag ${isSelected ? 'active' : 'inactive'}`}
              >
                <DynamicIcon
                  iconName={type.icon.name}
                  className="w-4 h-4"
                />
                {type.name}
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
            const isSelected = filters.amenities.includes(amenity.id);
            return (
              <button
                key={amenity.id}
                onClick={() => toggleAmenity(amenity.id)}
                className={`modal-filter-tag ${isSelected ? 'active' : 'inactive'}`}
              >
                <DynamicIcon
                  iconName={amenity.icon.name}
                  className="w-4 h-4"
                />
                {amenity.name}
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
            const isSelected = filters.amenities.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => toggleAmenity(item.id)}
                className={`modal-filter-tag ${isSelected ? 'active' : 'inactive'}`}
              >
                <DynamicIcon
                  iconName={item.icon.name}
                  className="w-4 h-4"
                />
                {item.name}
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
            const isSelected = filters.amenities.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => toggleAmenity(item.id)}
                className={`modal-filter-tag ${isSelected ? 'active' : 'inactive'}`}
              >
                <DynamicIcon
                  iconName={item.icon.name}
                  className="w-4 h-4"
                />
                {item.name}
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
            const isSelected = filters.amenities.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => toggleAmenity(item.id)}
                className={`modal-filter-tag ${isSelected ? 'active' : 'inactive'}`}
              >
                <DynamicIcon
                  iconName={item.icon.name}
                  className="w-4 h-4"
                />
                {item.name}
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
            const isSelected = filters.amenities.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => toggleAmenity(item.id)}
                className={`modal-filter-tag ${isSelected ? 'active' : 'inactive'}`}
              >
                <DynamicIcon
                  iconName={item.icon.name}
                  className="w-4 h-4"
                />
                {item.name}
              </button>
            );
          })}
        </div>
      </div>


    </div>
  );
}