import { supabase } from "./supabase";
import { RetreatCenter } from "@/types";
import { imageUtils } from "./images";

export interface VenueFilters {
  search?: string;
  guests?: string;
  priceRange?: string;
  sortBy?: string;
  amenities?: string[];
  area?: number[];
  bedrooms?: string;
  bathrooms?: string;
  venueTypes?: string[];
  cancellationPolicy?: string; // flexible | moderate | strict | super-strict
  hasReviews?: boolean;
  topRated?: boolean;
  page?: number;
  limit?: number;
}

export interface VenueResponse {
  venues: RetreatCenter[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function fetchVenues(
  filters: VenueFilters = {}
): Promise<VenueResponse> {
  const {
    search = "",
    guests = "",
    priceRange = "",
    sortBy = "relevance",
    amenities = [],
    area = [100, 20000],
    bedrooms = "",
    bathrooms = "",
    venueTypes = [],
    cancellationPolicy = "",
    hasReviews = false,
    topRated = false,
    page = 1,
    limit = 20,
  } = filters;

  try {
    // Build the base query with all necessary relationships
    let query = supabase
      .from("venues")
      .select(
        `
        *,
        venue_photos(url, alt_text, position),
        venue_amenities(
          amenities(name, "group", icon, slug)
        ),
        venue_types(name, description),
        profiles!venues_owner_id_fkey(name, avatar_url, created_at),
        reviews(rating, comment, created_at),
        cancellation_policies(days_before, refund_percent),
        food_dining(meal_type, diet_options, description)
      `
      )
      .eq("status", "published");

    // Apply search filter
    if (search) {
      query = query.or(
        `title.ilike.%${search}%,city.ilike.%${search}%,country.ilike.%${search}%`
      );
    }

    // Apply guest capacity filter
    if (guests) {
      if (guests.includes("+")) {
        const minGuests = parseInt(guests.replace("+", ""));
        query = query.gte("capacity_max", minGuests);
      } else if (guests.includes("-")) {
        const [min, max] = guests.split("-").map((n) => parseInt(n));
        query = query.gte("capacity_max", min).lte("capacity_min", max);
      }
    }

    // Apply price range filter
    if (priceRange) {
      switch (priceRange) {
        case "0-100":
          query = query.lte("price_max", 100);
          break;
        case "100-300":
          query = query.gte("price_min", 100).lte("price_max", 300);
          break;
        case "300-600":
          query = query.gte("price_min", 300).lte("price_max", 600);
          break;
        case "600-1000":
          query = query.gte("price_min", 600).lte("price_max", 1000);
          break;
        case "1000+":
          query = query.gte("price_min", 1000);
          break;
      }
    }

    // Apply area filter
    if (area && area.length === 2) {
      query = query.gte("area_sqft", area[0]).lte("area_sqft", area[1]);
    }

    // Apply bedrooms filter
    if (bedrooms) {
      if (bedrooms.includes("+")) {
        const minBedrooms = parseInt(bedrooms.replace("+", ""));
        query = query.gte("bedrooms", minBedrooms);
      } else if (bedrooms.includes("-")) {
        const [min, max] = bedrooms.split("-").map((n) => parseInt(n));
        query = query.gte("bedrooms", min).lte("bedrooms", max);
      } else {
        const exactBedrooms = parseInt(bedrooms);
        query = query.eq("bedrooms", exactBedrooms);
      }
    }

    // Apply bathrooms filter
    if (bathrooms) {
      if (bathrooms.includes("+")) {
        const minBathrooms = parseInt(bathrooms.replace("+", ""));
        query = query.gte("bathrooms", minBathrooms);
      } else if (bathrooms.includes("-")) {
        const [min, max] = bathrooms.split("-").map((n) => parseInt(n));
        query = query.gte("bathrooms", min).lte("bathrooms", max);
      } else {
        const exactBathrooms = parseInt(bathrooms);
        query = query.eq("bathrooms", exactBathrooms);
      }
    }

    // Apply venue types filter
    if (venueTypes.length > 0) {
      query = query.in("type_id", venueTypes);
    }

    // Apply cancellation policy filter
    if (cancellationPolicy) {
      if (cancellationPolicy === "flexible") {
        query = query.lt("cancellation_policies.days_before", 7);
      } else if (cancellationPolicy === "moderate") {
        query = query.lt("cancellation_policies.days_before", 14);
      } else if (cancellationPolicy === "strict") {
        query = query.lt("cancellation_policies.days_before", 30);
      } else if (cancellationPolicy === "super-strict") {
        query = query.lt("cancellation_policies.refund_percent", 50);
      }
    }

    // Apply reviews filter
    if (hasReviews) {
      query = query.not("reviews", "is", null);
    }

    // Apply top rated filter
    if (topRated) {
      query = query.gte("reviews.rating", 4);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        query = query.order("price_min", { ascending: true });
        break;
      case "price-high":
        query = query.order("price_min", { ascending: false });
        break;
      case "rating":
        // We'll sort by rating after fetching since it's calculated from reviews
        break;
      case "popular":
        // We'll sort by review count after fetching
        break;
      case "newest":
        query = query.order("created_at", { ascending: false });
        break;
      case "oldest":
        query = query.order("created_at", { ascending: true });
        break;
      default:
        query = query.order("created_at", { ascending: false });
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: venues, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Failed to fetch venues");
    }

    // Transform the data to match your RetreatCenter interface
    const transformedVenues =
      venues?.map((venue) => transformVenueData(venue)) || [];

    // Apply amenities filter after transformation (for complex amenity combinations)
    let filteredVenues = transformedVenues;
    if (amenities.length > 0) {
      filteredVenues = transformedVenues.filter((venue) =>
        amenities.every((amenity) => venue.amenities.includes(amenity))
      );
    }

    // Apply sorting that requires transformed data
    if (sortBy === "rating") {
      filteredVenues.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "popular") {
      filteredVenues.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    // Get total count for pagination (with same filters applied)
    let countQuery = supabase
      .from("venues")
      .select("*", { count: "exact", head: true })
      .eq("status", "published");

    // Apply same filters to count query
    if (search) {
      countQuery = countQuery.or(
        `title.ilike.%${search}%,city.ilike.%${search}%,country.ilike.%${search}%`
      );
    }

    if (guests) {
      if (guests.includes("+")) {
        const minGuests = parseInt(guests.replace("+", ""));
        countQuery = countQuery.gte("capacity_max", minGuests);
      } else if (guests.includes("-")) {
        const [min, max] = guests.split("-").map((n) => parseInt(n));
        countQuery = countQuery
          .gte("capacity_max", min)
          .lte("capacity_min", max);
      }
    }

    if (priceRange) {
      switch (priceRange) {
        case "0-100":
          countQuery = countQuery.lte("price_max", 100);
          break;
        case "100-300":
          countQuery = countQuery.gte("price_min", 100).lte("price_max", 300);
          break;
        case "300-600":
          countQuery = countQuery.gte("price_min", 300).lte("price_max", 600);
          break;
        case "600-1000":
          countQuery = countQuery.gte("price_min", 600).lte("price_max", 1000);
          break;
        case "1000+":
          countQuery = countQuery.gte("price_min", 1000);
          break;
      }
    }

    if (area && area.length === 2) {
      countQuery = countQuery
        .gte("area_sqft", area[0])
        .lte("area_sqft", area[1]);
    }

    if (bedrooms) {
      if (bedrooms.includes("+")) {
        const minBedrooms = parseInt(bedrooms.replace("+", ""));
        countQuery = countQuery.gte("bedrooms", minBedrooms);
      } else if (bedrooms.includes("-")) {
        const [min, max] = bedrooms.split("-").map((n) => parseInt(n));
        countQuery = countQuery.gte("bedrooms", min).lte("bedrooms", max);
      } else {
        const exactBedrooms = parseInt(bedrooms);
        countQuery = countQuery.eq("bedrooms", exactBedrooms);
      }
    }

    if (bathrooms) {
      if (bathrooms.includes("+")) {
        const minBathrooms = parseInt(bathrooms.replace("+", ""));
        countQuery = countQuery.gte("bathrooms", minBathrooms);
      } else if (bathrooms.includes("-")) {
        const [min, max] = bathrooms.split("-").map((n) => parseInt(n));
        countQuery = countQuery.gte("bathrooms", min).lte("bathrooms", max);
      } else {
        const exactBathrooms = parseInt(bathrooms);
        countQuery = countQuery.eq("bathrooms", exactBathrooms);
      }
    }

    if (venueTypes.length > 0) {
      countQuery = countQuery.in("type_id", venueTypes);
    }

    const { count: totalCount } = await countQuery;

    return {
      venues: filteredVenues,
      total: totalCount || 0,
      page,
      limit,
      totalPages: Math.ceil((totalCount || 0) / limit),
    };
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw error;
  }
}

export function transformVenueData(venue: any): RetreatCenter {
  // Calculate average rating and review count
  const ratings = venue.reviews?.map((r: any) => r.rating) || [];
  const avgRating =
    ratings.length > 0
      ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length
      : 0;

  // Get main photo (prioritize position 1, then first available)
  const mainPhoto =
    venue.venue_photos?.find((p: any) => p.position === 1)?.url ||
    venue.venue_photos?.[0]?.url ||
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

  // Get amenities with group information
  const venueAmenities =
    venue.venue_amenities?.map((va: any) => va.amenities.name) || [];

  return {
    id: venue.id,
    name: venue.title,
    location: `${venue.city || "Unknown"}, ${venue.country || "Unknown"}`,
    description: venue.description,
    image: imageUtils.venue(mainPhoto),
    rating: Math.round(avgRating * 10) / 10, // Round to 1 decimal place
    reviewCount: venue.reviews?.length || 0,
    capacity: venue.capacity_max || venue.capacity_min || 0,
    priceRange:
      venue.price_min && venue.price_max
        ? `$${venue.price_min}-${venue.price_max}`
        : venue.price_min
        ? `$${venue.price_min}+`
        : "Price on request",
    amenities: venueAmenities,
    highlights: [],
    bedrooms: venue.bedrooms || 0,
    bathrooms: venue.bathrooms || 0,
    areaSqft: venue.area_sqft || undefined,
    coordinates:
      venue.latitude && venue.longitude
        ? {
            lat: parseFloat(venue.latitude),
            lng: parseFloat(venue.longitude),
          }
        : undefined,
  };
}
