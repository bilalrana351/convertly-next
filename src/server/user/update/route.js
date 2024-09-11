import { User } from '@/server/models'; // Ensure the correct path to the models file
import { errorHandler } from '@/server/errHandler';
import dbConnect from '@/server/lib/mongodb';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

const updateUsernameHandler = async (username, password, confirmPassword, newUsername) => {
  try {
    // Validate input
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    // Connect to the database
    await dbConnect();

    // Find the user by the current username
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found.');
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password.');
    }

    // Check if the new username already exists
    const existingUser = await User.findOne({ username: newUsername });
    if (existingUser) {
      throw new Error('New username already exists.');
    }

    // Update the username
    user.username = newUsername;
    await user.save();

    return { message: 'Username updated successfully.' };

  } catch (error) {
    // Re-throw the error to be handled by the errorHandler middleware
    throw error;
  }
};

export default errorHandler(updateUsernameHandler);
