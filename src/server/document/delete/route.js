import { User } from '@/server/lib/models'; // Ensure the correct path to the models file
import { errorHandler } from '@/server/errHandler';
import dbConnect from '@/server/lib/mongodb';
import { cookies } from 'next/headers';

// Function to delete a document for the specified user
const deleteDocumentHandler = async (documentName) => {
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

    // Find the index of the document with the specified name
    const documentIndex = user.documents.findIndex((doc) => doc.name === documentName);

    if (documentIndex === -1) {
      throw new Error(`Document with name '${documentName}' not found.`);
    }

    // Remove the document from the user's documents array
    user.documents.splice(documentIndex, 1);

    // Save the updated user object
    await user.save();

    return { message: 'Document deleted successfully.' };
  } catch (error) {
    // Re-throw the error to be handled by the errorHandler middleware
    throw error;
  }
};

export default errorHandler(deleteDocumentHandler);
