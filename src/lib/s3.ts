import { S3 } from "aws-sdk";
import { Readable } from "stream";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function uploadToS3(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const fileStream = Readable.from(Buffer.from(buffer));

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `uploads/${Date.now()}-${file.name}`,
    Body: fileStream,
    ContentType: file.type,
  };

  const { Location } = await s3.upload(uploadParams).promise();
  return Location;
}

export async function deleteFromS3(imageUrl: string) {
  const key = imageUrl.split("/").pop(); // Extract filename from URL

  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `uploads/${key}`,
  };

  await s3.deleteObject(deleteParams).promise();
}
