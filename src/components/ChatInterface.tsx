
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Send, MessageCircle, Loader2, Bot } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export const ChatInterface: React.FC = () => {
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
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setConversationId(data.id);
      }

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

  const testHealthCheck = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('chat-with-sam', {
        body: { test: true }
      });
      
      if (error) {
        toast({
          title: "Health Check Failed",
          description: `Error: ${error.message}`,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Health Check Results",
        description: JSON.stringify(data, null, 2),
      });
    } catch (err) {
      toast({
        title: "Health Check Error",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    // Prevent double submissions
    if (isLoading) {
      console.warn('Message send already in progress');
      return;
    }

    console.log('Sending message:', inputMessage);

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

      console.log('Calling chat-with-sam function...');
      console.log('Request details:', { 
        userEmail, 
        currentInput, 
        conversationId,
        historyLength: conversationHistory.length 
      });

      // Call the edge function with detailed error handling
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

      console.log('Edge function response:', { data, error });

      if (error) {
        console.error('Supabase function error details:', {
          name: error.name,
          message: error.message,
          context: error.context,
          stack: error.stack
        });
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
      console.error('Full error details:', error);
      
      // Extract the actual error message from the response
      const errorData = error?.data || error;
      let errorMessage = "Failed to send message. Please try again.";
      let errorDetails = '';
      
      // Handle different error types with more detailed messages
      if (error?.name === 'FunctionsFetchError') {
        errorMessage = "Connection to AI service failed. Please check your internet connection and try again.";
      } else if (errorData?.error) {
        errorMessage = errorData.error;
        if (errorData.details) {
          errorDetails = typeof errorData.details === 'string' 
            ? errorData.details 
            : JSON.stringify(errorData.details, null, 2);
        }
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.message?.includes('ANTHROPIC_API_KEY')) {
        errorMessage = "AI service configuration error. Please contact support.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
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

  return (
    <div className="dark min-h-screen bg-gradient-to-b from-background to-background/80 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="h-[80vh] border border-border backdrop-blur-sm flex flex-col rounded-lg shadow-sm bg-background">
          <div className="border-b border-border flex flex-col space-y-1.5 p-6 bg-background">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-brand-blue rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold leading-none tracking-tight text-foreground">AI Sam Bryant</h3>
                <p className="text-sm text-muted-foreground">Ask me anything about Sam's background and experience</p>
              </div>
            </div>
            <div className="mt-2 p-2 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <p className="text-xs text-brand-blue flex items-center">
                <Bot className="w-3 h-3 mr-1" />
                This is an AI assistant trained on Sam Bryant's professional information
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col p-0 bg-background">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ring-0 outline-none focus:ring-0 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-primary to-brand-blue text-primary-foreground'
                        : 'text-foreground border border-border bg-secondary'
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
                  <div className="text-foreground px-4 py-2 rounded-lg flex items-center space-x-2 border border-border ring-0 outline-none focus:ring-0 bg-secondary">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">AI Sam is thinking...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="p-4 border-t border-border bg-background">
                <p className="text-sm text-muted-foreground mb-3">Suggested questions to get started:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(question)}
                      className="text-left text-xs p-2 hover:opacity-80 rounded border border-border text-muted-foreground transition-colors bg-secondary"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-t border-border bg-background">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask AI Sam anything..."
                  className="flex-1 bg-input border-border text-foreground placeholder-muted-foreground"
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <Button
                  onClick={testHealthCheck}
                  variant="outline"
                  size="icon"
                  className="border-border text-muted-foreground hover:bg-secondary"
                  title="Test API Health"
                >
                  <Bot className="w-4 h-4" />
                </Button>
                <Button
                  onClick={sendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  size="icon"
                  className="bg-gradient-to-r from-primary to-brand-blue hover:from-brand-cyan-dark hover:to-brand-blue"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
