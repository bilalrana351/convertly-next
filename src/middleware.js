// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import dbConnect from "@/app/actions/server/lib/mongodb";
// import getModels from '@/app/actions/server/lib/models';

// export async function middleware(req) {
//     const sessionData = cookies().get('session-data')?.value;
//     console.log(sessionData);
//     if (!sessionData) {
//         return NextResponse.redirect(new URL('/signup', req.nextUrl));
//     }

//     const username = JSON.parse(sessionData).username;

//     await dbConnect();

//     const { User } = getModels();

//     const user = await User.findOne({ username });

//     if (!user) {
//         return NextResponse.redirect(new URL('/login', req.nextUrl));
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: [
//         '/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)',
//     ]
// };

export function middleware(req){
    ;
}