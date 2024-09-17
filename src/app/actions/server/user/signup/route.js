'use server'

import getModels from '@/app/actions/server/lib/models'; // Ensure the correct path to the models file
import dbConnect from '@/app/actions/server/lib/mongodb';
import { cookies } from 'next/headers';
import bcrypt from "bcrypt";
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken'

const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

const signupHandler = async (username, password, confirmPassword) => {
    const { User } = getModels();

    const cookie = cookies();

    // Validate input
    if (password !== confirmPassword) {
      return {message: 'Passwords do not match.'};
    }

    // Connect to the database
    await dbConnect();

    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    console.log(existingUser)

    if (existingUser) {
      return {message: 'Username already exists.'};
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    const encrypted = jwt.sign({
      username: username,
      password: password
    },
    process.env.JWT_SECRET_KEY,
    {  expiresIn: '1h' });

    cookie.set('session-data',encrypted);

    redirect('/dashboard')
};

export default signupHandler;
