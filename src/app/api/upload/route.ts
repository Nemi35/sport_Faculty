import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS credentials are not properly configured');
}

const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        const buffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(buffer);

        const fileExtension = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;

        const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME!,
            Key: `uploads/${fileName}`,
            Body: fileBuffer,
            ContentType: file.type,
        };

        console.log('Attempting upload with params:', {
            ...uploadParams,
            Body: 'Buffer data not shown',
            BucketExists: !!process.env.AWS_S3_BUCKET_NAME,
            RegionUsed: process.env.AWS_REGION || 'us-east-1'
        });

        const uploadResult = await s3Client.send(new PutObjectCommand(uploadParams));

        const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/uploads/${fileName}`;

        return NextResponse.json({ url: fileUrl }, { status: 200 });

    } catch (error: any) {
        console.error('Upload error full details:', {
            message: error.message,
            code: error.Code,
            requestId: error.$metadata?.requestId,
            statusCode: error.$metadata?.httpStatusCode,
        });

        return NextResponse.json(
            {
                error: 'Failed to upload to S3',
                details: error.message,
                code: error.Code,
            },
            { status: 500 }
        );
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};