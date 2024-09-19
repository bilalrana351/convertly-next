"use server"

import getModels from '@/app/actions/server/lib/models'; // Ensure the correct path to the models file
import dbConnect from '@/app/actions/server/lib/mongodb';
import getUsername from "@/app/actions/server/utils/getUsername";
const jwt = require('jsonwebtoken');
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// Function to delete a user from the database
const deleteUserHandler = async () => {

    console.log('called');
    const { User } = getModels();

    const username = await getUsername();

    console.log('username', username)

    if (!username) {
      redirect('/signup');
    }

    // Connect to the database
    await dbConnect();

    // Find and delete the user by username
    const result = await User.deleteOne({ username });

    if (result.deletedCount === 0) {
      redirect('/signup')      
    }

    redirect('/signup')
};

export default deleteUserHandler;
