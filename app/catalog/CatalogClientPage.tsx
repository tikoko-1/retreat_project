'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchFilters, { FilterState } from '@/components/SearchFilters'
import ActiveFilters from '@/components/ActiveFilters'
import RetreatCenterCard, { RetreatCenter } from '@/components/RetreatCenterCard'
import { MapPin } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface CatalogClientPageProps {
  initialRetreatCenters: RetreatCenter[]
  initialSearchParams: { [key: string]: string | string[] | undefined }
}

export default function CatalogClientPage({ 
  initialRetreatCenters, 
  initialSearchParams 
}: CatalogClientPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState<FilterState>({
    search: (initialSearchParams.search as string) || '',
    guests: (initialSearchParams.guests as string) || '',
    priceRange: (initialSearchParams.priceRange as string) || '',
    sortBy: (initialSearchParams.sortBy as string) || 'relevance',
    amenities: Array.isArray(initialSearchParams.amenities) 
      ? initialSearchParams.amenities 
      : initialSearchParams.amenities 
        ? [initialSearchParams.amenities as string]
        : [],
    area: [100, 10000],
    bedrooms: (initialSearchParams.bedrooms as string) || '',
    bathrooms: (initialSearchParams.bathrooms as string) || '',
    venueTypes: [],
    foodOptions: [],
    cancellationPolicy: '',
    hasReviews: false,
    topRated: false,
  })

  // Pagination state
  const [displayedCount, setDisplayedCount] = useState(9)

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && !(Array.isArray(value) && value.length === 0)) {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v))
        } else {
          params.set(key, value.toString())
        }
      }
    })

    const queryString = params.toString()
    const newUrl = queryString ? `/catalog?${queryString}` : '/catalog'
    
    router.replace(newUrl, { scroll: false })
  }, [filters, router])

  // Helper function to update filters
  function updateFilters(updates: Partial<FilterState>) {
    setFilters({ ...filters, ...updates })
    // Reset pagination when filters change
    if (Object.keys(updates).some(key => key !== 'sortBy')) {
      setDisplayedCount(9)
    }
  }

  // Filter logic
  const filteredCenters = initialRetreatCenters.filter(center => {
    // Search filter - matches name, location, highlights
    const matchesSearch = !filters.search || 
      center.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      center.location.toLowerCase().includes(filters.search.toLowerCase()) ||
      center.highlights.some(h => h.toLowerCase().includes(filters.search.toLowerCase()))
    
    // Guest capacity filter
    let matchesGuests = true
    if (filters.guests) {
      const [min, max] = filters.guests.includes('+') 
        ? [parseInt(filters.guests.replace('+', '')), Infinity]
        : filters.guests.split('-').map(n => parseInt(n))
      matchesGuests = center.capacity >= min && (max === Infinity || center.capacity <= max)
    }
    
    // Price range filter
    let matchesPrice = true
    if (filters.priceRange) {
      const centerPriceMin = parseInt(center.priceRange.split('-')[0].replace('$', ''))
      const centerPriceMax = parseInt(center.priceRange.split('-')[1].replace('$', ''))
      
      if (filters.priceRange === '0-100') {
        matchesPrice = centerPriceMin >= 0 && centerPriceMax <= 100
      } else if (filters.priceRange === '100-300') {
        matchesPrice = centerPriceMin >= 100 && centerPriceMax <= 300
      } else if (filters.priceRange === '300-600') {
        matchesPrice = centerPriceMin >= 300 && centerPriceMax <= 600
      } else if (filters.priceRange === '600-1000') {
        matchesPrice = centerPriceMin >= 600 && centerPriceMax <= 1000
      } else if (filters.priceRange === '1000+') {
        matchesPrice = centerPriceMin >= 1000
      }
    }
    
    // Amenities filter - center must have ALL selected amenities
    const matchesAmenities = filters.amenities.length === 0 || 
      filters.amenities.every(amenity => center.amenities.includes(amenity))

    return matchesSearch && matchesGuests && matchesPrice && matchesAmenities
  })

  // Sort results
  const sortedCenters = [...filteredCenters].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return parseInt(a.priceRange.split('-')[0].replace('$', '')) - parseInt(b.priceRange.split('-')[0].replace('$', ''))
      case 'price-high':
        return parseInt(b.priceRange.split('-')[0].replace('$', '')) - parseInt(a.priceRange.split('-')[0].replace('$', ''))
      case 'rating':
        return b.rating - a.rating
      case 'popular':
        return b.reviewCount - a.reviewCount
      default:
        return 0 // relevance - keep original order
    }
  })

  // Get displayed centers (for pagination)
  const displayedCenters = sortedCenters.slice(0, displayedCount)
  const hasMoreResults = displayedCount < sortedCenters.length

  // Handle load more
  const handleLoadMore = () => {
    setDisplayedCount(prev => prev + 20)
  }

  // Handle retreat selection
  const handleSelectRetreat = (id: string) => {
    router.push(`/retreat/${id}`)
  }

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
          onClick={() => setFilters({
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
          })}
          className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
        >
          Reset filters
        </button>
      </div>
    </div>
  )

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
          
          {/* Filter Bar */}
          <div className="flex justify-center">
            <SearchFilters 
              filters={filters}
              onFiltersChange={setFilters}
              resultCount={sortedCenters.length}
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
              <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
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
              filters={filters}
              onFiltersChange={setFilters}
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
                    onSelect={handleSelectRetreat}
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
  )
}