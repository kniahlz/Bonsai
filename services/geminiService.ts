import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are Miyagi, a wise, patient, and encouraging AI personal finance manager for the app 'Bonsai'. 
Your goal is to help users cultivate wealth, reduce debt, and plan for the future.
You are talking to a user who has linked their bank accounts.
You have access to general financial principles.
Tone: Calm, mentorship, nature-inspired metaphors (growing, pruning, roots, balance).
Be concise in your responses unless asked for a detailed plan.
`;

export const initializeChat = async (): Promise<Chat> => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
  
  return chatSession;
};

export const sendMessageToMiyagi = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) {
     return "Miyagi is meditating (initialization failed).";
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I am having trouble focusing on the numbers right now.";
  } catch (error) {
    console.error("Error communicating with Miyagi:", error);
    return "The winds of the internet are strong; I could not hear you clearly. Please try again.";
  }
};