import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import dotenv from "dotenv";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

dotenv.config();

let contextDocuments = [];

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 100,
  chunkOverlap: 20,
});

export const setContextDocument = async (buffer) => {
  try {
    const blob = new Blob([buffer], { type: "application/pdf" });

    const loader = new PDFLoader(blob);
    const documents = await loader.load();

    const splitDocs = await splitter.splitDocuments(documents);

    contextDocuments = splitDocs;

    console.log(`Loaded ${splitDocs.length} document chunks`);
    return splitDocs;
  } catch (error) {
    console.error("Error processing PDF:", error);
    throw error;
  }
};

const getContext = () => {
  if (contextDocuments.length === 0) return "";

  return contextDocuments.map((doc) => doc.pageContent).join("\n\n");
};

const model = new ChatOpenAI({
  openAIApiKey: process.env.GROQ_API_KEY,
  configuration: {
    baseURL: "https://api.groq.com/openai/v1",
  },
  modelName: "llama3-70b-8192",
  temperature: 0.7,
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a helpful assistant working for the company that is provided in the context. Use the following context to answer the user's questions. Under no circumstances mention the context directly in your response.  
      If the context doesn't contain relevant information, say so and do not answer based on your general knowledge - tell the user to write an email to the email address found in the document.
      Context: {context}`,
  ],
  new MessagesPlaceholder("chat_history"),
  ["user", "{input}"],
]);

const outputParser = new StringOutputParser();
const chain = prompt.pipe(model).pipe(outputParser);

let chatHistory = [];

export const invokeChain = async (input) => {
  const context = getContext();
  console.log("context", context);
  const response = await chain.invoke({
    context,
    chat_history: chatHistory,
    input,
  });

  chatHistory.push(new HumanMessage(input));
  chatHistory.push(new AIMessage(response));

  return response;
};
