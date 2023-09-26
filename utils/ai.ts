import { JournalEntryWithAnalysis } from "@/types";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { z } from "zod";
import { keyfetch } from "./auth";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("the mood of the person who wrote the journal entry."),
    subject: z.string().describe("the subject of the journal entry."),
    negative: z
      .boolean()
      .describe(
        "is the journal entry negative? (i.e. does it contain negative emotions?)"
      ),
    summary: z
      .string()
      .describe("quick summary of the entire journal entry in 10 word."),
    color: z
      .string()
      .describe(
        "a hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness."
      ),
    sentimentScore: z
      .number()
      .describe(
        "sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive."
      ),
  })
);

async function getPrompt(content: string) {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
}

export async function analyze(content: string) {
  const API_KEY = await keyfetch();
  const input = await getPrompt(content);
  const model = new OpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: API_KEY,
  });
  const result = await model.call(input);

  try {
    return parser.parse(result);
  } catch (error) {
    console.log(error);
  }
}

export async function qa(
  question: string,
  entires: JournalEntryWithAnalysis[]
) {
  const API_KEY = await keyfetch();
  const docs = entires.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: {
        createdAt: new Date(entry.createdAt!).toDateString(),
        ...entry.analysis,
      },
    });
  });

  const model = new OpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: API_KEY,
  });

  const chain = loadQAStuffChain(model);

  const embeddings = new OpenAIEmbeddings({ openAIApiKey: API_KEY });

  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);

  const relevantDocs = await store.similaritySearch(question);

  try {
    const res = await chain.call({
      input_documents: relevantDocs,
      question,
      timeout: 25000,
    });
    return res.text;
  } catch (error) {
    return String(error);
  }
}
