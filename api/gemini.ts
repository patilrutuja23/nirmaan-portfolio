import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  const systemPrompt = `
You are the official AI Assistant for Team Nirmaan.
Nirmaan is a 4-member tech team specializing in AI, Web Development, and Hackathons.
Always answer professionally, concisely, and enthusiastically.
Keep answers under 100 words.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: query,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    return res.status(200).json({
      text:
        response.text ||
        "I'm having trouble generating a response right now.",
    });
  } catch (error) {
    console.error("Gemini backend error:", error);
    return res.status(500).json({
      error: "Gemini backend failed",
    });
  }
}
