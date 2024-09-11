import { User } from '@/server/lib/models'; // Ensure the correct path to the models file
import { errorHandler } from '@/server/errHandler';
import dbConnect from '@/server/lib/mongodb';
import { cookies } from 'next/headers';

// Function to upload images to a specific document for a user
const uploadImageHandler = async (documentName, images) => {
  try {
    // Get the username from cookies
    const username = cookies().get('username')?.value;

    if (!username) {
      throw new Error('Username not found in cookies.');
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
      throw new Error(`Document with name '${documentName}' not found.`);
    }

    // Validate the images array
    if (!Array.isArray(images) || images.length === 0) {
      throw new Error('Invalid images array.');
    }

    // Upload (add) images to the document's images array
    document.images.push(...images);

    // Save the updated user object
    await user.save();

    return { message: 'Images uploaded successfully.', document };
  } catch (error) {
    // Re-throw the error to be handled by the errorHandler middleware
    throw error;
  }
};

export default errorHandler(uploadImageHandler);
