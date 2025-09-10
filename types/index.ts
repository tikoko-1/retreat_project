export enum EVenueLabel {
  New = "New",
  Verified = "Verified",
  Popular = "Popular",
}

export enum EPriceStatus {
  Draft = "draft",
  Published = "published",
  Rejected = "rejected",
  Pending = "pending",
}

export enum EAmenityGroup {
  PracticeAndWellness = "Practice & Wellness",
  FoodAndDining = "Food & Dining",
  LivingAndComfort = "Living & Comfort",
  ExtrasAndNature = "Extras & Nature",
  InfrastructureAndPolicies = "Infrastructure & Policies",
}

export enum EPriceUnit {
  Weekend = "weekend",
  PerNight = "per_night",
  PerPerson = "per_person",
  Week = "week",
  Custom = "custom",
}

export interface IIcon {
  library: string;
  name: string;
}

export interface IVenueType {
  id: string;
  slug: string;
  name: string;
  icon?: IIcon;
}

export interface IUser {
  id: string;
  bio?: string;
  name?: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
}

export interface IRoom {
  id: string;
  name: string;
  capacity_min?: number;
  capacity_max?: number;
  size_sqft?: number;
  price_min?: number;
  price_max?: number;
  currency?: string;
  amenities?: string[];
  description?: string;
  photos?: string[];
  billing_unit?: string;
  note?: string;
  sort_order: number;
}

export interface IVenuePhoto {
  id: string;
  url: string;
  alt_text?: string;
  position?: number;
}

export interface IVenuePricing {
  id: string;
  amount: number;
  currency: string;
  billing_unit: string;
  note?: string;
  sort_order: number;
}

export interface IReview {
  id: string;
  rating?: number;
  comment?: string;
  created_at: string;
  user: IUser;
}

export interface IAmenity {
  id: string;
  name: string;
  group: EAmenityGroup;
  slug: string;
  icon?: IIcon;
}

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
  label?: string;
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

export interface IFoodDining {
  id: string;
  meal_type?: string;
  diet_options?: string[];
  description?: string;
}

export interface ICancellationPolicy {
  id: string;
  days_before: number;
  refund_percent: number;
  note?: string;
}

export interface RetreatDetails {
  id: string;
  city?: string;
  type: IVenueType;
  label?: EVenueLabel;
  owner: IUser;
  rooms?: IRoom[];
  title: string;
  photos?: IVenuePhoto[];
  status: EPriceStatus;
  address?: string;
  country?: string;
  pricing: IVenuePricing[];
  reviews: IReview[];
  bedrooms?: number;
  latitude?: number;
  amenities?: IAmenity[];
  area_sqft?: number;
  bathrooms?: number;
  longitude?: number;
  price_min?: number;
  price_max?: number;
  price_unit: EPriceUnit;
  description?: string;
  food_dining?: IFoodDining[];
  website_url?: string;
  capacity_min?: number;
  capacity_max?: number;
  hero_subline?: string;
  review_stats: {
    avg_rating: number;
    review_count: number;
  };
  instagram_url?: string;
  included_items?: string[];
  excluded_items?: string[];
  location_about?: string;
  how_to_get_here?: { note: string; text: string; title: string }[];
  special_policies?: { title: string; text: string; icon: IIcon }[];
  nearby_attractions?: {
    name: string;
    note: string;
    unit: string;
    distance: string;
  }[];
  cancellation_policies?: ICancellationPolicy[];
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

// Site Copy Types
export interface SiteCopyBlock {
  title: string;
  text?: string;
  icon?: { library: string; name: string };
}

export interface SiteCopy {
  key: string;
  blocks: SiteCopyBlock[];
}

export interface SiteCopyContextType {
  siteCopy: Record<string, SiteCopyBlock[]>;
  loading: boolean;
  error: string | null;
  fetchSiteCopy: (key: string) => Promise<SiteCopyBlock[] | null>;
  fetchAllSiteCopy: () => Promise<void>;
  refreshSiteCopy: () => Promise<void>;
}
