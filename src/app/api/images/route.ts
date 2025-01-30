import { NextResponse } from "next/server";
import AWS from "aws-sdk";

// Initialize AWS SDK once (Prevents Re-instantiating on every request)
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

export async function GET() {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Prefix: "uploads/",
    };

    try {
        const data = await s3.listObjectsV2(params).promise();
        const imageUrls = data.Contents?.map(
            (item) =>
                `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`
        );

        return NextResponse.json(imageUrls, {
            headers: {
                "Cache-Control": "s-maxage=600, stale-while-revalidate",
            },
        });
    } catch (err) {
        console.error("S3 Fetch Error:", err);
        return NextResponse.json(
            { error: "Error fetching images from S3" },
            { status: 500 }
        );
    }
}