import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../../lib/db";
import User from "../../../../models/User";

export async function POST(req: Request) {
    const { email, password } = await req.json();
    if (!email || !password) {
        return NextResponse.json(
            { error: "Please provide both email and password." },
            { status: 400 }
        );
    }
    try {
        console.log("Connecting to the database...");
        await connectToDatabase();
        console.log("Checking if user already exists...");
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists." },
                { status: 400 }
            );
        }
        console.log("Hashing the password...");
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Creating new user...");
        const newUser = new User({
            email,
            password: hashedPassword,
        });
        await newUser.save();
        console.log("User registered successfully!");
        return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
    } catch (error) {
        console.error("Error during registration:", error);
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
}