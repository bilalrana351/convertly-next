"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import askChatHandler from "@/app/actions/server/document/chat/ask/route"
import saveChatHistoryHandler from "@/app/actions/server/document/chat/history/save/route"
import getChatHistoryHandler from "@/app/actions/server/document/chat/history/get/route"
import { useSearchParams } from "next/navigation"

export default function Chatbot() {
  const documentName = useSearchParams().get('name');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
       

  const fetchHistory = useCallback(async () => {
      const history = await getChatHistoryHandler(documentName);
      setMessages(history.chatHistory);
  }, [documentName]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleSendMessage = async () => {
    if (inputText.trim() === "") return;

    const newHumanMessage = ['human', inputText];

    setMessages(prevMessages => [...prevMessages, newHumanMessage]);
    setInputText("");

    try {
      const response = await askChatHandler(documentName, newHumanMessage[1]);
      const newAiMessage = ['ai', response];

      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, newAiMessage];
        saveChatHistoryHandler(updatedMessages, documentName);
        return updatedMessages;
      });
    } catch (err) {
      setMessages(prevMessages => [
        ...prevMessages,
        ['ai', `Sorry, there was a problem on our end, could you please resend that? ${err}`]
      ]);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <main className="flex-1 flex flex-col gap-8 p-6 md:p-10">
        <div className="bg-card rounded-lg shadow-md p-6 md:p-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Document Analysis Chatbot</h1>
              <p className="text-muted-foreground">Discuss the details of your documents</p>
            </div>
            <Link
              href={{
                pathname: "/document",
                query: { name: documentName }
              }}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}>
              Back to Documents
            </Link>
          </div>
          <div className="grid gap-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 ${message[0] === "ai" ? "flex-row" : "flex-row-reverse"}`}>
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt={message[0]} />
                  <AvatarFallback>{message[0] === "ai" ? "CB" : "U"}</AvatarFallback>
                </Avatar>
                <div
                  className={`flex-1 bg-muted rounded-lg p-4 ${
                    message[0] === "ai" ? "bg-primary text-primary-foreground" : ""
                  }`}>
                  <p>{message[1]}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="relative">
              <Textarea
                value={inputText}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="w-full rounded-lg border border-input bg-background p-3 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
              <Button
                type="button"
                onClick={handleSendMessage}
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <SendIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}