'use server'

import getModels from '@/app/actions/server/lib/models'; // Ensure the correct path to the models
import dbConnect from '@/app/actions/server/lib/mongodb';
import { cookies } from 'next/headers';
import getUsername from "@/app/actions/server/utils/getUsername";
import { redirect } from 'next/navigation';
// Function to save the chat history, merging new history with existing history without duplicates
const saveChatHistoryHandler = async (history, documentName) => {
    await dbConnect();

    const { User } = getModels();

    const username = await getUsername();

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {  
      redirect('/login');
    }

    // Find the document by its name within the user's documents
    const document = user.documents.find((doc) => doc.name === documentName);

    if (!document) {
      return {message: 'Document not found'}
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
};

export default saveChatHistoryHandler;
