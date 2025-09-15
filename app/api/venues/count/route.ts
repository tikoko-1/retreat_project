import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const guests = searchParams.get("guests") || "";
    const venueTypes = searchParams.getAll("venueTypes") || [];
    const amenities = searchParams.getAll("amenities") || [];
    const bedrooms = searchParams.get("bedrooms") || "";
    const bathrooms = searchParams.get("bathrooms") || "";

    const { data: count, error } = await supabase.rpc(
      "get_filtered_venues_count",
      {
        p_search: search || "",
        p_guests: guests || "",
        p_venue_types: venueTypes || [],
        p_amenities: amenities || [],
        p_bedrooms: bedrooms || "",
        p_bathrooms: bathrooms || "",
      }
    );
    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Failed to fetch venue count");
    }
    return NextResponse.json({ count: count || 0 });
  } catch (error) {
    console.error("API error:", error);
    throw new Error("Failed to fetch venue count");
  }
}
