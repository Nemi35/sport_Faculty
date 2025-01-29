import { connectToDatabase } from "@/lib/db"; // Ensure you're connecting to the database
import EventModel from "@/models/Event"; // Import your Event model
import { NextResponse } from "next/server"; // Correct response helper for Next.js 13+ App Directory

// POST handler for adding events
export async function POST(req: Request) {
  await connectToDatabase(); // Ensure MongoDB connection

  try {
    const { title, date } = await req.json();

    if (!title || !date) {
      return NextResponse.json(
        { error: "Title and date are required" },
        { status: 400 }
      );
    }

    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    // Create new event document
    const newEvent = new EventModel({
      title,
      date: eventDate,
      createdAt: new Date(),
    });

    await newEvent.save();

    return NextResponse.json(
      {
        message: "Event added successfully",
        event: newEvent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting event:", error);
    return NextResponse.json({ error: "Failed to add event" }, { status: 500 });
  }
}

// GET handler for fetching all events
export async function GET(req: Request) {
  await connectToDatabase(); // Ensure MongoDB connection

  try {
    // Fetch all events from the database
    const events = await EventModel.find();

    return NextResponse.json(
      {
        message: "Events fetched successfully",
        events,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

