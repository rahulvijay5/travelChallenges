import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.CLOUDFLARE_R2_REGION || "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadImage(file: File, folder: string): Promise<string> {
  if (!process.env.CLOUDFLARE_R2_BUCKET_NAME) {
    throw new Error(
      "CLOUDFLARE_R2_BUCKET_NAME is not set in environment variables"
    );
  }

  const uniqueFilename = `${folder}/${Date.now()}-${file.name}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const command = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: uniqueFilename,
    Body: buffer,
    ContentType: file.type,
  });

  try {
    await s3Client.send(command);
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Failed to upload image to storage");
  }

  // Ensure the public URL is correctly formatted
  if (!process.env.CLOUDFLARE_R2_PUBLIC_URL) {
    throw new Error(
      "CLOUDFLARE_R2_PUBLIC_URL is not set in environment variables"
    );
  }

  const publicUrl = new URL(
    uniqueFilename,
    process.env.CLOUDFLARE_R2_PUBLIC_URL
  ).toString();
  return publicUrl;
}
