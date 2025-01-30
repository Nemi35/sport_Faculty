import { connectToDatabase } from "@/lib/db";
import EventModel from "@/models/Event";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { title, date, description } = await req.json();
    console.log(`title: ${title}, ${date}, ${description}`);
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
    const newEvent = new EventModel({
      title,
      date: eventDate,
      description,
      createdAt: new Date(),
    });
    console.log("Saving event:", newEvent);
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

export async function GET(req: Request) {
  await connectToDatabase();

  try {
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
