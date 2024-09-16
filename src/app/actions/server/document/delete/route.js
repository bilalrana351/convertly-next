"use server"

import dbConnect from '@/app/actions/server/lib/mongodb';
import getModels from '@/app/actions/server/lib/models'; // Ensure the correct path to models
import getUsername from "@/app/actions/server/utils/getUsername";
import { redirect } from 'next/navigation';

// Function to delete a document for the specified user
const deleteDocumentHandler = async (documentName) => {
  try {
    // Get the username from cookies
    const username = await getUsername();

    const { User } = getModels();

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
      return {message: "Document not found"}
    }

    console.log('Before', user.documents)

    // Remove the document from the user's documents array
    user.documents.splice(documentIndex, 1);

    console.log('After', user.documents)

    // Save the updated user object
    await user.save();

    return { message: 'Document deleted successfully.' };
  } catch (error) {
    // Re-throw the error to be handled by the errorHandler middleware
    throw error;
  }
};

export default deleteDocumentHandler;
