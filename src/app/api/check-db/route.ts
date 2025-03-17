import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ success: true, message: "MongoDB Connected!" });
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    return NextResponse.json({ success: false, message: "Failed to connect to MongoDB" }, { status: 500 });
  }
}
