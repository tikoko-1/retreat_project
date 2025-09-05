export interface RetreatCenter {
  id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  address: string;
  capacity_min: number;
  capacity_max: number;
  price_min: number;
  price_max: number;
  price_unit: string;
  bedrooms: number;
  bathrooms: number;
  created_at: string;
  avg_rating: number;
  review_count: number;
  total_count: number;
  photos: string[];
  amenity_names: string[];
  isVerified?: boolean;
  isNew?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  host?: {
    name: string;
    avatar: string;
    joinedYear: number;
    reviewCount: number;
    rating: number;
  };
  policies?: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    houseRules: string[];
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
}

export interface Guide {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export interface FilterState {
  search: string;
  guests: string;
  sortBy: string;
  amenities: string[];
  bedrooms: string;
  bathrooms: string;
  venueTypes: string[];
}

export interface Region {
  id: string;
  name: string;
  image: string;
  venueCount: number;
}

export interface Country {
  name: string;
  count: number;
}
