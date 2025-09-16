import { NextRequest, NextResponse } from "next/server";
import { getPublicIP } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const hours = parseInt(
      process.env.NEXT_PUBLIC_AVAILABILITY_RATE_LIMIT_HOUR || "1"
    );
    const clientIP = await getPublicIP();

    const { data, error } = await supabase.rpc(
      "get_availability_request_count",
      {
        p_ip_address: clientIP,
        p_hours: hours,
      }
    );

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch availability requests count" },
        { status: 500 }
      );
    }
    return NextResponse.json({
      count: data || 0,
      availability:
        data <
        parseInt(process.env.NEXT_PUBLIC_AVAILABILITY_RATE_LIMIT_NUMBER || "5"),
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
