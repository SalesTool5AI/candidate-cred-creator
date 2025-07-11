import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, User, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Conversation {
  id: string;
  user_email: string;
  user_name: string | null;
  created_at: string;
  updated_at: string;
  message_count?: number;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export const ConversationManager = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_all_conversations_for_admin');
        
      if (error) throw error;
      setConversations(data || []);
    } catch (error: any) {
      toast({
        title: "Error", 
        description: "Failed to fetch conversations: " + error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('get_messages_for_admin', { conversation_uuid: conversationId });

      if (error) throw error;
      
      // Type-safe filtering to ensure role is correct
      const typedMessages: Message[] = (data || [])
        .filter(msg => msg.role === 'user' || msg.role === 'assistant')
        .map(msg => ({
          id: msg.id,
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
          created_at: msg.created_at
        }));
      
      setMessages(typedMessages);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch messages: " + error.message,
        variant: "destructive"
      });
    }
  };

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
    fetchMessages(conversationId);
  };

  if (loading) {
    return <div className="text-center text-white">Loading conversations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Chat Conversations</h2>
        <p className="text-gray-300">Review all conversations with AI Sam</p>
      </div>

      <Tabs defaultValue="conversations" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800">
          <TabsTrigger value="conversations" className="text-gray-300 data-[state=active]:text-white">
            All Conversations ({conversations.length})
          </TabsTrigger>
          <TabsTrigger value="messages" className="text-gray-300 data-[state=active]:text-white">
            Messages {selectedConversation ? `(${messages.length})` : ''}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="conversations" className="space-y-4">
          {conversations.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              No conversations found.
            </div>
          ) : (
            <div className="grid gap-4">
              {conversations.map((conversation) => (
                <Card 
                  key={conversation.id} 
                  className={`bg-gray-800/50 border-gray-700 cursor-pointer transition-colors hover:bg-gray-800/70 ${
                    selectedConversation === conversation.id ? 'ring-2 ring-cyan-500' : ''
                  }`}
                  onClick={() => handleConversationSelect(conversation.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">
                            {conversation.user_name || 'Anonymous User'}
                          </CardTitle>
                          <p className="text-gray-400 text-sm">{conversation.user_email}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          {conversation.message_count} messages
                        </Badge>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(conversation.updated_at).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm">
                      Started: {new Date(conversation.created_at).toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Last activity: {new Date(conversation.updated_at).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          {!selectedConversation ? (
            <div className="text-center text-gray-400 py-12">
              Select a conversation to view messages.
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              No messages found in this conversation.
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <Card key={message.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <Badge 
                        variant={message.role === 'user' ? 'default' : 'secondary'}
                        className={message.role === 'user' ? 'bg-cyan-600' : 'bg-gray-600'}
                      >
                        {message.role === 'user' ? 'User' : 'AI Sam'}
                      </Badge>
                      <span className="text-gray-400 text-xs">
                        {new Date(message.created_at).toLocaleString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 whitespace-pre-wrap">{message.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};