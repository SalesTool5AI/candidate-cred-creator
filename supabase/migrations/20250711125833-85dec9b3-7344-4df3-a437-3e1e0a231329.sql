-- Update RLS policies for secure conversation access based on user session

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can update their own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can view their own messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can create messages in their conversations" ON public.chat_messages;
DROP POLICY IF EXISTS "Admin can view all conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Admin can view all messages" ON public.chat_messages;

-- Create a function to get current user email from headers or settings
CREATE OR REPLACE FUNCTION get_current_user_email()
RETURNS text AS $$
BEGIN
  -- Try to get email from request headers first (for regular users)
  RETURN coalesce(
    current_setting('request.headers', true)::json->>'x-user-email',
    current_setting('app.current_user_email', true),
    'anonymous'
  );
EXCEPTION WHEN OTHERS THEN
  RETURN 'anonymous';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Simplified RLS policies that allow users to see their own data
CREATE POLICY "Users can manage their own conversations" 
ON public.chat_conversations 
FOR ALL
USING (
  -- Allow if it's the user's conversation or if it's admin access
  user_email = get_current_user_email() OR
  current_setting('app.admin_access', true) = 'true'
);

CREATE POLICY "Users can manage their own messages" 
ON public.chat_messages 
FOR ALL
USING (
  -- Allow if the message belongs to user's conversation or if it's admin access
  conversation_id IN (
    SELECT id FROM public.chat_conversations 
    WHERE user_email = get_current_user_email()
  ) OR
  current_setting('app.admin_access', true) = 'true'
);