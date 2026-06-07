"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { askAssistant } from "./actions";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

function AIAssistantContent() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt");

  // State Management
  const [budget, setBudget] = useState("500");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I'm your AI Smart Canteen Assistant. I can help you find the perfect meal based on your budget, dietary preferences, or nutritional needs. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);


  // AI Response generator
  const getAIResponse = (userMsg: string) => {
    const msg = userMsg.toLowerCase();

    // Check for deals redirects
    if (msg.includes("budget saver")) {
      return "Excellent choice! I have applied the AI Picked Budget Saver deal (Rs199 instead of Rs349) to your cart. This includes a Burger + Fries + Drink. Would you like to proceed to checkout or add anything else?";
    }
    if (msg.includes("high protein")) {
      return "Awesome choice! I've loaded the AI Picked High Protein deal (Rs329 instead of Rs469) which is perfect for your fitness goals. This combo includes grilled chicken, quinoa salad, and a fresh juice. Would you like to add it to your order?";
    }

    // Check for budget questions
    if (msg.includes("under") || msg.includes("budget") || msg.includes("Rs")) {
      return `Sure! Based on your budget of Rs${budget}, here are some excellent options: \n1. Classic Beef Burger (Rs299)\n2. Chicken Biryani (Rs249)\n3. Mango Smoothie (Rs129)\n\nYou can order these directly from the Menu or check out our exclusive combos on the Deals page!`;
    }

    // Check for protein
    if (msg.includes("protein") || msg.includes("fitness") || msg.includes("gym")) {
      return "For a high protein diet, our chicken dishes are optimal! The 'AI Picked: High Protein' combo has 45g of protein for just Rs329. You can also order the Classic Beef Burger (Rs299) which contains 28g of protein.";
    }

    // Check for vegetarian
    if (msg.includes("veg") || msg.includes("vegetarian") || msg.includes("plant")) {
      return "We have some delicious vegetarian meals: \n1. Margherita Pizza (Rs339) - cheesy and fresh\n2. Thin Crust Veggie Pizza (Rs349)\n3. Mango Smoothie (Rs129)\n\nWould you like me to add any of these to your order?";
    }

    // Check for combo
    if (msg.includes("combo") || msg.includes("student combo") || msg.includes("pack")) {
      return "We have awesome combos right now! The 'Student Mega Combo' is Rs349 (normally Rs549) and includes Burger + Fries + Drink + Dessert. Check it out on our Deals page!";
    }

    // Default response
    return "I can certainly help you with that! I can recommend meals based on your budget, dietary requirements, or show you our best combinations. What are you in the mood for today?";
  };

  // Send message function
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // 1. Add User Message
    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    // Capture current messages before update for history
    const currentMessages = [...messages];

    setMessages((prev) => [...prev, userMessage]);

    // Clear input
    if (textToSend === inputValue) {
      setInputValue("");
    }

    // 2. Trigger AI Typing State
    setIsTyping(true);

    try {
      // Map existing messages to Gemini parameters
      const historyParam = currentMessages.map((msg) => ({
        role: msg.sender === "ai" ? ("model" as const) : ("user" as const),
        text: msg.text
      }));

      // Call live Gemini Server Action
      const responseText = await askAssistant(
        textToSend,
        Number(budget) || 500,
        historyParam
      );

      setIsTyping(false);

      const aiMessage: Message = {
        id: Math.random().toString(36).substring(7),
        sender: "ai",
        text: responseText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Assistant API call failed, falling back to mock response:", error);
      setIsTyping(false);

      // Fallback response in case of API exception
      const responseText = getAIResponse(textToSend);
      const aiMessage: Message = {
        id: Math.random().toString(36).substring(7),
        sender: "ai",
        text: responseText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  // Handle initial prompt from Deals page redirect
  useEffect(() => {
    if (initialPrompt) {
      // Small timeout to let page mount cleanly
      const timer = setTimeout(() => {
        handleSendMessage(initialPrompt);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [initialPrompt]);

  return (
    <div className="bg-[#FDFBF7] text-slate-800 flex flex-col font-sans selection:bg-orange-200 grow">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grow w-full space-y-8">

        {/* Header Title Section */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/20">
            <span className="text-white text-2xl">🤖</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">AI Food Assistant</h1>
            <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
              Get personalized meal recommendations powered by AI
            </p>
          </div>
        </div>

        {/* Sidebar + Chat Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column Controls */}
          <div className="lg:col-span-4 space-y-6">

            {/* Set Budget Card */}
            <div className="bg-white border border-slate-100 rounded-[1.8rem] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-extrabold text-xl">$</span>
                <h2 className="font-extrabold text-slate-900 text-base">Set Your Budget</h2>
              </div>
              <div className="space-y-2">
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                  placeholder="Enter max price..."
                />
                <div className="text-[11px] font-bold text-slate-400 px-0.5">
                  Rs0 - Rs{budget || "0"}
                </div>
              </div>
            </div>

            {/* Quick Suggestions Card */}
            <div className="bg-white border border-slate-100 rounded-[1.8rem] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-orange-500 text-lg">✨</span>
                <h2 className="font-extrabold text-slate-900 text-base">Quick Suggestions</h2>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleSendMessage(`Suggest meals under Rs${budget}`)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-left font-bold px-4 py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 text-xs cursor-pointer"
                >
                  <span className="text-sm">💵</span>
                  <span>Suggest meals under Rs{budget}</span>
                </button>
                <button
                  onClick={() => handleSendMessage("High protein meal")}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-left font-bold px-4 py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 text-xs cursor-pointer"
                >
                  <span className="text-sm">⚡</span>
                  <span>High protein meal</span>
                </button>
                <button
                  onClick={() => handleSendMessage("Vegetarian options")}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white text-left font-bold px-4 py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 text-xs cursor-pointer"
                >
                  <span className="text-sm">💖</span>
                  <span>Vegetarian options</span>
                </button>
                <button
                  onClick={() => handleSendMessage("Budget friendly combo")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-left font-bold px-4 py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 text-xs cursor-pointer"
                >
                  <span className="text-sm">📈</span>
                  <span>Budget friendly combo</span>
                </button>
              </div>
            </div>

            {/* Smart Alert Card */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-[1.8rem] p-6 shadow-lg shadow-orange-500/10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">📈</span>
                <h3 className="font-extrabold text-base">Smart Alert</h3>
              </div>
              <p className="text-xs font-semibold text-orange-50 leading-relaxed opacity-95">
                Today&apos;s special: Get 20% off on all combo meals! Limited time offer.
              </p>
            </div>

          </div>

          {/* Right Column Chat window */}
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-4xl shadow-sm flex flex-col h-[600px] overflow-hidden">

            {/* Messages Box */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                  >
                    {message.sender === "ai" && (
                      <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center shadow-md shrink-0">
                        <span className="text-white text-sm">🤖</span>
                      </div>
                    )}
                    <div
                      className={`rounded-2xl p-4 text-sm max-w-xl font-medium shadow-2xs whitespace-pre-line leading-relaxed ${message.sender === "user"
                        ? "bg-orange-600 text-white rounded-tr-none"
                        : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                        }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 justify-start"
                  >
                    <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center shadow-md shrink-0">
                      <span className="text-white text-sm">🤖</span>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-4 shadow-2xs flex items-center gap-1.5 min-w-[60px] justify-center">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Bar */}
            <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything about meals, nutrition, or budget..."
                className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                className="bg-violet-600 hover:bg-violet-700 text-white font-extrabold px-6 py-3 rounded-xl shadow-md shadow-violet-600/10 transition flex items-center gap-2 text-sm cursor-pointer shrink-0"
              >
                <span>Send</span>
                <span className="text-xs">➔</span>
              </button>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default function AIAssistantPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#FDFBF7] flex items-center justify-center flex-grow">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600" />
      </div>
    }>
      <AIAssistantContent />
    </Suspense>
  );
}
