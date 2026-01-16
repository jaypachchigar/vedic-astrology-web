"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, User, Bot, Calendar, Star, Compass, Trash2, Loader2 } from "lucide-react";
import { getChatHistory, saveChatMessage, clearChatHistory } from "@/lib/supabase/chat-history";
import { getUserProfile, getUserBirthCharts } from "@/lib/supabase/birth-charts";
import { intelligentAssistant, BirthChartContext } from "@/lib/ai/intelligent-assistant";
import { supabase } from "@/lib/supabase/client";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface UserProfile {
  full_name?: string;
  date_of_birth?: string;
  time_of_birth?: string;
  place_of_birth?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [birthChartData, setBirthChartData] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history and user profile on mount
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoadingHistory(true);

        // Get current user ID
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
        }

        // Load user profile
        const profile = await getUserProfile();
        setUserProfile(profile);

        // Load birth chart data
        const charts = await getUserBirthCharts();
        if (charts && charts.length > 0) {
          // Use the most recent chart
          setBirthChartData(charts[0]);
          console.log('✅ Birth chart data loaded:', charts[0]);
        } else {
          console.log('⚠️ No birth chart data found');
        }

        // Load chat history
        const history = await getChatHistory();

        if (history && history.length > 0) {
          // Convert saved history to Message format
          const loadedMessages: Message[] = history.map((msg) => ({
            id: msg.message_id,
            role: msg.role as "user" | "assistant",
            content: msg.content,
            timestamp: new Date(msg.timestamp),
          }));
          setMessages(loadedMessages);
          console.log(`✅ Loaded ${loadedMessages.length} messages from history`);
        } else {
          // No history, show welcome message
          let welcomeContent = '';

          if (profile?.full_name) {
            if (profile.date_of_birth && profile.time_of_birth) {
              welcomeContent = `Namaste ${profile.full_name}! 🙏\n\nI'm your personal Vedic astrology AI assistant with access to your complete birth profile:\n\n📅 Birth Date: ${profile.date_of_birth}\n⏰ Birth Time: ${profile.time_of_birth}\n📍 Birth Place: ${profile.place_of_birth || 'Available'}\n\nI can provide detailed, personalized insights based on your actual birth chart, including:\n• Planetary positions and their effects\n• Current Dasha periods and predictions\n• Career, relationships, health guidance\n• Numerology analysis\n• Vastu recommendations\n• And much more!\n\nWhat would you like to know about your astrological chart?`;
            } else {
              welcomeContent = `Namaste ${profile.full_name}! 🙏\n\nI'm your personal Vedic astrology AI assistant. To provide you with the most accurate and personalized insights, please complete your birth profile (date, time, and place of birth) by visiting the Profile page.\n\nOnce your profile is complete, I'll be able to analyze your actual birth chart and provide detailed guidance!\n\nHow can I assist you today?`;
            }
          } else {
            welcomeContent = "Namaste! 🙏\n\nI'm your personal Vedic astrology AI assistant. I can help you understand birth charts, current planetary transits, numerology, Vastu recommendations, and much more.\n\nPlease complete your profile to get personalized insights based on your actual birth chart!\n\nWhat would you like to know?";
          }

          const welcomeMsg: Message = {
            id: "welcome-" + Date.now(),
            role: "assistant",
            content: welcomeContent,
            timestamp: new Date(),
          };
          setMessages([welcomeMsg]);
          // Save welcome message
          await saveChatMessage(welcomeMsg.id, welcomeMsg.role, welcomeMsg.content, welcomeMsg.timestamp);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        // Show default welcome message on error
        const welcomeMsg: Message = {
          id: "welcome-" + Date.now(),
          role: "assistant",
          content: "Namaste! I'm your personal Vedic astrology AI assistant. How can I help you today?",
          timestamp: new Date(),
        };
        setMessages([welcomeMsg]);
      } finally {
        setIsLoadingHistory(false);
      }
    }

    loadData();
  }, []);

  // Build birth chart context from loaded data
  const buildBirthChartContext = (): BirthChartContext | null => {
    // If no user profile with birth details, return null
    if (!userProfile || !userProfile.date_of_birth || !userProfile.time_of_birth) {
      console.log('⚠️ No complete user profile found - missing birth details');
      return null;
    }

    // If we have birth chart data from database, use it
    if (birthChartData) {
      try {
        console.log('📊 Building context from birth chart data:', birthChartData);

        // Handle different possible data structures
        const planets = birthChartData.planets || birthChartData.planetPositions?.planets || [];
        const kundliData = birthChartData.kundli || birthChartData;
        const advancedData = birthChartData.advancedKundli || birthChartData.dasha || {};

        // Extract Moon sign and nakshatra
        const moonPlanet = planets.find((p: any) =>
          p.name === 'Moon' || p.full_name === 'Moon' || p.planet === 'Moon'
        );
        const moonSign = moonPlanet?.sign?.name || moonPlanet?.rashi || '';
        const moonNakshatra = moonPlanet?.nakshatra?.name || moonPlanet?.nakshatra || '';

        // Extract Sun sign
        const sunPlanet = planets.find((p: any) =>
          p.name === 'Sun' || p.full_name === 'Sun' || p.planet === 'Sun'
        );
        const sunSign = sunPlanet?.sign?.name || sunPlanet?.rashi || '';

        // Extract Ascendant
        const ascendant = kundliData.ascendant?.sign?.name ||
                         birthChartData.ascendant?.sign?.name ||
                         kundliData.lagna?.sign?.name || '';

        // Extract Dasha - try multiple possible locations
        const dashaData = advancedData.vimshottari_dasha || advancedData;
        const mahaDasha = dashaData.maha_dasha?.planet ||
                         dashaData.current_maha_dasha?.planet ||
                         dashaData.mahaDasha || '';
        const antarDasha = dashaData.antar_dasha?.planet ||
                          dashaData.current_antar_dasha?.planet ||
                          dashaData.antarDasha || '';

        const context: BirthChartContext = {
          moonSign,
          moonNakshatra,
          ascendant,
          sunSign,
          mahaDasha,
          antarDasha,
          dateOfBirth: userProfile.date_of_birth || '',
          timeOfBirth: userProfile.time_of_birth || '',
          latitude: userProfile.latitude || 0,
          longitude: userProfile.longitude || 0,
          planetPositions: planets,
          houses: birthChartData.houses || kundliData.houses || [],
          yogas: birthChartData.yogas || [],
        };

        console.log('✅ Built context:', {
          moonSign: context.moonSign,
          ascendant: context.ascendant,
          mahaDasha: context.mahaDasha,
          antarDasha: context.antarDasha
        });

        console.log('📊 Built birth chart context from database:', context);
        return context;
      } catch (error) {
        console.error('❌ Error building birth chart context:', error);
        return null;
      }
    }

    // If no birth chart in database but we have profile data, return basic context
    // This allows AI to still answer based on birth date and location
    if (userProfile.date_of_birth && userProfile.time_of_birth && userProfile.latitude) {
      console.log('⚠️ No birth chart found in database, using basic profile data');
      const basicContext: BirthChartContext = {
        moonSign: '',
        moonNakshatra: '',
        ascendant: '',
        sunSign: '',
        mahaDasha: '',
        antarDasha: '',
        dateOfBirth: userProfile.date_of_birth,
        timeOfBirth: userProfile.time_of_birth,
        latitude: userProfile.latitude || 0,
        longitude: userProfile.longitude || 0,
        planetPositions: [],
        houses: [],
        yogas: [],
      };
      return basicContext;
    }

    console.log('⚠️ Insufficient profile data for birth chart context');
    return null;
  };

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

    // Save user message to Supabase
    try {
      await saveChatMessage(userMessage.id, userMessage.role, userMessage.content, userMessage.timestamp);
      console.log('✅ User message saved to Supabase');
    } catch (error) {
      console.error('❌ Failed to save user message:', error);
    }

    try {
      // Build birth chart context from user data
      const context = buildBirthChartContext();

      if (!context) {
        // No birth chart data - ask user to complete profile
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `I notice you haven't completed your birth profile yet. To provide you with accurate, personalized astrological insights based on your actual birth chart, I need your complete birth details.\n\nPlease visit your Profile page to add:\n• Date of Birth\n• Time of Birth  \n• Place of Birth\n\nOnce your profile is complete, I'll be able to:\n• Analyze your birth chart with precise planetary positions\n• Provide answers based on your Moon sign, Nakshatra, and Ascendant\n• Calculate your current Maha and Antar Dasha periods\n• Offer specific remedies based on your chart\n• Give you detailed, personalized guidance (1000+ words per answer)\n\nWould you like general astrological guidance in the meantime?`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        await saveChatMessage(aiMessage.id, aiMessage.role, aiMessage.content, aiMessage.timestamp);
        setIsLoading(false);
        return;
      }

      // Ask intelligent assistant with birth chart context
      console.log('🤖 Asking intelligent assistant with context:', context);
      const response = await intelligentAssistant.ask({
        question: text,
        context,
        userId: userId || 'anonymous',
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Save AI response to Supabase
      await saveChatMessage(aiMessage.id, aiMessage.role, aiMessage.content, aiMessage.timestamp);
      console.log('✅ AI response saved (Source:', response.source, ', Confidence:', response.confidence, ')');

      setIsLoading(false);
    } catch (error) {
      console.error('❌ Error generating AI response:', error);

      // Fallback error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I encountered an error while analyzing your question. Please try again or rephrase your question.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      await saveChatMessage(errorMessage.id, errorMessage.role, errorMessage.content, errorMessage.timestamp);
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    if (!confirm('Are you sure you want to clear all chat history? This cannot be undone.')) {
      return;
    }

    try {
      await clearChatHistory();

      // Show new welcome message
      const welcomeMsg: Message = {
        id: "welcome-" + Date.now(),
        role: "assistant",
        content: userProfile?.full_name
          ? `Namaste ${userProfile.full_name}! I'm ready to assist you with fresh insights. What would you like to know?`
          : "Namaste! Chat cleared. How can I assist you today?",
        timestamp: new Date(),
      };

      setMessages([welcomeMsg]);
      await saveChatMessage(welcomeMsg.id, welcomeMsg.role, welcomeMsg.content, welcomeMsg.timestamp);

      console.log('✅ Chat history cleared');
    } catch (error) {
      console.error('❌ Failed to clear chat history:', error);
      alert('Failed to clear chat history. Please try again.');
    }
  };


  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple to-gold bg-clip-text text-transparent">
          AI Astrology Assistant
        </h1>
        <p className="text-muted-foreground mt-2">
          Get personalized astrological guidance powered by AI
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_300px] gap-6 md:min-h-[600px]">
        {/* Chat Area */}
        <Card className="flex flex-col h-[calc(100vh-250px)] md:h-[600px] border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <CardTitle>Chat with AI</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearChat}
                disabled={messages.length === 0 || isLoading}
                title="Clear chat history"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <CardDescription>
              Ask anything about your astrology, numerology, or Vastu
              {userProfile?.full_name && ` • ${userProfile.full_name}`}
              {userProfile?.date_of_birth && ` • ${userProfile.date_of_birth}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            {/* Loading State */}
            {isLoadingHistory ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                  <p className="text-sm text-muted-foreground">Loading chat history...</p>
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4 hidden md:block">
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
