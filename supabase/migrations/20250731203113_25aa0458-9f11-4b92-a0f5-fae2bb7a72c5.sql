-- Check if chat_conversations table has proper RLS policies for anonymous users
-- First, let's ensure RLS is enabled and create policies for anonymous access

-- Enable RLS if not already enabled
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Anyone can create chat conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can view their own conversations" ON public.chat_conversations;

-- Create policy to allow anyone (including anonymous users) to create conversations
CREATE POLICY "Anyone can create chat conversations" 
ON public.chat_conversations 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow users to view conversations by email
CREATE POLICY "Users can view conversations by email" 
ON public.chat_conversations 
FOR SELECT 
USING (user_email = current_setting('request.jwt.claims', true)::json->>'email' OR auth.uid() IS NULL);

-- Also ensure chat_messages has proper policies
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can view chat messages" ON public.chat_messages;

-- Allow anyone to create messages
CREATE POLICY "Anyone can create chat messages" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to view messages (since this is a public chat interface)
CREATE POLICY "Anyone can view chat messages" 
ON public.chat_messages 
FOR SELECT 
USING (true);