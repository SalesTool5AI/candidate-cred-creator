
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Contact } from "@/components/Contact";
import Navigation from "@/components/Navigation";
import { Send, Bot, Loader2, Mail, MessageCircle, Linkedin } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Generate or retrieve user session
    const sessionEmail = generateUserSession();
    setUserEmail(sessionEmail);
    initializeConversation(sessionEmail);
  }, []);

  const generateUserSession = (): string => {
    // Check if user already has a session
    let sessionEmail = localStorage.getItem('chat_user_email');
    if (!sessionEmail) {
      // Generate a unique session identifier
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 15);
      sessionEmail = `visitor_${timestamp}_${randomId}@session.com`;
      localStorage.setItem('chat_user_email', sessionEmail);
    }
    return sessionEmail;
  };

  const initializeConversation = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert({
          user_email: email,
          user_name: 'Visitor',
        })
        .select()
        .single();

      if (error) throw error;

      setConversationId(data.id);

      // Add welcome message
      const welcomeMessage = {
        id: 'welcome',
        role: 'assistant' as const,
        content: "Hi I am trained on Sam Bryant's, work, case studies, experience and philosophy. I can answer questions about his career, achievements, work style, expertise, and more. What would you like to know about Sam?",
        created_at: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);

    } catch (error) {
      console.error('Error initializing conversation:', error);
      toast({
        title: "Error",
        description: "Failed to initialize chat. Please refresh the page.",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    try {
      // Save user message to database if we have a conversation ID
      if (conversationId) {
        try {
          await supabase.from('chat_messages').insert({
            conversation_id: conversationId,
            role: 'user',
            content: userMessage.content,
          });
        } catch (dbError) {
          console.log('Failed to save user message to DB:', dbError);
        }
      }

      // Get conversation history for context (excluding welcome message)
      const conversationHistory = messages
        .filter(msg => msg.id !== 'welcome')
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('chat-with-sam', {
        body: {
          message: currentInput,
          conversationHistory,
          userEmail: userEmail,
          userName: 'Visitor',
        },
        headers: {
          'x-user-email': userEmail
        }
      });

      if (error) {
        throw new Error(`Function call failed: ${error.message}`);
      }

      if (data && data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
          created_at: new Date().toISOString(),
        };

        setMessages(prev => [...prev, assistantMessage]);

        // Save assistant message to database if we have a conversation ID
        if (conversationId) {
          try {
            await supabase.from('chat_messages').insert({
              conversation_id: conversationId,
              role: 'assistant',
              content: assistantMessage.content,
            });
          } catch (dbError) {
            console.log('Failed to save assistant message to DB:', dbError);
          }
        }
      } else {
        throw new Error(data?.error || 'Failed to get response from AI');
      }

    } catch (error) {
      console.error('Error:', error);
      
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      
      // Add error message to chat
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "Tell me about your biggest achievements",
    "What motivates you professionally?",
    "How do you prefer to receive feedback?",
    "What's your approach to enterprise sales?",
    "Tell me about your experience with AI tools",
    "What makes you different from other salespeople?"
  ];

  const handleEmailClick = () => {
    window.location.href = "mailto:sam@sbryant.io?subject=Enterprise Sales Opportunity";
  };

  const handlePhoneClick = () => {
    window.open("https://wa.me/447444473958", "_blank");
  };

  const handleLinkedInClick = () => {
    window.open("https://linkedin.com/in/sambryant", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      {/* Hero Section with Chat Interface */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Network lines */}
          <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-cyan-400/30 to-transparent transform rotate-45"></div>
          <div className="absolute top-1/3 right-1/3 w-px h-24 bg-gradient-to-b from-blue-400/20 to-transparent transform -rotate-12"></div>
          <div className="absolute bottom-1/4 left-1/3 w-px h-28 bg-gradient-to-b from-cyan-300/25 to-transparent transform rotate-12"></div>
          <div className="absolute top-1/2 right-1/2 w-px h-20 bg-gradient-to-b from-blue-300/30 to-transparent transform rotate-45"></div>
          
          {/* Floating dots */}
          <div className="absolute top-1/4 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8">
            {/* Profile Picture */}
            <div className="mb-6 flex justify-center">
              <img 
                src="/lovable-uploads/b76ddfd7-5e01-4edf-b5a4-0d1bae7fb384.png" 
                alt="Sam Bryant" 
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-cyan-400 shadow-2xl object-cover"
              />
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Sam Bryant
            </h1>
            
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-400 mb-4">
              Enterprise Sales Executive | $50m+ Career Bookings
            </h2>
            
            <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Helping Enterprise Software Companies Win, Land and Expand Global Accounts
            </p>
            
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-white">Ask my digital twin</h3>
          </div>

          {/* Chat Interface */}
          <div className="max-w-4xl mx-auto">
            <div className="h-[60vh] border border-gray-700 backdrop-blur-sm flex flex-col rounded-lg shadow-xl bg-gray-900/50">
              <div className="border-b border-gray-700 flex flex-col space-y-1.5 p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">AI Sam Bryant</h3>
                    <p className="text-xs text-gray-400">Ask me anything about Sam's background and experience</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col p-0">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                            : 'bg-gray-800 text-gray-100 border border-gray-700'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg flex items-center space-x-2 border border-gray-700">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">AI Sam is thinking...</span>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {messages.length === 1 && (
                  <div className="p-4 border-t border-gray-700">
                    <p className="text-sm text-gray-400 mb-3">Suggested questions to get started:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setInputMessage(question)}
                          className="text-left text-xs p-2 hover:opacity-80 rounded border border-gray-600 text-gray-300 transition-colors bg-gray-800"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 border-t border-gray-700">
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Hi I am trained on Sam Bryant's, work, case studies, experience and philosophy."
                      className="flex-1 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      onKeyPress={handleKeyPress}
                      disabled={isLoading}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={isLoading || !inputMessage.trim()}
                      size="icon"
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - moved and simplified */}
      <section className="py-12 bg-gradient-to-b from-black to-slate-900 relative">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Let's Connect
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Get in touch to discuss enterprise sales opportunities.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col gap-3">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-3 text-base transition-all duration-300"
                onClick={handleEmailClick}
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Me
              </Button>
              
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 text-base transition-all duration-300"
                onClick={handlePhoneClick}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Me
              </Button>
              
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 text-base transition-all duration-300"
                onClick={handleLinkedInClick}
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn Profile
              </Button>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-base text-gray-400">
                Built using Claude, Lovable & Supabase
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
