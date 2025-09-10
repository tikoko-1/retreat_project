import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { RetreatCenter } from "@/types";

export interface SingleVenueResponse {
  retreat: RetreatCenter | null;
  success: boolean;
  error?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<SingleVenueResponse>> {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { retreat: null, success: false, error: "Retreat ID is required" },
        { status: 400 }
      );
    }
    // Fetch the retreat with all related data
    const { data, error } = await supabase.rpc("get_venue_by_id", {
      p_venue_id: id,
    });

    if (error) {
      console.error("Database error:", error);
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { retreat: null, success: false, error: "Retreat not found" },
          { status: 404 }
        );
      }
      throw new Error("Failed to fetch retreat");
    }

    if (!data) {
      return NextResponse.json(
        { retreat: null, success: false, error: "Retreat not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      retreat: data,
      success: true,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        retreat: null,
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
