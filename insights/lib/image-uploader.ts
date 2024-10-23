// lib/image-uploader.ts
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Configurare Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!
});

export async function uploadImage(
  buffer: Buffer,
  folder: string,
  filename: string
): Promise<{ url: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `betting-tips/${folder}`,
          public_id: filename,
          resource_type: 'image',
          format: 'png'
        },
        (error, result) => {
          if (error || !result) reject(error);
          else resolve({ url: result.secure_url });
        }
      )
      .end(buffer);
  });
}