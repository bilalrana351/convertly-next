"use server"

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'; // For managing cookies in Next.js
const logoutHandler = async () => {
    // Clear the authentication cookie
    const cookieStore = cookies();

    cookieStore.set('session-data','');

    redirect('/login');

    return { message: 'Logout successful.' };
};

export default logoutHandler;
