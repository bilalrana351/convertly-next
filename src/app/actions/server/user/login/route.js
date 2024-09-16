"use server"
import getModels from '@/app/actions/server/lib/models';
import dbConnect from '@/app/actions/server/lib/mongodb';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Function to handle user login
const loginHandler = async (username, password) => {
    const { User } = getModels();

    // Connect to the database
    await dbConnect();

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {

      return { message: "User not found" }

    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { message: "Passwords do not match" }
    }

    const encrypted = jwt.sign({
      username: username,
      password: password
    },
    process.env.JWT_SECRET_KEY,
    {  expiresIn: '1h' });

    cookies().set('session-data',encrypted)

    // If login is successful, return a success message or generate a token
    // For simplicity, we're returning a success message here
    return { message: 'Login successful.' };
};

export default loginHandler;
