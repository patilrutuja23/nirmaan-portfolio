import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, Sparkles } from "lucide-react";

const MESSAGE_API_URL = "/api/messages";
const GEMINI_API_URL = "/api/gemini";

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([
    {
      role: "bot",
      text: "Hello! I'm Nirmaan's AI assistant. Ask me anything about our team or projects.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showUserForm, setShowUserForm] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // ✅ Save messages to MongoDB (unchanged)
  const saveMessageToDatabase = async (
    userMessage: string,
    botMessage: string
  ) => {
    try {
      await fetch(MESSAGE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName || "Anonymous",
          email: userEmail || "noemail@example.com",
          message: userMessage,
        }),
      });

      await fetch(MESSAGE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Nirmaan Bot",
          email: "bot@nirmaan.ai",
          message: botMessage,
        }),
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  // ✅ Send message & get Gemini reply from BACKEND
  const handleSend = async () => {
    if (!query.trim()) return;
    if (showUserForm && (!userName || !userEmail)) return;

    const userMsg = query;
    setQuery("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsTyping(true);

    let botResponse = "Sorry, I couldn't generate a response.";

    try {
      console.log("Sending query to /api/gemini:", userMsg);
      
      const res = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMsg }),
      });

      console.log("Response status:", res.status, res.statusText);

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Gemini API error response:", errorData);
        botResponse = `⚠️ ${errorData.error || "Server error"}`;
        if (errorData.details) {
          console.error("Error details:", errorData.details);
        }
      } else {
        const data = await res.json();
        console.log("Gemini response data:", data);
        botResponse = data.text || botResponse;
      }
    } catch (err) {
      console.error("Gemini fetch error:", err);
      botResponse = "Network error. Please check your connection.";
    }
        botResponse = data.text || botResponse;
      }
    } catch (err) {
      console.error("Gemini backend error:", err);
      botResponse = "AI service is temporarily unavailable.";
    }

    setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
    setIsTyping(false);
    setShowUserForm(false);

    await saveMessageToDatabase(userMsg, botResponse);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-4 w-80 h-[480px] bg-slate-900 border border-slate-700 rounded-xl flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="text-indigo-400" />
                <span className="text-white font-semibold">Nirmaan Bot</span>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="text-slate-400" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3"
            >
              {showUserForm && (
                <div className="space-y-2">
                  <input
                    className="w-full p-2 text-sm rounded bg-slate-800 text-white"
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <input
                    className="w-full p-2 text-sm rounded bg-slate-800 text-white"
                    placeholder="Your email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`text-sm ${
                    m.role === "user"
                      ? "text-right text-indigo-300"
                      : "text-left text-slate-200"
                  }`}
                >
                  {m.text}
                </div>
              ))}

              {isTyping && (
                <div className="text-slate-400 text-sm">Typing...</div>
              )}
            </div>

            <div className="p-3 border-t border-slate-700 flex gap-2">
              <input
                className="flex-1 p-2 text-sm rounded bg-slate-800 text-white"
                placeholder="Ask something..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-indigo-600 p-2 rounded text-white"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg"
      >
        {isOpen ? <X /> : <Sparkles />}
      </button>
    </div>
  );
};
