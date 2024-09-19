'use server'
import getModels from "../../../lib/models";
import dbConnect from "../../../lib/mongodb";
import getUsername from "../../../utils/getUsername"
export default async function getDescriptionHandler (documentName) {
    const { User } = getModels();

    // Connect to the database
    await dbConnect();

    const username = await getUsername();
    
    // Find the user by username
    const user = await User.findOne({ username: username })

    if (!user) {
        return { error: "User not found" };
    }

    const document = user.documents.find((doc) => doc.name === documentName);
    

    if (!document){
        return { error: "Document not found"}
    }
    
    // Return the user's documents
    return { 
        description: document.description
    };
} 