import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value; // Get the auth token from cookies

    // If accessing a protected route and no token is found, redirect to login
    if (req.nextUrl.pathname.startsWith("/dashboard") && !token) {
        return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login
    }

    return NextResponse.next(); // Allow request if authenticated
}

// Apply middleware to all routes under "/dashboard/*"
export const config = {
    matcher: ["/dashboard/:path*"], // Protects "/dashboard" and all its subroutes
};