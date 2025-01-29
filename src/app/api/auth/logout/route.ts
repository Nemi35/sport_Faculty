import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ message: "Logged out successfully!" }, { status: 200 });

    // Remove the cookie by setting an expired date
    response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0), // Expire immediately
        path: "/", // Apply to all routes
    });

    return response;
}
