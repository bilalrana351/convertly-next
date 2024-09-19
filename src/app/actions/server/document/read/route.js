"use server"

import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
const sleep = require('util').promisify(setTimeout);

const readDocumentHandler = async (imagesUrl) => {
  console.log('Data is', imagesUrl)


  const client = new ComputerVisionClient(
    new ApiKeyCredentials(
      { inHeader: {'Ocp-Apim-Subscription-Key': process.env.AZURE_API_KEY}}
    ),
    process.env.AZURE_API_ENDPOINT
  )

  const getText = async(url) => {
    let result = await client.read(url);
    let operation = result.operationLocation.split('/').slice(-1)[0];

    while (result.status !== "succeeded") { 
      await sleep(1000); 
      result = await client.getReadResult(operation); 
    }

    const pages = result.analyzeResult.readResults;

    let text = '';
    for (const page of pages) {
      for (const line of page.lines) {
        text += line.text + ' ';
      }
    }

    return text;
  }

  const textPromises = imagesUrl.map(url => getText(url));
  const texts = await Promise.all(textPromises);

  console.log('Texts are\n\n', texts);

  console.log(texts);

  return texts.join(' ');
};

export default readDocumentHandler;