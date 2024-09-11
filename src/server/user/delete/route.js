import { User } from '@/server/lib/models'; // Ensure the correct path to the models file
import { errorHandler } from '@/server/errHandler';
import dbConnect from '@/server/lib/mongodb';
import { cookies } from 'next/headers';

// Function to delete a user from the database
const deleteUserHandler = async () => {
  try {
    // Get the username from cookies
    const username = cookies().get('username').value;

    if (!username) {
      throw new Error('Username not found in cookies.');
    }

    // Connect to the database
    await dbConnect();

    // Find and delete the user by username
    const result = await User.deleteOne({ username });

    if (result.deletedCount === 0) {
      throw new Error(`User with username '${username}' not found.`);
    }

    return { message: 'User deleted successfully.' };
  } catch (error) {
    // Re-throw the error to be handled by the errorHandler middleware
    throw error;
  }
};

export default errorHandler(deleteUserHandler);
