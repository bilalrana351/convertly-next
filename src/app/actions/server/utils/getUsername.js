'use server'
import { cookies } from "next/headers";
import decode from "jsonwebtoken/decode";

export default async function getUsername() {
    // Get the username from cookies
    const sessionData = cookies().get('session-data').value;

    console.log(sessionData,'is the session data\n\n\n');

    let username = ''

    try{
        const decryptData = decode(sessionData, process.env.JWT_SECRET_KEY);

        username = decryptData.username;
    }
    catch(e){
        username = '';
    }
    return username;
}