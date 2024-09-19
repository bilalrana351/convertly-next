'use server'

import { getVectorStore } from "../../../lib/vectorStore";
import getModels from '@/app/actions/server/lib/models'; // Ensure the correct path to models
import dbConnect from '@/app/actions/server/lib/mongodb';
import getUsername from "@/app/actions/server/utils/getUsername";
import { redirect } from 'next/navigation';
import getChain from "@/app/actions/server/document/chat/ask/chatbot";

const askChatHandler = async (documentName, question) => {
    await dbConnect();

    // Find the document text
    const { User } = getModels();

    const username = await getUsername();

    const store = await getVectorStore(username, documentName);

    // Find the  user by username
    const user = await User.findOne({ username });

    if (!user) {
      redirect('/login')
    }


    console.log('Searching\n\n');

    const contexts = await store.similaritySearch(question, 2);


    console.log(contexts,'is the context')

    let concatContext = ''

    for (const context of contexts){
      console.log('Context is', context);
      concatContext += context.pageContent + '\n';
    }

    console.log('The context is', concatContext);

    const ragChain = await getChain();

    let text = (await ragChain.invoke({context: concatContext, question: question})).content;

    console.log(typeof text);

    console.log('The content is\n\n', text)

    return text;
}

export default askChatHandler;
