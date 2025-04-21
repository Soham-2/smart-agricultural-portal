import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, X, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateFarmingResponse, getLocalFarmingResponse } from "@/services/chatbotService";

interface Message {
  id: number;
  content: string;
  role: "user" | "assistant";
}

const FarmerChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      content: "Hello! I'm your farming assistant. How can I help you today?", 
      role: "assistant"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const resetChat = () => {
    setMessages([
      { 
        id: 1, 
        content: "Hello! I'm your farming assistant. How can I help you today?", 
        role: "assistant"
      }
    ]);
    setUsingFallback(false);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    setInput("");
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      content: userInput,
      role: "user" as const
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Special test case
      if (userInput.toLowerCase() === "test api") {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          content: "API connection test successful! I'm connected and ready to help with your farming questions.",
          role: "assistant"
        }]);
        setIsLoading(false);
        setUsingFallback(false);
        return;
      }

      // Get response from API
      const response = await generateFarmingResponse(userInput, []);
      
      if (response.success) {
        setUsingFallback(false);
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          content: response.text,
          role: "assistant"
        }]);
      } else {
        // Use fallback if API fails
        setUsingFallback(true);
        const fallbackText = getLocalFarmingResponse(userInput);
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          content: fallbackText,
          role: "assistant"
        }]);
      }
    } catch (error) {
      console.error("Error in chat:", error);
      setUsingFallback(true);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        content: "I encountered an error. Please try again later.",
        role: "assistant"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating button to open chat */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-agri-green-600 text-white p-4 rounded-full shadow-lg hover:bg-agri-green-700 transition-colors z-30"
        aria-label="Open farming assistant"
      >
        <Bot className="h-6 w-6" />
      </button>

      {/* Chat interface */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-40 p-4 md:p-0">
          <Card className="w-full max-w-md h-[80vh] flex flex-col rounded-lg shadow-xl">
            <div className="bg-agri-green-600 text-white px-4 py-3 flex justify-between items-center rounded-t-lg">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <h3 className="font-medium">Farming Assistant</h3>
                {usingFallback && (
                  <span className="bg-amber-200 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                    Limited Mode
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={resetChat}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Reset chat"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <CardContent className="flex-grow overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`
                      max-w-[80%] px-4 py-2 rounded-lg 
                      ${message.role === 'assistant' 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-agri-green-600 text-white'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.role === 'assistant' ? (
                        <Bot className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                      <span className="text-xs opacity-75">
                        {message.role === 'assistant' ? 'Farming Assistant' : 'You'}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span className="text-xs opacity-75">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </CardContent>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <textarea
                  className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-agri-green-500"
                  placeholder="Ask a farming question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows={1}
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!input.trim() || isLoading}
                  className="bg-agri-green-600 hover:bg-agri-green-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Ask about planting, fertilizers, pest control, or any other farming topics.
                {!isLoading && <span className="ml-1 font-medium">Type "test api" to check connection.</span>}
              </p>
              {usingFallback && (
                <div className="bg-amber-50 p-2 rounded mt-2 border border-amber-200">
                  <p className="text-xs text-amber-700">
                    Currently operating in limited mode with basic responses.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default FarmerChatbot; 