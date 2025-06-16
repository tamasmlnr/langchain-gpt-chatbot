import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { Document } from "langchain/document";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { OllamaEmbeddings } from "@langchain/ollama";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";

dotenv.config();

let contextDocuments = [];
let vectorStore;
let chain;
let chatHistory = [];

console.log("vectorStore", vectorStore);
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 100,
  chunkOverlap: 20,
});

export const createVectorStore = async (buffer) => {
  try {
    const blob = new Blob([buffer], { type: "application/pdf" });

    const loader = new PDFLoader(blob);
    const documents = await loader.load();

    const splitDocs = await splitter.splitDocuments(documents);

    contextDocuments = splitDocs;

    console.log(`Loaded ${splitDocs.length} document chunks`);
    
    const embeddings = new OllamaEmbeddings({
      model: "nomic-embed-text",
      baseUrl: "http://localhost:11434",
    });

    const contents = splitDocs.map((doc) => doc.pageContent);

    const vStore = await MemoryVectorStore.fromTexts(
      contents,
      splitDocs.map((doc) => doc.metadata),
      embeddings
    );

    vectorStore = vStore;

    chain = await createChain(vectorStore);

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

const createChain = async (vStore) => {
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
  const docChain = await createStuffDocumentsChain({
    llm: model,
    prompt,
    verbose: true,
    outputParser,
  });
  const retriever = vStore.asRetriever({ k: 3 });

  const retrieverPrompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder("chat_history"),
    ["user", "{input}"],
    [
      "user",
      "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
    ],
  ]);

  const historyAwareRetriever = await createHistoryAwareRetriever({
    llm: model,
    retriever,
    rephrasePrompt: retrieverPrompt,
  });

  const conversationChain = await createRetrievalChain({
    combineDocsChain: docChain,
    retriever: historyAwareRetriever,
  });

  return conversationChain;
};

export const invokeChain = async (input) => {
  if (!chain) {
    throw new Error(
      "No document has been uploaded yet. Please upload a PDF first."
    );
  }

  const context = getContext();
  const response = await chain.invoke({
    context,
    chat_history: chatHistory,
    input,
  });

  chatHistory.push(new HumanMessage(input));
  chatHistory.push(new AIMessage(response.answer));
  return response.answer;
};
