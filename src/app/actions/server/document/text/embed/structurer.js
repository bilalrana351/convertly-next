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
        SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that helps group text into contextually meaningful chunks.
            All you have to do is to reformat the text in the form of paragraphs and return the reformatted text.
            Each paragraph will start from a new line.
            Correct any typo in the original text.
            
            The original text is:
{text}`)
    ]);

    const chain = RunnableSequence.from([prompt,model])

    return chain;
}


export default getChain;
