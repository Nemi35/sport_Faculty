import { connectToDatabase } from "@/lib/db"; 
import EventModel from "@/models/Event"; 
import { NextResponse } from "next/server"; 

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  try {
    const { title, date, description } = await req.json();

    if (!title || !date || !description) {
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

    const updatedEvent = await EventModel.findByIdAndUpdate(
      params.id,
      { title, date: eventDate, description },
      { new: true }
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
