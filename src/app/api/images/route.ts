import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function GET(req: Request) {
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
        return new Response(JSON.stringify(imageUrls), { status: 200 });
    } catch (err) {
        return new Response("Error fetching images from S3", { status: 500 });
    }
}
