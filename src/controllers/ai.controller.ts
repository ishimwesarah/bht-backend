import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { knowledgeBase } from '../utils/knowledgeBase';
import dotenv from 'dotenv';

dotenv.config();

// Initialize with API key (must be a string, not an object)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY as string);

export const askAI = async (req: Request, res: Response) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Query is required.' });

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are a friendly and professional AI assistant for BHT Corporation in Rwanda.
      Your name is BHT-Bot.
      Answer STRICTLY based on the context below.
      If unrelated, politely say you can only answer questions about BHT Corporation.
      Keep answers concise and helpful.

      CONTEXT:
      ${JSON.stringify(knowledgeBase)}

      USER'S QUESTION:
      "${query}"
    `;

    // ✅ Correct usage: pass the prompt string directly
    const result = await model.generateContent(prompt);

    res.status(200).json({ answer: result.response.text() });
  } catch (error) {
    console.error("AI Controller Error:", error);
    res.status(500).json({ error: 'Failed to get a response from the AI.' });
  }
};
