import { User } from '@/server/lib/models'; // Ensure the correct path to the models
import { errorHandler } from '@/server/errHandler';
import dbConnect from '@/server/lib/mongodb';
import { cookies } from 'next/headers';
// Function to save the chat history, merging new history with existing history without duplicates
const saveChatHistoryHandler = async (history, documentName) => {
  try {
    await dbConnect();

    const username = cookies().get('username');

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error(`User with username '${username}' not found`);
    }

    // Find the document by its name within the user's documents
    const document = user.documents.find((doc) => doc.name === documentName);

    if (!document) {
      throw new Error(`Document with name '${documentName}' not found`);
    }

    // Create a Set for existing chat history to quickly check for duplicates
    const existingMessagesSet = new Set(document.chatHistory.map((messageArray) => JSON.stringify(messageArray)));

    // Filter the new history to include only non-duplicate messages
    const filteredNewHistory = history.filter(
      (messageArray) => !existingMessagesSet.has(JSON.stringify(messageArray))
    );

    // Append the filtered new history to the existing chat history
    document.chatHistory.push(...filteredNewHistory);

    // Save the changes to the user document
    await user.save();

    return { message: 'Chat history updated successfully.' };
  } catch (error) {
    // Re-throw the error to be handled by the errorHandler middleware
    throw error;
  }
};

export default errorHandler(saveChatHistoryHandler);
