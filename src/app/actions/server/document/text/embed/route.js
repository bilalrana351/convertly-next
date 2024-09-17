'use server'

import { getVectorStore } from "../../../lib/vectorStore";
import getModels from '@/app/actions/server/lib/models'; // Ensure the correct path to models
import dbConnect from '@/app/actions/server/lib/mongodb';
import getUsername from "@/app/actions/server/utils/getUsername";
import { redirect } from 'next/navigation';
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import getChain from "@/app/actions/server/document/text/embed/structurer";

const embedTextHandler = async (documentName, text) => {
    await dbConnect();

    // Get the result

    const structurerChain = await getChain();

    text = (await structurerChain.invoke({text: text})).content;

    // Find the document text
    const { User } = getModels();

    const username = await getUsername();

    const store = await getVectorStore(username, documentName);
    // Find the  user by username
    const user = await User.findOne({ username });

    if (!user) {
      redirect('/login')
    }

    // The username and the document name will be the unique container
    const splitter = new CharacterTextSplitter({
        chunkSize: 200,
        chunkOverlap: 50,
        separator: ' '  
    })

    // Load the text
    const texts = await splitter.splitText(text);

    console.log(texts,'are texts\n\n')

    const documents = []
    // Convert to documents
    for (const text of texts)
        documents.push(new Document({pageContent: text}));

    console.log('docs\n\n',documents,'\n\n')
    // TO add text to the specified namespace
    store.addDocuments(documents,{
        namespace: username + documentName
    });
}

export default embedTextHandler;
