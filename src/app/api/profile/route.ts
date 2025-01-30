import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import Profile from "@/models/Profile";

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_S3_BUCKET_NAME) {
    throw new Error("AWS credentials or S3 bucket name are not configured properly");
}

const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.AWS_REGION!,
});

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI!);
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const title = formData.get("title") as string;
        const file = formData.get("image") as File | null;

        if (!name || !title) {
            return NextResponse.json({ error: "Name and title are required" }, { status: 400 });
        }

        const profileId = uuidv4();

        let imageUrl = "/default.jpg";
        if (file) {
            const buffer = await file.arrayBuffer();
            const fileBuffer = Buffer.from(buffer);
            const fileExtension = file.name.split(".").pop();
            const fileName = `profiles/${profileId}.${fileExtension}`;
            const uploadParams = {
                Bucket: process.env.AWS_S3_BUCKET_NAME!,
                Key: fileName,
                Body: fileBuffer,
                ContentType: file.type,
            };

            await s3Client.send(new PutObjectCommand(uploadParams));

            imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        }
        const newProfile = new Profile({ _id: profileId, name, title, image: imageUrl });
        await newProfile.save();

        return NextResponse.json(newProfile, { status: 201 });

    } catch (error: any) {
        console.error("Error creating profile:", error);
        return NextResponse.json(
            { error: "Failed to create profile", details: error.message },
            { status: 500 }
        );
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function GET() {
    try {
        const profiles = await Profile.find();
        return NextResponse.json(profiles, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching profiles:", error);
        return NextResponse.json(
            { error: "Failed to fetch profiles", details: error.message },
            { status: 500 }
        );
    }
}