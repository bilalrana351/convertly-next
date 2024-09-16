'use server'

import getModels from '@/app/actions/server/lib/models'; // Make sure this path points correctly to your models file
import dbConnect from '@/app/actions/server/lib/mongodb';
import getUsername from "@/app/actions/server/utils/getUsername";

// Function to get chat history of a specific document associated with a particular user
const getChatHistoryHandler = async (documentName) => {
    console.log('Document is', documentName)

    await dbConnect();

    const { User } = getModels();

    const username = await getUsername();

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
};

export default getChatHistoryHandler;
