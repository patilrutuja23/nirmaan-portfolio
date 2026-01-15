
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';
import { geminiAssistant } from '../services/geminiService';

const API_URL = 'http://localhost:4000/api/messages';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hello! I'm Nirmaan's AI assistant. Ask me anything about our team or projects." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showUserForm, setShowUserForm] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const saveMessageToDatabase = async (userMessage: string, botMessage: string) => {
    try {
      // Save user message
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName || 'Anonymous',
          email: userEmail || 'noemail@example.com',
          message: userMessage
        })
      });

      // Save bot response
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Nirmaan Bot',
          email: 'bot@nirmaan.ai',
          message: botMessage
        })
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const handleSend = async () => {
    if (!query.trim()) return;
    if (showUserForm && (!userName.trim() || !userEmail.trim())) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const botResponse = await geminiAssistant.askAboutTeam(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsTyping(false);

    // Save to MongoDB
    await saveMessageToDatabase(userMsg, botResponse);
    setShowUserForm(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 sm:w-96 h-[500px] bg-slate-900/90 border border-slate-700/50 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-800/50 p-4 flex items-center justify-between border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <Bot className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">Nirmaan Bot</h3>
                  <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {showUserForm && (
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 space-y-3">
                  <p className="text-xs text-slate-300 font-medium">Please enter your details:</p>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg py-2 px-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg py-2 px-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700/50">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-100"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-1.5 p-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white relative group"
      >
        <div className="absolute inset-0 bg-indigo-500 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity"></div>
        {isOpen ? <X className="w-6 h-6 z-10" /> : <Sparkles className="w-6 h-6 z-10" />}
      </motion.button>
    </div>
  );
};
