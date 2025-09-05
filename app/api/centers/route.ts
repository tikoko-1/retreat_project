import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { RetreatCenter } from "@/types";
import { count } from "console";

export interface VenueFilters {
  search?: string;
  guests?: string;
  sortBy?: string;
  amenities?: string[];
  bedrooms?: string;
  bathrooms?: string;
  venueTypes?: string[];
  offset?: number;
  limit?: number;
}

export interface VenueResponse {
  retreats: RetreatCenter[];
  total: number;
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<VenueResponse>> {
  try {
    const { searchParams } = new URL(request.url);

    // Extract filter parameters
    const search = searchParams.get("search") || "";
    const guests = searchParams.get("guests") || "";
    const sortBy = searchParams.get("sortBy") || "relevance";
    const amenities = searchParams.getAll("amenities");
    const bedrooms = searchParams.get("bedrooms") || "";
    const bathrooms = searchParams.get("bathrooms") || "";
    const venueTypes = searchParams.getAll("venueTypes");
    const offset = parseInt(searchParams.get("offset") || "0");
    const limit = parseInt(searchParams.get("limit") || "20");

    const { data, error } = await supabase.rpc("get_filtered_venues", {
      p_search: search || "",
      p_guests: guests || "",
      p_venue_types: venueTypes || [],
      p_amenities: amenities || [],
      p_bedrooms: bedrooms || "",
      p_bathrooms: bathrooms || "",
      p_sort_by: sortBy || "relevance",
      p_offset: offset || "0",
      p_limit: limit || "20",
    });
    if (error) {
      console.error("Database error:", error);
      throw new Error("Failed to fetch venues");
    }
    return NextResponse.json({
      retreats: data || [],
      total: data[0]?.total_count || 0,
    });
  } catch (error) {
    console.error("API error:", error);
    throw new Error("Failed to fetch venues");
  }
}
