import { User } from '@/server/lib/models'; // Ensure the correct path to the models file
import { errorHandler } from '@/server/errHandler';
import dbConnect from '@/server/lib/mongodb';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

const signupHandler = async (username, password, confirmPassword) => {
  try {
    // Validate input
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    // Connect to the database
    await dbConnect();

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return { message: 'Signup successful.' };

  } catch (error) {
    // Re-throw the error to be handled by the errorHandler middleware
    throw error;
  }
};

export default errorHandler(signupHandler);
