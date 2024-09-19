import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client/edge';
import { decode } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function middleware(req) {
    // Allow the index page to pass through without authentication
    if (req.nextUrl.pathname === '/') {
        return NextResponse.next();
    }

    const sessionData = cookies().get('session-data')?.value;

    console.log(sessionData);

    if (!sessionData) {
        return NextResponse.redirect(new URL('/signup', req.nextUrl));
    }

    const username = decode(sessionData).username;

    try {
        const user = await prisma.user.findUnique({
            where: { username: username },
        });

        if (!user) {
            return NextResponse.redirect(new URL('/login', req.nextUrl));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Error connecting to database:', error);
        return NextResponse.redirect(new URL('/error', req.nextUrl));
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|login|signup|images).*)',
    ],
    runtime: 'edge',
};