"use server"

import getModels from '@/app/actions/server/lib/models';
import dbConnect from '@/app/actions/server/lib/mongodb';
import { v2 as cloudinary } from 'cloudinary';
import getUsername from '@/app/actions/server/utils/getUsername';

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload a base64 image to Cloudinary and return its URL
const uploadToCloudinary = async (base64Image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(base64Image, {
      resource_type: 'auto'
    }, (error, result) => {
      if (error) reject(error);
      else resolve(result.secure_url);
    });
  });
  };

  // Function to upload base64 images to Cloudinary and store URLs in MongoDB
  const uploadImageHandler = async (documentName, base64Images) => {
  const { User } = getModels();

  // Get the username from cookies
  const username = await getUsername();

  if (!username) {
    return { message: 'Username not found' };
  }

  // Connect to the database
  await dbConnect();

  // Find the user by username
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error(`User with username '${username}' not found.`);
  }

  // Find the specific document by name
  const document = user.documents.find((doc) => doc.name === documentName);

  if (!document) {
    console.log(document, 'is')
    return { message: `Document with name '${documentName}' not found.` };
  }

  // Upload base64 images to Cloudinary and store URLs
  const uploadPromises = base64Images.map(async (base64Image) => {
    const url = await uploadToCloudinary(base64Image);
    return url;
  });

  const imageUrls = await Promise.all(uploadPromises);

  // Add image URLs to the document's images array
  document.images.push(...imageUrls);

  // Save the updated user object
  await user.save();

  return { message: 'Images uploaded successfully.', urls: imageUrls };
};

export default uploadImageHandler;