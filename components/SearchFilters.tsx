import { useState, useRef, useEffect } from "react";
import * as React from "react";
import {
  Search,
  Users,
  SlidersHorizontal,
  MapPin,
  Star,
  Shield,
  Utensils,
  Home,
  X,
  TreePine,
  Bed,
  Bath,
  TreePalm,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContentWithoutCloseButton,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { supabase } from "@/lib/supabase";
import DynamicIcon from "./ui/dynamic-icon";

export interface FilterState {
  search: string;
  guests: string;
  sortBy: string;
  amenities: string[];
  bedrooms: string;
  bathrooms: string;
  venueTypes: string[];
}

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onSearch?: () => void;
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

export default function SearchFilters({
  filters,
  onFiltersChange,
  onSearch,
}: SearchFiltersProps) {
  const [showModal, setShowModal] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterState>(filters);
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
  const [tempCount, setTempCount] = useState(0);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

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
        const filtered = searchableCountries.filter((location) =>
          location.name.toLowerCase().includes(filters.search.toLowerCase())
        );

        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0 && inputFocused);
      } else {
        setSuggestions(searchableCountries);
        setShowSuggestions(inputFocused && searchableCountries.length > 0);
      }
      setSelectedSuggestionIndex(-1);
    }, 150);

    return () => clearTimeout(timer);
  }, [filters.search, inputFocused]);

  useEffect(() => {
    if (filters.search.trim().length > 0) {
      const timer = setTimeout(async () => {
        try {
          const params = new URLSearchParams();
          params.append("search", filters.search);
          if (filters.guests) {
            params.append("guests", filters.guests);
          }
          if (tempFilters.bedrooms) {
            params.append("bedrooms", tempFilters.bedrooms);
          }
          if (tempFilters.bathrooms) {
            params.append("bathrooms", tempFilters.bathrooms);
          }
          tempFilters.venueTypes.forEach((type) => {
            params.append("venueTypes", type);
          });
          tempFilters.amenities.forEach((amenity) => {
            params.append("amenities", amenity);
          });
          const response = await fetch(
            `/api/venues/count?${params.toString()}`
          );
          const data = await response.json();
          if (response.ok) {
            setTempCount(data.count || 0);
          } else {
            console.error("Failed to fetch count:", data.error);
            setTempCount(0);
          }
        } catch (error) {
          console.error("Error fetching count:", error);
          setTempCount(0);
        }
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setTempCount(0);
    }
  }, [
    filters.search,
    filters.guests,
    tempFilters.bedrooms,
    tempFilters.bathrooms,
    tempFilters.venueTypes,
    tempFilters.amenities,
  ]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (
          selectedSuggestionIndex >= 0 &&
          suggestions[selectedSuggestionIndex]
        ) {
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
      case "Escape":
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        searchInputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion: {
    name: string;
    popular: boolean;
  }) => {
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
    setTempFilters((prev) => ({ ...prev, ...updates }));
  };

  const toggleAmenity = (amenityId: string) => {
    setTempFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const toggleVenueType = (venueTypeId: string) => {
    setTempFilters((prev) => ({
      ...prev,
      venueTypes: prev.venueTypes.includes(venueTypeId)
        ? prev.venueTypes.filter((id) => id !== venueTypeId)
        : [...prev.venueTypes, venueTypeId],
    }));
  };

  const applyFilters = () => {
    onFiltersChange(tempFilters);
    setShowModal(false);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      search: filters.search,
      guests: filters.guests,
      sortBy: filters.sortBy,
      amenities: [],
      bedrooms: "",
      bathrooms: "",
      venueTypes: [],
    };
    setTempFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    setShowModal(false);
  };

  const openModal = () => {
    setTempFilters(filters);
    setShowModal(true);
  };

  const hasActiveFilters =
    filters.amenities.length > 0 ||
    filters.bedrooms ||
    filters.bathrooms ||
    filters.venueTypes.length > 0;

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
            className="w-full h-12 pl-11 pr-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 placeholder:text-gray-500 placeholder:font-normal transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:bg-white focus:outline-none"
            style={{ height: "48px", lineHeight: "1.5" }}
          />

          {/* Auto-suggest Dropdown */}
          {showSuggestions && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
            >
              {suggestions.length > 0 ? (
                <>
                  {filters.search.length === 0 &&
                    searchableCountries.filter((sc) => sc.popular).length >
                    0 && (
                      <div className="px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
                        Popular destinations
                      </div>
                    )}
                  {suggestions
                    .filter((suggestion) => suggestion.popular)
                    .map((suggestion, index) => (
                      <button
                        key={`${suggestion.name}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 flex items-center gap-3 ${index === selectedSuggestionIndex ? "bg-gray-50" : ""
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
                  {filters.search.length === 0 &&
                    searchableCountries.filter((sc) => !sc.popular).length >
                    0 && (
                      <div className="px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
                        General destinations
                      </div>
                    )}
                  {suggestions
                    .filter((suggestion) => !suggestion.popular)
                    .map((suggestion, index) => (
                      <button
                        key={`${suggestion.name}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 flex items-center gap-3 ${index === selectedSuggestionIndex ? "bg-gray-50" : ""
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

        {/* Secondary filters - Row on mobile, inline on desktop */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Guests */}
          <Select
            value={filters.guests}
            onValueChange={(value) => updateFilters({ guests: value })}
          >
            <SelectTrigger
              className="flex-1 lg:w-40 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:bg-white"
              style={{
                height: "48px",
                lineHeight: "1.5",
                minHeight: "48px",
                maxHeight: "48px",
              }}
            >
              <Users className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
              <SelectValue placeholder="Guests" />
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

          {/* More Filters */}
          <button
            onClick={openModal}
            className={`flex-1 lg:flex-none px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:bg-white focus:outline-none flex items-center justify-center gap-2.5 whitespace-nowrap ${hasActiveFilters ? "border-gray-900 bg-gray-50" : ""
              }`}
            style={{
              height: "48px",
              lineHeight: "1.5",
              minHeight: "48px",
              maxHeight: "48px",
            }}
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
              className="flex-1 lg:flex-none px-6 bg-gray-600 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:ring-gray-600/10 focus:outline-none flex items-center justify-center gap-2 whitespace-nowrap"
              style={{
                height: "48px",
                lineHeight: "1.5",
                minHeight: "48px",
                maxHeight: "48px",
              }}
            >
              <Search className="w-4 h-4 flex-shrink-0" />
              <span>Search</span>
            </button>
          )}
        </div>
      </div>

      {/* Extended Filters Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContentWithoutCloseButton className="!max-w-none !w-[95vw] sm:!w-[85vw] md:!w-[70vw] lg:!w-[50vw] xl:!w-[32vw] h-[80vh] sm:h-[70vh] md:h-[65vh] lg:h-[57vh] p-0 flex flex-col rounded-xl border border-gray-200 shadow-xl">
          <div className="flex flex-col h-full">
            {/* Header */}
            <DialogHeader className="px-6 py-5 border-b border-gray-100 bg-white relative rounded-t-xl !text-left">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <DialogTitle className="text-2xl font-semibold text-gray-900 text-left">
                    Advanced Filters
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-600 mt-1 text-left">
                    Refine your search with detailed criteria to find the
                    perfect retreat venue.
                  </DialogDescription>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 min-w-8 min-h-8 flex-shrink-0 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 flex-shrink-0" />
                </button>
              </div>
            </DialogHeader>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white rounded-t-none modal-content-height">
              <div className="space-y-8">
                {/* Property Details */}
                <div>
                  <h3 className="text-base font-semibold mb-6 text-gray-900 flex items-center gap-2">
                    <Home className="w-5 h-5 text-gray-600" />
                    Property Details
                  </h3>

                  {/* Bedrooms & Bathrooms */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">
                        Bedrooms
                      </Label>
                      <div className="relative">
                        <Bed className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="Any"
                          value={tempFilters.bedrooms}
                          onChange={(e) =>
                            updateTempFilters({ bedrooms: e.target.value })
                          }
                          className="pl-11 h-12"
                          min="0"
                          max="50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">
                        Bathrooms
                      </Label>
                      <div className="relative">
                        <Bath className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="Any"
                          value={tempFilters.bathrooms}
                          onChange={(e) =>
                            updateTempFilters({ bathrooms: e.target.value })
                          }
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
                  <div className="flex flex-wrap gap-2">
                    {venueTypeOptions.map((type) => {
                      const isSelected = tempFilters.venueTypes.includes(
                        type.id
                      );
                      return (
                        <button
                          key={type.id}
                          onClick={() => toggleVenueType(type.id)}
                          className={`modal-filter-tag ${isSelected ? "active" : "inactive"
                            }`}
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
                    {amenityCategories["Practice & Wellness"].map((amenity) => {
                      const isSelected = tempFilters.amenities.includes(
                        amenity.id
                      );
                      return (
                        <button
                          key={amenity.id}
                          onClick={() => toggleAmenity(amenity.id)}
                          className={`modal-filter-tag ${isSelected ? "active" : "inactive"
                            }`}
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
                    {amenityCategories["Food & Dining"].map((item) => {
                      const isSelected = tempFilters.amenities.includes(
                        item.id
                      );

                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleAmenity(item.id)}
                          className={`modal-filter-tag ${isSelected ? "active" : "inactive"
                            }`}
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
                    {amenityCategories["Living & Comfort"].map((item) => {
                      const isSelected = tempFilters.amenities.includes(
                        item.id
                      );

                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleAmenity(item.id)}
                          className={`modal-filter-tag ${isSelected ? "active" : "inactive"
                            }`}
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
                    <TreePalm className="w-5 h-5 text-gray-600" />
                    Extras & Nature
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {amenityCategories["Extras & Nature"].map((item) => {
                      const isSelected = tempFilters.amenities.includes(
                        item.id
                      );

                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleAmenity(item.id)}
                          className={`modal-filter-tag ${isSelected ? "active" : "inactive"
                            }`}
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
                    {amenityCategories["Infrastructure & Policies"].map(
                      (item) => {
                        const isSelected = tempFilters.amenities.includes(
                          item.id
                        );

                        return (
                          <button
                            key={item.id}
                            onClick={() => toggleAmenity(item.id)}
                            className={`modal-filter-tag ${isSelected ? "active" : "inactive"
                              }`}
                          >
                            <DynamicIcon
                              iconName={item.icon.name}
                              className="w-4 h-4"
                            />
                            {item.name}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-white rounded-b-xl">
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={clearAllFilters}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Clear all
                </button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <Button
                    onClick={applyFilters}
                    className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Show {filters.search.trim() === "" ? "" : tempCount}{" "}
                    retreats
                  </Button>
                </div>
              </div>
              {filters.search.trim() === "" && (
                <span className="text-xs text-right block mt-2 text-gray-600">
                  Select a location to see the count
                </span>
              )}
            </div>
          </div>
        </DialogContentWithoutCloseButton>
      </Dialog>
    </>
  );
}
