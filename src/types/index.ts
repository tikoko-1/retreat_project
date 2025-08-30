export interface RetreatCenter {
  id: string
  name: string
  location: string
  description?: string
  image: string
  rating: number
  reviewCount: number
  capacity: number
  priceRange: string
  amenities: string[]
  highlights: string[]
  bedrooms: number
  bathrooms: number
  isVerified?: boolean
  isNew?: boolean
  coordinates?: {
    lat: number
    lng: number
  }
  host?: {
    name: string
    avatar: string
    joinedYear: number
    reviewCount: number
    rating: number
  }
  policies?: {
    checkIn: string
    checkOut: string
    cancellation: string
    houseRules: string[]
  }
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  author: {
    name: string
    avatar: string
  }
  publishedAt: string
  readTime: string
}

export interface Guide {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  author: {
    name: string
    avatar: string
  }
  publishedAt: string
  readTime: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

export interface FilterState {
  search: string
  guests: string
  priceRange: string
  sortBy: string
  amenities: string[]
  area: number[]
  bedrooms: string
  bathrooms: string
  venueTypes: string[]
  foodOptions: string[]
  cancellationPolicy: string
  hasReviews: boolean
  topRated: boolean
}

export interface Region {
  id: string
  name: string
  image: string
  venueCount: number
}

export interface Country {
  name: string
  count: number
}