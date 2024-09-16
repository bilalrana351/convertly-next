"use client"

import { useEffect, useState } from "react"
import saveChatHistoryHandler from "./actions/server/document/chat/history/save/route";
import getChatHistoryHandler from "./actions/server/document/chat/history/get/route";
export default function Page() {
    // useEffect(() => {
    //     console.log('Hello')
    // })

    // Dummy base64 images (these are very small, transparent 1x1 pixel images)
    const history = [['ai','Hi'],['human','Bye'],['ai','Ij'],['human','hiadiof']]

    return (
        <button onClick={() => {
            const dat = async () => {
                const data = await getChatHistoryHandler('pak');

                console.log('history is\n\n\n', data.chatHistory)
            }

            dat();
            // signupHandler('br','a','a')
            // signupHandler('bilalrana','a','a')
            // // logoutHandler();
            // deleteUserHandler();
        }}>Button</button>
    )
}