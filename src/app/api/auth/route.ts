import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../lib/db";
import User from "../../../models/User";

export async function POST(req: Request) {
    const { email, password } = await req.json();
    if (!email || !password) {
        return NextResponse.json({ error: "Please provide email and password." }, { status: 400 });
    }
    try {
        await connectToDatabase();
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });
        const response = NextResponse.json({ message: "Login successful!" }, { status: 200 });
        response.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        return response;
    } catch (error) {
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
}