'use server'

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { SystemMessage } from "@langchain/core/messages";

const getChain = async () => {
    console.log('Key is', process.env.OPENAI_API_KEY)

    const model = new ChatOpenAI({
        model: 'gpt-4o',
        temperature: 0,
        apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(`
            You are a helpful assistant that answers the question asked by the user based on the provided piece of context.
            In case the answer is not in the provided context, you reply with 'I don't know the answer'.
            However, you should respond to greetings of the user.
            Do not give answers by yourself, use the provided piece of context.
            
            The context is:
            {context}
            The question is:
            {question}`)
    ]);

    const chain = RunnableSequence.from([prompt,model])

    return chain;
}


export default getChain;
