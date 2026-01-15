const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

export const geminiAssistant = {
  async askAboutTeam(prompt: string): Promise<string> {
    try {
      const res = await fetch(
        `${GEMINI_API_URL}?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const data = await res.json();

      console.log("Gemini response:", data); // 👈 TEMP DEBUG

      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response."
      );
    } catch (error) {
      console.error("Gemini error:", error);
      return "Something went wrong while contacting Gemini.";
    }
  },
};
