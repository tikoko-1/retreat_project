import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ venueId: string }> }
) {
  try {
    const { venueId } = await params;
    const { searchParams } = new URL(request.url);
    const offsetCount = searchParams.get("offsetCount");

    if (!venueId) {
      return NextResponse.json(
        { success: false, error: "Venue ID is required" },
        { status: 400 }
      );
    }

    // Call the get_reviews_by_venue_id function
    const { data, error } = await supabase.rpc("get_reviews_by_venue_id", {
      p_venue_id: venueId,
      p_offset_count: offsetCount ? parseInt(offsetCount) : 0,
    });

    if (error) {
      console.error("Error fetching reviews:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reviews: data || [],
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
