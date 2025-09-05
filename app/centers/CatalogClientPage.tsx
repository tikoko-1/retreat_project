"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchFilters from "@/components/SearchFilters";
import ActiveFilters from "@/components/ActiveFilters";
import RetreatCenterCard, {
  RetreatCenter,
} from "@/components/RetreatCenterCard";
import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import VenueCardSkeleton from "@/components/VenueCardSkeleton";
import { FilterState } from "@/types";

interface CatalogClientPageProps {
  initialSearchParams: { [key: string]: string | string[] | undefined };
}

export default function CatalogClientPage({
  initialSearchParams,
}: CatalogClientPageProps) {
  const router = useRouter();

  const [filters, setFilters] = useState<FilterState>({
    search: (initialSearchParams.search as string) || "",
    guests: (initialSearchParams.guests as string) || "",
    sortBy: (initialSearchParams.sortBy as string) || "relevance",
    amenities: Array.isArray(initialSearchParams.amenities)
      ? initialSearchParams.amenities
      : initialSearchParams.amenities
      ? [initialSearchParams.amenities as string]
      : [],
    bedrooms: (initialSearchParams.bedrooms as string) || "",
    bathrooms: (initialSearchParams.bathrooms as string) || "",
    venueTypes: Array.isArray(initialSearchParams.venueTypes)
      ? initialSearchParams.venueTypes
      : initialSearchParams.venueTypes
      ? [initialSearchParams.venueTypes as string]
      : [],
  });

  // Applied filters for actual search (updated only when Search button is clicked)
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(filters);
  const [actualCount, setActualCount] = useState(0);
  const [filteredCenters, setFilteredCenters] = useState<RetreatCenter[]>([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Update URL when applied filters change (only when search is performed)
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(appliedFilters).forEach(([key, value]) => {
      if (
        value &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, value.toString());
        }
      }
    });
    const queryString = params.toString();
    const newUrl = queryString
      ? `/centers?${queryString}`
      : "/centers?sortBy=relevance";
    router.replace(newUrl, { scroll: false });
    getVenues(0);
  }, [appliedFilters]);

  const getVenues = async (offset: number) => {
    try {
      if (offset === 0) {
        setIsLoadingInitial(true);
      } else {
        setIsLoadingMore(true);
      }
      const params = new URLSearchParams();
      if (appliedFilters.search) params.set("search", appliedFilters.search);
      if (appliedFilters.guests) params.set("guests", appliedFilters.guests);
      if (appliedFilters.bedrooms)
        params.set("bedrooms", appliedFilters.bedrooms);
      if (appliedFilters.bathrooms)
        params.set("bathrooms", appliedFilters.bathrooms);
      if (appliedFilters.sortBy) params.set("sortBy", appliedFilters.sortBy);
      appliedFilters.amenities.forEach((amenity) =>
        params.append("amenities", amenity)
      );
      appliedFilters.venueTypes.forEach((type) =>
        params.append("venueTypes", type)
      );
      params.set("offset", offset.toString());
      params.set("limit", "20");
      const response = await fetch(`/api/centers?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch venues");
      }
      const data = await response.json();
      setFilteredCenters(
        offset === 0 ? data.retreats : [...filteredCenters, ...data.retreats]
      );
      setActualCount(data.total || 0);
    } catch (error) {
      console.error("Error fetching venues:", error);
    } finally {
      setIsLoadingInitial(false);
      setIsLoadingMore(false);
    }
  };

  // Handle search button click
  const handleSearch = async () => {
    setAppliedFilters({ ...filters });
  };

  // Helper function to update filters (only updates UI state, not actual search)
  function updateFilters(updates: Partial<FilterState>) {
    setFilters({ ...filters, ...updates });
  }

  // Helper function to update applied filters (for immediate filters like sortBy)
  async function updateAppliedFilters(updates: Partial<FilterState>) {
    const newAppliedFilters = { ...appliedFilters, ...updates };
    setFilters(newAppliedFilters); // Keep UI in sync
    setAppliedFilters(newAppliedFilters);
  }

  const hasMoreResults = actualCount > filteredCenters.length;

  // Handle load more
  const handleLoadMore = async () => {
    getVenues(filteredCenters.length);
  };

  // Handle retreat selection
  const handleSelectRetreat = (id: string) => {
    router.push(`/centers/${id}`);
  };

  const EmptyState = () => (
    <div className="text-center py-24">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <MapPin className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-4">
          No venues match your filters.
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Try adjusting your search criteria to discover more retreat centers.
        </p>
        <button
          onClick={() => {
            const resetFilters = {
              search: "",
              guests: "",
              sortBy: "relevance",
              amenities: [],
              bedrooms: "",
              bathrooms: "",
              venueTypes: [],
            };
            setFilters(resetFilters);
            setAppliedFilters(resetFilters);
          }}
          className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
        >
          Reset filters
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Header with Search */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Clean Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-7xl tracking-tight font-extralight text-gray-900 mb-0">
              The World's Finest Retreat Centers
            </h1>
          </div>

          {/* Filter Bar with Search Button */}
          <div className="flex justify-center">
            <SearchFilters
              filters={filters}
              onFiltersChange={updateFilters}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Results Header - Clean Apple Style */}
        <div className="py-6 border-b border-gray-50">
          {/* Top row with results count and fixed Sort By */}
          <div className="flex items-center justify-between mb-3">
            {isLoadingInitial || isLoadingMore ? (
              <Skeleton className="w-44 h-6" />
            ) : (
              <p className="text-lg text-gray-900">
                <span className="font-semibold">{actualCount}</span> venues
                found
              </p>
            )}

            {/* Sort By - Always fixed width and right aligned */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                Sort by:
              </span>
              <Select
                value={appliedFilters.sortBy}
                onValueChange={(value) =>
                  updateAppliedFilters({ sortBy: value })
                }
              >
                <SelectTrigger className="w-44 h-10 bg-white border border-gray-200 rounded-md text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all font-medium flex-shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters row - separate and wrappable */}
          <div className="w-full">
            <ActiveFilters
              filters={appliedFilters}
              onFiltersChange={updateAppliedFilters}
            />
          </div>
        </div>

        {/* Main Results Grid - 2 cards per row */}
        <section className="py-8">
          {isLoadingInitial ? (
            <div className="grid grid-cols-1 min-[700px]:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <VenueCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              {actualCount > 0 ? (
                <>
                  <div className="grid grid-cols-1 min-[700px]:grid-cols-2 gap-6">
                    {filteredCenters.map((center) => (
                      <RetreatCenterCard
                        key={center.id}
                        retreat={center}
                        onSelect={handleSelectRetreat}
                      />
                    ))}
                    {isLoadingMore &&
                      Array.from({ length: 4 }).map((_, index) => (
                        <VenueCardSkeleton key={index} />
                      ))}
                  </div>

                  {/* Load More Button */}
                  {hasMoreResults && !isLoadingMore && (
                    <div className="text-center mt-8">
                      <button
                        onClick={handleLoadMore}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span>Load 20 more</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <EmptyState />
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
