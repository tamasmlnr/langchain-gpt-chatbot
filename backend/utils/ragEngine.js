import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import dotenv from "dotenv";

dotenv.config();

const model = new ChatOpenAI({
  openAIApiKey: process.env.GROQ_API_KEY,
  configuration: {
    baseURL: "https://api.groq.com/openai/v1",
  },
  modelName: "llama3-70b-8192",
  temperature: 0.7,
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant. Answer the user's questions."],
  new MessagesPlaceholder("chat_history"),
  ["user", "{input}"],
]);

const outputParser = new StringOutputParser();
const chain = prompt.pipe(model).pipe(outputParser);

let chatHistory = [];

export const invokeChain = async (input) => {
  const response = await chain.invoke({
    chat_history: chatHistory,
    input,
  });

  chatHistory.push(new HumanMessage(input));
  chatHistory.push(new AIMessage(response));

  return response;
};

export const getChatHistory = () => chatHistory;
export const clearChatHistory = () => {
  chatHistory = [];
};
export const setChatHistory = (history) => {
  chatHistory = history;
};
