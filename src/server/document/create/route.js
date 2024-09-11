import { User } from '@/server/lib/models'; // Ensure the correct path to models
import { errorHandler } from '@/server/errHandler';
import dbConnect from '@/server/lib/mongodb';
import { cookies } from 'next/headers';
// Function to create a new document object for an existing user
const createDocumentHandler = async () => {
  try {
    await dbConnect();

    const username = cookies().get('username');
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error(`User with username '${username}' not found`);
    }

    // Create a new document object using the structure defined in the DocumentSchema
    const newDocument = {
      text: '',        // Default text as empty
      images: [],      // Default images as empty array
      chatHistory: [], // Default chat history as empty array
    };

    // Add the new document to the user's documents array
    user.documents.push(newDocument);

    // Save the updated user object
    await user.save();

    return { message: 'New document created successfully.', document: newDocument };
  } catch (error) {
    // Re-throw the error to be handled by the errorHandler middleware
    throw error;
  }
};

export default errorHandler(createDocumentHandler);
