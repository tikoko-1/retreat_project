import { NextRequest, NextResponse } from "next/server";
import { getPublicIP } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: venueId } = await params;

    const { data: venue, error: venueError } = await supabase
      .from("venues")
      .select("id, title")
      .eq("id", venueId)
      .single();

    if (venueError || !venue) {
      return NextResponse.json({ error: "Venue not found" }, { status: 404 });
    }

    const clientIP = await getPublicIP();

    const body = await request.json();

    const {
      requester_name,
      requester_email,
      requester_phone,
      start_date,
      end_date,
      date_flexibility,
      group_size_min,
      group_size_max,
      program_type,
      organization,
      notes,
    } = body;

    if (
      !requester_name ||
      !requester_email ||
      !group_size_min ||
      !group_size_max
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: requester_name, requester_email, group_size_min, group_size_max",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(requester_email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (group_size_min < 1 || group_size_max < 1) {
      return NextResponse.json(
        { error: "Group size must be greater than 0" },
        { status: 400 }
      );
    }

    if (group_size_min > 1000 || group_size_max > 1000) {
      return NextResponse.json(
        { error: "Group size must be less than 1000" },
        { status: 400 }
      );
    }

    if (group_size_min > group_size_max) {
      return NextResponse.json(
        {
          error: "Minimum group size cannot be greater than maximum group size",
        },
        { status: 400 }
      );
    }

    if (start_date && end_date) {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);

      if (startDate > endDate) {
        return NextResponse.json(
          { error: "Start date must be before end date" },
          { status: 400 }
        );
      }
    }

    const { data, error } = await supabase.rpc("create_availability_request", {
      p_venue_id: venueId,
      p_start_date: start_date || null,
      p_end_date: end_date || null,
      p_group_size_min: group_size_min,
      p_group_size_max: group_size_max,
      p_requester_name: requester_name,
      p_requester_email: requester_email,
      p_requester_phone: requester_phone || null,
      p_organization: organization || null,
      p_program_type: program_type || null,
      p_notes: notes || null,
      p_date_flexibility: date_flexibility || null,
      p_ip_address: clientIP,
    });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to create availability request" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        message: "Availability request created successfully",
        data: {
          id: data.new_id,
          venue_title: venue.title,
          owner_email: data.owner_email,
          owner_name: data.owner_name,
          created_at: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
