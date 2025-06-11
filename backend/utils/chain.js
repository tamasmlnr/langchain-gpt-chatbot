import {
    RunnablePassthrough,
    RunnableSequence,
  } from "@langchain/core/runnables";
  import { ChatOpenAI } from "@langchain/openai";
  import { StringOutputParser } from "@langchain/core/output_parsers";
  import { PromptTemplate } from "@langchain/core/prompts"
  import { pipe } from "langchain/stores/pipeline";
  
  const openAIApiKey = process.env.OPENAI_API_KEY;
  const openAIUrl = process.env.OPENAI_API_URL;
  
  const llm = new ChatOpenAI({
    apiKey: openAIApiKey,
    configuration: {
        modelName: "gpt-4",
        baseURL: openAIUrl,  
    }
  });
  
  const prompt = PromptTemplate.fromTemplate("Who is the captain of {team}")

  const chain = pipe(RunnablePassthrough, prompt, llm, StringOutputParser);
  
  const result = await chain.invoke("Liverpool")
  console.log(result)
  export { chain };
  