'use server'
import { cookies } from "next/headers";

const jwt = require('jsonwebtoken');

export default async function getUsername() {
    // Get the username from cookies
    const sessionData = cookies().get('session-data').value;

    console.log(sessionData,'is the session data\n\n\n');

    const decryptData = jwt.decode(sessionData, process.env.JWT_SECRET_KEY);

    const username = decryptData.username;

    return username;
}