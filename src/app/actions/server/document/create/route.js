"use server"

import getModels from '@/app/actions/server/lib/models'; // Ensure the correct path to models
import dbConnect from '@/app/actions/server/lib/mongodb';
import getUsername from "@/app/actions/server/utils/getUsername";
import { redirect } from 'next/navigation';

// Function to create a new document object for an existing user
const createDocumentHandler = async (documentName, description) => {
    await dbConnect();

    const { User, Document } = getModels();

    const username = await getUsername();

    // Find the  user by username
    const user = await User.findOne({ username });

    if (!user) {
      redirect('/login')
    }

    if (user.documents.find(doc =>doc.name === documentName)){
      return { message: 'Name already exists'}
    }

    // Create a new document object using the structure defined in the DocumentSchema
    const newDocument = {
      name: documentName,
      description: description,
      text: '',        // Default text as empty
      images: [],      // Default images as empty array
      chatHistory: [['ai',`Hello, I am the Document Analysis Chatbot. How can I assist you today about ${documentName}?`]] // Default chat history as empty array
    };

    console.log(newDocument);
    
    // Add the new document to the user's documents array
    user.documents.push(newDocument);

    // Save the updated user object
    await user.save();

    console.log('Here \n\n\n')

    return { message: 'New document created successfully.', document: newDocument };
};

export default createDocumentHandler;
