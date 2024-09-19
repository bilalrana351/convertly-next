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

// Function to delete an image from Cloudinary
const deleteFromCloudinary = async (imageUrl) => {
  const publicId = imageUrl.split('/').pop().split('.')[0];
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

// Function to delete a specific image from Cloudinary and remove its URL from MongoDB
const deleteImageHandler = async (documentName, imageUrl) => {
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
    return { message: `Document with name '${documentName}' not found.` };
  }

  // Check if the image URL exists in the document
  const imageIndex = document.images.indexOf(imageUrl);
  if (imageIndex === -1) {
    return { message: 'Image URL not found in the document.' };
  }

  try {
    // Delete the image from Cloudinary
    await deleteFromCloudinary(imageUrl);

    // Remove the image URL from the document's images array
    document.images.splice(imageIndex, 1);

    // Save the updated user object
    await user.save();

    return { message: 'Image deleted successfully.' };
  } catch (error) {
    console.error('Error deleting image:', error);
    return { message: 'Failed to delete image.', error: error.message };
  }
};

export default deleteImageHandler;