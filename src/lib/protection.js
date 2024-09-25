"use server"

import { cookies } from "next/headers";
import dbConnect from "@/app/actions/server/lib/mongodb";
import getModels from '@/app/actions/server/lib/models';
import { redirect } from "next/navigation";
import decode from "jsonwebtoken/decode";
export async function protect() {
    const sessionData = cookies().get('session-data')?.value;
    console.log(sessionData);
    if (!sessionData) {
        redirect('/signup');
    }

    const username = decode(sessionData).username

    await dbConnect();

    const { User } = getModels();

    const user = await User.findOne({ username });

    if (!user) {
        redirect('/login');
    }
}