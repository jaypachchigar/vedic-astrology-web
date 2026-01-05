"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, User, Bot, Calendar, Star, Compass } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "What does my birth chart say about my career?",
  "When is the best time to start a new business?",
  "What are the current planetary transits affecting me?",
  "How can I improve my relationships?",
  "What remedies should I follow this month?",
  "Tell me about my current dasha period",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Namaste! I'm your personal Vedic astrology AI assistant. I can help you understand your birth chart, current planetary transits, numerology, Vastu recommendations, and much more. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (in production, this would call your AI API)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getSimulatedResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const getSimulatedResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes("career") || lowerQuestion.includes("job") || lowerQuestion.includes("profession")) {
      return "Based on your birth chart, I can see that your 10th house (house of career) is influenced by Saturn, which indicates success in structured, disciplined professions. With Jupiter currently transiting your career sector, this is an excellent time for professional growth.\n\nRecommendations:\n• Consider leadership roles or entrepreneurship\n• Best period: The next 3-6 months during Jupiter's favorable transit\n• Lucky days: Thursday and Saturday\n• Remedy: Wear a Blue Sapphire for Saturn after consulting an astrologer";
    }

    if (lowerQuestion.includes("business") || lowerQuestion.includes("start")) {
      return "For starting a new business, I recommend analyzing the Muhurat (auspicious timing). Based on current planetary positions:\n\n• Most favorable period: Between the 15th and 25th of next month\n• Avoid: Rahu Kaal timings\n• Direction: East or North-facing office is ideal\n• Day: Thursday during the waxing moon phase\n\nJupiter's aspect on your 2nd house (wealth) suggests financial success in ventures related to education, consulting, or finance.";
    }

    if (lowerQuestion.includes("transit") || lowerQuestion.includes("planetary")) {
      return "Currently active transits affecting you:\n\n🪐 **Jupiter Transit**: Moving through your 10th house - Career expansion and recognition\n♄ **Saturn Transit**: In your 7th house - Lessons in partnerships and relationships\n♂ **Mars Transit**: Through your 3rd house - Increased communication and courage\n\nThe most significant transit is Jupiter's, which will bring opportunities for growth in your professional life over the next few months.";
    }

    if (lowerQuestion.includes("relationship") || lowerQuestion.includes("love") || lowerQuestion.includes("marriage")) {
      return "Looking at your 7th house (relationships and marriage):\n\nYour Venus is well-placed, indicating harmonious relationships. However, Saturn's current transit suggests a period of maturity and learning in partnerships.\n\nGuidance:\n• This is a time to build deeper, more committed relationships\n• Best compatibility: Life path numbers 3, 6, and 9\n• Favorable days: Friday (Venus day)\n• Remedy: Wear white or light pink on Fridays, donate to charity";
    }

    if (lowerQuestion.includes("remedy") || lowerQuestion.includes("remedies")) {
      return "Based on your current planetary positions, here are personalized remedies:\n\n**For Jupiter (Guru)**:\n• Chant: \"Om Gram Greem Graum Sah Gurave Namah\" 108 times\n• Day: Thursday mornings\n• Gemstone: Yellow Sapphire (after consultation)\n• Charity: Donate yellow items to temples\n\n**For Saturn (Shani)**:\n• Light a sesame oil lamp on Saturdays\n• Wear dark blue or black on Saturdays\n• Help the elderly and underprivileged\n\n**General**:\n• Practice meditation during sunrise\n• Keep your Northeast corner clean and clutter-free";
    }

    if (lowerQuestion.includes("dasha")) {
      return "Your current Vimshottari Dasha period:\n\n**Maha Dasha**: Jupiter (Guru) - 2020 to 2036\n**Antar Dasha**: Saturn (Shani) - 2024 to 2026\n**Pratyantar Dasha**: Mercury (Budha) - Current\n\nThis combination suggests:\n• A period of structured growth and learning\n• Success through disciplined effort\n• Good for long-term investments and planning\n• Focus on building solid foundations\n\nThe Jupiter-Saturn combination is generally favorable, though it requires patience and consistent effort.";
    }

    // Default response
    return "That's an interesting question! To provide you with the most accurate guidance, I'll need to analyze your birth chart in detail.\n\nCould you tell me more about:\n• Your specific concern or area of interest\n• Any particular timeframe you're asking about\n• Whether you'd like general guidance or specific predictions\n\nMeanwhile, you can also:\n• View your complete birth chart in the Astrology section\n• Check your numerology numbers\n• Get Vastu recommendations for your space\n\nFeel free to ask me anything about Vedic astrology, numerology, or Vastu Shastra!";
  };

  return (
    <div className="space-y-6 h-[calc(100vh-12rem)]">
      <div>
        <h1 className="text-3xl font-bold">AI Astrology Assistant</h1>
        <p className="text-muted-foreground mt-2">
          Get personalized astrological guidance powered by AI
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6 h-full">
        {/* Chat Area */}
        <Card className="flex flex-col h-full">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <CardTitle>Chat with AI</CardTitle>
            </div>
            <CardDescription>
              Ask anything about your astrology, numerology, or Vastu
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.role === "user" ? "justify-end" : ""
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">
                      {message.content}
                    </p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border pt-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex space-x-2"
              >
                <Input
                  placeholder="Ask me anything about astrology..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4 hidden lg:block">
          {/* Suggested Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 px-4 whitespace-normal"
                  onClick={() => handleSend(question)}
                  disabled={isLoading}
                >
                  <span className="text-sm">{question}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => (window.location.href = "/dashboard/astrology")}
              >
                <Star className="w-4 h-4 mr-2" />
                Birth Chart
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => (window.location.href = "/dashboard/numerology")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Numerology
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => (window.location.href = "/dashboard/vastu")}
              >
                <Compass className="w-4 h-4 mr-2" />
                Vastu Compass
              </Button>
            </CardContent>
          </Card>

          {/* Context Info */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm mb-2">AI Context</p>
                  <p className="text-xs text-muted-foreground">
                    The AI has access to your birth chart, current planetary transits,
                    and numerology data to provide personalized guidance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
