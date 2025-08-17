import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bht-portfolio', // A folder name in your Cloudinary account
    allowed_formats: ['jpeg', 'png', 'jpg'],
  } as any, // 'any' is used here to bypass a known type issue with the library
});

export const upload = multer({ storage: storage });