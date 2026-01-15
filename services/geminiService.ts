const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const geminiAssistant = {
  async askAboutTeam(prompt: string): Promise<string> {
    try {
      const response = await fetch(
        `${GEMINI_API_URL}?key=${import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response."
      );
    } catch (error) {
      console.error("Gemini error:", error);
      return "Something went wrong. Please try again.";
    }
  },
};
