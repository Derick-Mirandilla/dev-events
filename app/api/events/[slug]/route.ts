import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import { IEvent } from "@/database/event.model";

// Slug validation: only lowercase alphanumeric characters and hyphens
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its unique slug.
 */
export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    // Validate slug is present and well-formed
    if (!slug || typeof slug !== "string" || !SLUG_REGEX.test(slug)) {
      return NextResponse.json(
        { message: "Invalid slug format" },
        { status: 400 }
      );
    }

    await connectDB();

    const event: IEvent | null = await Event.findOne({ slug }).lean();

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 }
    );
  } catch (e) {
    console.error("GET /api/events/[slug] error:", e);
    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
