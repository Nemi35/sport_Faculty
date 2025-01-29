import { connectToDatabase } from "@/lib/db"; // Ensure you're connecting to the database
import EventModel from "@/models/Event"; // Import your Event model
import { NextResponse } from "next/server"; // Correct response helper for Next.js 13+ App Directory



// PUT handler for updating an event
export async function PUT(req: Request, { params }: { params: { id: string } }) {
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

    // Find the event by ID and update it
    const updatedEvent = await EventModel.findByIdAndUpdate(
      params.id,  // Use the id from the URL
      { title, date: eventDate },
      { new: true }  // The 'new' option ensures the updated event is returned
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
