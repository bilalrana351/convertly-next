"use server"

// import getModels from '@/server/models'; // Ensure the correct path to the models file
import getModels from '../../lib/models';
import dbConnect from '@/app/actions/server/lib/mongodb';
import bcrypt from 'bcrypt';
import { redirect } from 'next/dist/server/api-utils';

const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

const updateUsernameHandler = async (username, password) => {
    const { User } = getModels();
  
    // Connect to the database
    await dbConnect();

    // Find the user by the current username
    const user = await User.findOne({ username });

    if (!user) {
      redirect('/login')
      return;
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { message: 'The passwords do not match' }
    }

    // Check if the new username already exists
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return { message: 'New username already exists.' };
    }

    // Update the username
    user.username = username;

    await user.save();

    return { message: 'Username and password updated successfully.' };
};

export default errorHandler(updateUsernameHandler);
