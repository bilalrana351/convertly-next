import { User } from '@/server/lib/models'; // Make sure this path points correctly to your models file
import { errorHandler } from '@/server/errHandler';
import dbConnect from '@/server/lib/mongodb';
import { cookies } from 'next/headers';

// Function to get chat history of a specific document associated with a particular user
const getChatHistoryHandler = async (documentName) => {
  try {
    await dbConnect();

    const username = cookies().get('username');

    // Find the user by username
    const user = await User.findOne({ username }).lean();

    if (!user) {
      throw new Error(`User with username '${username}' not found`);
    }

    // Find the document by its name within the user's documents
    const document = user.documents.find(doc => doc.name === documentName);

    if (!document) {
      throw new Error(`Document with name '${documentName}' not found`);
    }

    // Return the chat history of the found document
    return { chatHistory: document.chatHistory };
  } catch (error) {
    // Re-throw the error to be handled by the errorHandler middleware
    throw error;
  }
};

export default errorHandler(getChatHistoryHandler);
