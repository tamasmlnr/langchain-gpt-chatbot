import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
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

const prompt = ChatPromptTemplate.fromTemplate(
  "You are a comedian. Tell a joke about {topic}."
);

const chain = prompt.pipe(model);

const result = await chain.invoke({
  topic: "dogs",
});

// const convPrompt = ChatPromptTemplate.fromMessages(
//   ["system", "Generate a joke based on a word provided by the user."],
//   ["human", "{input}"]
// );

// const convChain = convPrompt.pipe(model);

// const convResult = await convChain.invoke({
//   input: "cats",
// });

console.log("result", result);
