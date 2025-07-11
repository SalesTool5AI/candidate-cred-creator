-- Update RLS policies for secure conversation access

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can view conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can view messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can update conversations" ON public.chat_conversations;

-- Create secure policies for chat_conversations
CREATE POLICY "Users can view their own conversations" 
ON public.chat_conversations 
FOR SELECT 
USING (user_email = current_setting('request.jwt.claims', true)::json->>'email' OR user_email = current_setting('app.current_user_email', true));

CREATE POLICY "Users can create their own conversations" 
ON public.chat_conversations 
FOR INSERT 
WITH CHECK (true); -- Allow creation as email is set in the application

CREATE POLICY "Users can update their own conversations" 
ON public.chat_conversations 
FOR UPDATE 
USING (user_email = current_setting('request.jwt.claims', true)::json->>'email' OR user_email = current_setting('app.current_user_email', true));

-- Create secure policies for chat_messages  
CREATE POLICY "Users can view their own messages" 
ON public.chat_messages 
FOR SELECT 
USING (
  conversation_id IN (
    SELECT id FROM public.chat_conversations 
    WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email' 
    OR user_email = current_setting('app.current_user_email', true)
  )
);

CREATE POLICY "Users can create messages in their conversations" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (
  conversation_id IN (
    SELECT id FROM public.chat_conversations 
    WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email' 
    OR user_email = current_setting('app.current_user_email', true)
  )
);

-- Create admin override policies for full access
CREATE POLICY "Admin can view all conversations" 
ON public.chat_conversations 
FOR ALL
USING (current_setting('app.admin_access', true) = 'true');

CREATE POLICY "Admin can view all messages" 
ON public.chat_messages 
FOR ALL
USING (current_setting('app.admin_access', true) = 'true');