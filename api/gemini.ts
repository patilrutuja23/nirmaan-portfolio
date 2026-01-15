import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not set in environment");
      return res.status(500).json({ error: "API key not configured" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are the official AI Assistant for Team Nirmaan, a 4-member tech team specializing in AI, Web Development, and Hackathons. Answer professionally and concisely (under 100 words).\n\nUser: ${query}`;

    console.log("Sending prompt to Gemini:", { query, promptLength: prompt.length });

    const result = await model.generateContent(prompt);
    
    console.log("Gemini response received:", {
      finishReason: result.response.candidates?.[0]?.finishReason,
      hasCandidates: !!result.response.candidates?.length,
    });

    // Safely extract text from response
    let text = result.response.text();
    
    if (!text || text.trim().length === 0) {
      console.warn("Gemini returned empty text. Full response:", JSON.stringify(result.response));
      return res.status(200).json({ 
        text: "I understood your question, but couldn't generate a proper response. Please try again.",
        debug: "Empty response from Gemini"
      });
    }

    console.log("Successfully extracted text from Gemini");
    return res.status(200).json({ text });

  } catch (error) {
    console.error("Gemini error details:", {
      message: error instanceof Error ? error.message : String(error),
      status: (error as any)?.status,
      code: (error as any)?.code,
      fullError: error
    });

    // Parse error for user feedback
    const errorMessage = error instanceof Error ? error.message : "AI service failed";
    
    // Check for specific API errors
    if (errorMessage.includes("404") || errorMessage.includes("not found")) {
      return res.status(400).json({ 
        error: "Model not available. Check API key and model name.",
        details: errorMessage 
      });
    }
    
    if (errorMessage.includes("401") || errorMessage.includes("unauthorized")) {
      return res.status(401).json({ 
        error: "Invalid API key.",
        details: errorMessage 
      });
    }

    return res.status(500).json({ error: errorMessage });
  }
}

