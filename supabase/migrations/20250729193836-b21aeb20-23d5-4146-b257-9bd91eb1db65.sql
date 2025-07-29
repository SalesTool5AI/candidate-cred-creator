-- CRITICAL SECURITY FIXES: Part 2 - Add RLS policies and secure data access

-- 1. Add user_roles policies (fixing the RLS enabled no policy warning)
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Only admins can manage roles" 
ON public.user_roles 
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 2. Fix overly permissive chat policies
DROP POLICY IF EXISTS "Allow message operations" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can create messages" ON public.chat_messages;

-- Create proper restrictive policies for chat_messages
CREATE POLICY "Users can view messages from their conversations" 
ON public.chat_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.chat_conversations 
    WHERE id = conversation_id 
    AND user_email = current_setting('request.headers', true)::json->>'x-user-email'
  )
  OR public.is_admin()
);

CREATE POLICY "Users can create messages in their conversations" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.chat_conversations 
    WHERE id = conversation_id 
    AND user_email = current_setting('request.headers', true)::json->>'x-user-email'
  )
  OR public.is_admin()
);

-- 3. Fix overly permissive conversation policies
DROP POLICY IF EXISTS "Allow conversation creation and user access" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can create conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can create their own conversations" ON public.chat_conversations;

-- Create proper restrictive policies for chat_conversations  
CREATE POLICY "Users can view their own conversations" 
ON public.chat_conversations 
FOR SELECT 
USING (
  user_email = current_setting('request.headers', true)::json->>'x-user-email'
  OR public.is_admin()
);

CREATE POLICY "Users can create their own conversations" 
ON public.chat_conversations 
FOR INSERT 
WITH CHECK (
  user_email = current_setting('request.headers', true)::json->>'x-user-email'
);

CREATE POLICY "Users can update their own conversations" 
ON public.chat_conversations 
FOR UPDATE 
USING (
  user_email = current_setting('request.headers', true)::json->>'x-user-email'
  OR public.is_admin()
);