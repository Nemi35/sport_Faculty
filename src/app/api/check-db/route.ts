import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db"; // Ensure correct import path

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection failed");
    }
    return NextResponse.json({ success: true, message: "MongoDB Connected!" });
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    return NextResponse.json({ success: false, message: "Failed to connect to MongoDB" }, { status: 500 });
  }
}
