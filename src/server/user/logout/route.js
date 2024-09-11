import { errorHandler } from '@/server/errHandler';
import { cookies } from 'next/headers'; // For managing cookies in Next.js
const logoutHandler = async () => {
  try {
    // Clear the authentication cookie
    const cookieStore = cookies();
    cookieStore.set('username', '', { expires: new Date(0) }); // Clear username cookie
    cookieStore.set('authToken', '', { expires: new Date(0) }); // Clear authToken cookie if used

    return { message: 'Logout successful.' };

  } catch (error) {
    // Re-throw the error to be handled by the errorHandler middleware
    throw error;
  }
};

export default errorHandler(logoutHandler);
