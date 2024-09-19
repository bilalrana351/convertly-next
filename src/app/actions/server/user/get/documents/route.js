"use server"
import getModels from '@/app/actions/server/lib/models';
import dbConnect from '@/app/actions/server/lib/mongodb';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import getUsername from '@/app/actions/server/utils/getUsername';
const jwt = require('jsonwebtoken');

const getDocumentsHandler = async () => {
    const { User } = getModels();

    // Connect to the database
    await dbConnect();

    const username = await getUsername();
    
    console.log('username is', username);

    // Find the user by username
    const user = await User.findOne({ username: username })

    if (!user) {
        return { error: "User not found" };
    }
    
    const reducedDoc = user.documents.map(( doc ) => (
        { name: doc.name, 
        description: doc.description })
    );
    
    // Return the user's documents
    return { 
        documents: reducedDoc
    };
};

export default getDocumentsHandler;
