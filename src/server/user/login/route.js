import { User } from '@/server/lib/models'; // Ensure the correct path to the models file
import { errorHandler } from '@/server/errHandler';
import dbConnect from '@/server/lib/mongodb';
import bcrypt from 'bcrypt';

// Function to handle user login
const loginHandler = async (username, password) => {
  try {
    // Connect to the database
    await dbConnect();

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('Invalid username or password.');
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid username or password.');
    }

    // If login is successful, return a success message or generate a token
    // For simplicity, we're returning a success message here
    return { message: 'Login successful.' };

  } catch (error) {
    // Re-throw the error to be handled by the errorHandler middleware
    throw error;
  }
};

export default errorHandler(loginHandler);
