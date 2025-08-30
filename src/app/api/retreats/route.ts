import { NextRequest, NextResponse } from 'next/server'

// Mock data - in a real app this would come from a database
const mockRetreatCenters = [
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
  // Add more mock data as needed...
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const search = searchParams.get('search') || ''
  const guests = searchParams.get('guests') || ''
  const priceRange = searchParams.get('priceRange') || ''
  const sortBy = searchParams.get('sortBy') || 'relevance'
  const amenities = searchParams.getAll('amenities')
  
  // Apply filters
  let filteredCenters = mockRetreatCenters.filter(center => {
    // Search filter
    const matchesSearch = !search || 
      center.name.toLowerCase().includes(search.toLowerCase()) ||
      center.location.toLowerCase().includes(search.toLowerCase()) ||
      center.highlights.some(h => h.toLowerCase().includes(search.toLowerCase()))
    
    // Guest capacity filter
    let matchesGuests = true
    if (guests) {
      const [min, max] = guests.includes('+') 
        ? [parseInt(guests.replace('+', '')), Infinity]
        : guests.split('-').map(n => parseInt(n))
      matchesGuests = center.capacity >= min && (max === Infinity || center.capacity <= max)
    }
    
    // Price range filter
    let matchesPrice = true
    if (priceRange) {
      const centerPriceMin = parseInt(center.priceRange.split('-')[0].replace('$', ''))
      const centerPriceMax = parseInt(center.priceRange.split('-')[1].replace('$', ''))
      
      if (priceRange === '0-100') {
        matchesPrice = centerPriceMin >= 0 && centerPriceMax <= 100
      } else if (priceRange === '100-300') {
        matchesPrice = centerPriceMin >= 100 && centerPriceMax <= 300
      } else if (priceRange === '300-600') {
        matchesPrice = centerPriceMin >= 300 && centerPriceMax <= 600
      } else if (priceRange === '600-1000') {
        matchesPrice = centerPriceMin >= 600 && centerPriceMax <= 1000
      } else if (priceRange === '1000+') {
        matchesPrice = centerPriceMin >= 1000
      }
    }
    
    // Amenities filter
    const matchesAmenities = amenities.length === 0 || 
      amenities.every(amenity => center.amenities.includes(amenity))

    return matchesSearch && matchesGuests && matchesPrice && matchesAmenities
  })

  // Apply sorting
  filteredCenters.sort((a, b) => {
    switch (sortBy) {
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

  return NextResponse.json({
    retreats: filteredCenters,
    total: filteredCenters.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // In a real app, you would validate the data and save to database
    // For now, just return a success response
    
    return NextResponse.json({
      success: true,
      message: 'Retreat center created successfully',
      id: Math.random().toString(36).substring(7),
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}