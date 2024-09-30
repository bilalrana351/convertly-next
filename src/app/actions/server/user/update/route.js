"use server"

import getModels from '@/app/actions/server/lib/models';
import dbConnect from '@/app/actions/server/lib/mongodb';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import getUsername from '../../utils/getUsername';

const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

const updatePasswordHandler = async (currentPassword, newPassword, confirmNewPassword) => {
    const { User } = getModels();
    const cookie = cookies();

    const username = await getUsername();

    // Connect to the database
    await dbConnect();

    // Find the user by the current username
    const user = await User.findOne({ username });

    if (!user) {
        return { message: 'User not found.' };
    }

    // Validate input
    if (newPassword !== confirmNewPassword) {
        return { message: 'New passwords do not match.' };
    }

    // Compare the provided current password with the hashed password in the database
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
        return { message: 'Current password is incorrect.' };
    }

    // Hash the new password
    const hashedNewPassword = bcrypt.hashSync(newPassword, SALT_ROUNDS);

    // Update the password
    user.password = hashedNewPassword;

    await user.save();

    const encrypted = jwt.sign(
        {
            username: username,
            password: newPassword
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
    );

    cookie.set('session-data', encrypted);

    return {message: 'success'}

};

export default updatePasswordHandler;