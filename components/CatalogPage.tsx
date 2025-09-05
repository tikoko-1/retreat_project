import { useState } from "react";
import SearchFilters, { FilterState } from "./SearchFilters";
import ActiveFilters from "./ActiveFilters";
import RetreatCenterCard, { RetreatCenter } from "./RetreatCenterCard";
import { MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface CatalogPageProps {
  onSelectRetreat: (id: string) => void;
}

// Mock data - in real app this would come from API  
const mockRetreatCenters: RetreatCenter[] = [
  {
    id: '1',
    name: 'Serenity Hills Retreat',
    location: 'Ubud, Indonesia',
    image: 'https://images.unsplash.com/photo-1630449255710-fee6f188bad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbW9kZXJuJTIwYXJjaGl0ZWN0dXJlJTIwd2hpdGV8ZW58MXx8fHwxNzU1Njk3OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 127,
    capacity: 25,
    priceRange: '$180-320',
    amenities: ['yoga-hall', 'pool-heated', 'high-speed-wifi', 'nature-trails'],
    highlights: ['Jungle Views', 'Yoga Hall'],
    bedrooms: 8,
    bathrooms: 6,
    isVerified: true,
  },
  {
    id: '2',
    name: 'Mountain View Sanctuary',
    location: 'Rishikesh, India',
    image: 'https://images.unsplash.com/photo-1646239646963-b0b9be56d6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMG1pbmltYWwlMjB5b2dhJTIwc3BhY2V8ZW58MXx8fHwxNzU1Njk3OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 89,
    capacity: 35,
    priceRange: '$120-250',
    amenities: ['meditation-hall', 'yoga-hall', 'nature-trails', 'spa-massage'],
    highlights: ['River Views', 'Traditional'],
    bedrooms: 12,
    bathrooms: 8,
  },
  {
    id: '3',
    name: 'Ocean Bliss Retreat',
    location: 'Tulum, Mexico',
    image: 'https://images.unsplash.com/photo-1670589953903-b4e2f17a70a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwb29sJTIwbWluaW1hbCUyMGRlc2lnbnxlbnwxfHx8fDE3NTU2OTc5NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 156,
    capacity: 20,
    priceRange: '$250-450',
    amenities: ['pool-heated', 'yoga-hall', 'beach-access', 'nature-trails'],
    highlights: ['Beachfront', 'Cenote Access'],
    bedrooms: 6,
    bathrooms: 4,
    isNew: true,
  },
  {
    id: '4',
    name: 'Desert Oasis Center',
    location: 'Sedona, United States',
    image: 'https://images.unsplash.com/photo-1720087448033-db1904db294b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdoaXRlJTIwYmVkcm9vbSUyMG1pbmltYWx8ZW58MXx8fHwxNzU1Njk3OTczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviewCount: 92,
    capacity: 30,
    priceRange: '$200-380',
    amenities: ['meditation-hall', 'professional-av', 'spa-massage', 'nature-trails'],
    highlights: ['Red Rocks', 'Vortex Energy'],
    bedrooms: 10,
    bathrooms: 7,
  },
  {
    id: '5',
    name: 'Rainforest Haven',
    location: 'Nosara, Costa Rica',
    image: 'https://images.unsplash.com/photo-1613645695125-0c87bb48e9e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwdGVycmFjZSUyMGNsZWFuJTIwbGluZXN8ZW58MXx8fHwxNzU1Njk3OTc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 134,
    capacity: 40,
    priceRange: '$150-300',
    amenities: ['pool-heated', 'yoga-hall', 'nature-trails', 'commercial-kitchen'],
    highlights: ['Eco-Friendly', 'Wildlife'],
    bedrooms: 14,
    bathrooms: 10,
  }
];

export default function CatalogPage({ onSelectRetreat }: CatalogPageProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
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
  });

  // Applied filters for actual search (updated only when Search button is clicked)
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(filters);

  // Pagination state
  const [displayedCount, setDisplayedCount] = useState(9);

  // Handle search button click
  const handleSearch = () => {
    setAppliedFilters({ ...filters });
    setDisplayedCount(9); // Reset pagination on new search
  };

  // Helper function to update filters (only updates UI state, not actual search)
  function updateFilters(updates: Partial<FilterState>) {
    setFilters({ ...filters, ...updates });
  }

  // Helper function to update applied filters (for immediate filters like sortBy)
  function updateAppliedFilters(updates: Partial<FilterState>) {
    const newAppliedFilters = { ...appliedFilters, ...updates };
    setAppliedFilters(newAppliedFilters);
    setFilters(newAppliedFilters); // Keep UI in sync
    
    // Reset pagination when filters change
    if (Object.keys(updates).some(key => key !== 'sortBy')) {
      setDisplayedCount(9);
    }
  }

  // Filter logic - use appliedFilters instead of filters
  const filteredCenters = mockRetreatCenters.filter(center => {
    // Search filter - matches name, location, highlights
    const matchesSearch = !appliedFilters.search || 
      center.name.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
      center.location.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
      center.highlights.some(h => h.toLowerCase().includes(appliedFilters.search.toLowerCase()));
    
    // Guest capacity filter
    let matchesGuests = true;
    if (appliedFilters.guests) {
      const [min, max] = appliedFilters.guests.includes('+') 
        ? [parseInt(appliedFilters.guests.replace('+', '')), Infinity]
        : appliedFilters.guests.split('-').map(n => parseInt(n));
      matchesGuests = center.capacity >= min && (max === Infinity || center.capacity <= max);
    }
    
    // Price range filter - Updated for new ranges
    let matchesPrice = true;
    if (appliedFilters.priceRange) {
      const centerPriceMin = parseInt(center.priceRange.split('-')[0].replace('$', ''));
      const centerPriceMax = parseInt(center.priceRange.split('-')[1].replace('$', ''));
      
      if (appliedFilters.priceRange === '0-100') {
        matchesPrice = centerPriceMin >= 0 && centerPriceMax <= 100;
      } else if (appliedFilters.priceRange === '100-300') {
        matchesPrice = centerPriceMin >= 100 && centerPriceMax <= 300;
      } else if (appliedFilters.priceRange === '300-600') {
        matchesPrice = centerPriceMin >= 300 && centerPriceMax <= 600;
      } else if (appliedFilters.priceRange === '600-1000') {
        matchesPrice = centerPriceMin >= 600 && centerPriceMax <= 1000;
      } else if (appliedFilters.priceRange === '1000+') {
        matchesPrice = centerPriceMin >= 1000;
      }
    }
    
    // Amenities filter - center must have ALL selected amenities
    const matchesAmenities = appliedFilters.amenities.length === 0 || 
      appliedFilters.amenities.every(amenity => center.amenities.includes(amenity));

    return matchesSearch && matchesGuests && matchesPrice && matchesAmenities;
  });

  // Sort results - use appliedFilters for sortBy
  const sortedCenters = [...filteredCenters].sort((a, b) => {
    switch (appliedFilters.sortBy) {
      case 'price-low':
        return parseInt(a.priceRange.split('-')[0].replace('$', '')) - parseInt(b.priceRange.split('-')[0].replace('$', ''));
      case 'price-high':
        return parseInt(b.priceRange.split('-')[0].replace('$', '')) - parseInt(a.priceRange.split('-')[0].replace('$', ''));
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
        return b.reviewCount - a.reviewCount;
      default:
        return 0; // relevance - keep original order
    }
  });

  // Get displayed centers (for pagination)
  const displayedCenters = sortedCenters.slice(0, displayedCount);
  const hasMoreResults = displayedCount < sortedCenters.length;

  // Handle load more
  const handleLoadMore = () => {
    setDisplayedCount(prev => prev + 20);
  };

  const EmptyState = () => (
    <div className="text-center py-24">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <MapPin className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-4">No venues match your filters.</h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Try adjusting your search criteria to discover more retreat centers.
        </p>
        <button 
          onClick={() => {
            const resetFilters = {
              search: '',
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
              resultCount={sortedCenters.length}
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
            <p className="text-lg text-gray-900">
              <span className="font-semibold">{sortedCenters.length}</span> venues found
            </p>
            
            {/* Sort By - Always fixed width and right aligned */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-sm text-gray-600 font-medium whitespace-nowrap">Sort by:</span>
              <Select value={appliedFilters.sortBy} onValueChange={(value) => updateAppliedFilters({ sortBy: value })}>
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
          {sortedCenters.length > 0 ? (
            <>
              <div className="grid grid-cols-1 min-[700px]:grid-cols-2 gap-6">
                {displayedCenters.map((center) => (
                  <RetreatCenterCard 
                    key={center.id}
                    retreat={center}
                    onSelect={onSelectRetreat}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMoreResults && (
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
        </section>
      </div>
    </div>
  );
}