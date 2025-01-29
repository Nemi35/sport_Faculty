import { connectToDatabase } from "@/lib/db"; // Ensure you're connecting to the database
import EventModel from "@/models/Event"; // Import your Event model
import { NextResponse } from "next/server"; // Correct response helper for Next.js 13+ App Directory

// PUT handler for updating an event
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase(); // Ensure MongoDB connection

  try {
    const { title, date, description } = await req.json(); // Include description in the request body

    if (!title || !date || !description) { // Validate that title, date, and description are provided
      return NextResponse.json(
        { error: "Title, date, and description are required" },
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

    // Find the event by ID and update it
    const updatedEvent = await EventModel.findByIdAndUpdate(
      params.id, // Use the id from the URL
      { title, date: eventDate, description }, // Update the event with title, date, and description
      { new: true } // The 'new' option ensures the updated event is returned
    );

    if (!updatedEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Event updated successfully",
        event: updatedEvent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}
