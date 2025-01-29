import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../lib/db";
import User from "../../../models/User";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    // Validate inputs
    if (!email || !password) {
        return NextResponse.json(
            { error: "Please provide both email and password." },
            { status: 400 }
        );
    }

    try {
        console.log("Connecting to the database...");
        // Connect to database
        await connectToDatabase();

        console.log("Checking if user exists...");
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json(
                { error: "Invalid credentials." },
                { status: 400 }
            );
        }

        console.log("Verifying password...");
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid credentials." },
                { status: 400 }
            );
        }

        console.log("Login successful!");
        // You can generate a token or session here if needed
        return NextResponse.json({ message: "Login successful!" }, { status: 200 });
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
}