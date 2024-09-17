'use server'
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";

export async function getVectorStore(username, documentName) {
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
    apiKey: process.env.OPENAI_API_KEY
  });

  const pinecone = new Pinecone();
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

  return await PineconeStore.fromExistingIndex(
    embeddings,
    {
      pineconeIndex: pineconeIndex,
      namespace: username + documentName
    }
  );
}