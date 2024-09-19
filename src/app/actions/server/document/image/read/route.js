"use server"

import getModels from '@/app/actions/server/lib/models';
import dbConnect from '@/app/actions/server/lib/mongodb';
import getUsername from '@/app/actions/server/utils/getUsername';
import fetch from 'node-fetch';

const readImagesHandler = async (documentName) => {
  await dbConnect();

  const { User } = getModels();

  const username = await getUsername();

  // Find the user by username
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error(`User with username '${username}' not found.`);
  }

  // Find the specific document by name
  const document = user.documents.find((doc) => doc.name === documentName);

  if (!document) { 
    console.log(`Document '${documentName}' not found`);
    return { message: `Document with name '${documentName}' not found.` };
  }

  const images = document.images;

  // If there are no images, return an appropriate message
  if (!images || images.length === 0) {
    return { message: 'No images found in this document.', images: [] };
  }

  // Function to fetch image and convert to base64
  const getBase64FromUrl = async (url) => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');
      const contentType = response.headers.get('content-type');
      return `data:${contentType};base64,${base64}`;
    } catch (error) {
      console.error(`Failed to fetch image: ${url}`, error);
      return null;
    }
  };

  // Fetch and convert all images to base64
  const base64Images = await Promise.all(images.map(getBase64FromUrl));

  // Filter out any null values (images that failed to fetch)
  const finalImages = base64Images.filter(Boolean);

  const combinedImages = []

  for (let i = 0; i < finalImages.length; i++){
    combinedImages.push(
      {
        image: finalImages[i],
        url: images[i]
      }
    )
  }

  console.log('Combined images are', combinedImages)

  return { 
    message: 'Images retrieved and converted to base64 successfully.',
    images: combinedImages,
    documentName: document.name,
    // You can include other document properties here if needed
  };
};

export default readImagesHandler;