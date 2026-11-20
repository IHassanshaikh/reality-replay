import { GoogleGenerativeAI } from "@google/generative-ai";
import { MASTER_SYSTEM_PROMPT } from "./prompts";

export function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // Default to fast, high-quality structured output model gemini-1.5-flash
  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: MASTER_SYSTEM_PROMPT,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.7,
    },
  });
}

export async function callGeminiStructured<T>(prompt: string): Promise<T | null> {
  try {
    const model = getGeminiModel();
    if (!model) {
      console.log("[Reality Replay AI] GEMINI_API_KEY not set. Using intelligent simulation mode.");
      return null;
    }

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text) as T;
  } catch (error) {
    console.warn("[Reality Replay AI] Live generation call encountered an issue, falling back to simulation engine:", error);
    return null;
  }
}
