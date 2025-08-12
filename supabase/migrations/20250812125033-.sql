-- 1) Helper function to safely read current user email from headers or setting
CREATE OR REPLACE FUNCTION public.get_current_user_email()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN coalesce(
    current_setting('request.headers', true)::json->>'x-user-email',
    current_setting('app.current_user_email', true),
    'anonymous'
  );
EXCEPTION WHEN OTHERS THEN
  RETURN 'anonymous';
END;
$function$;

-- 2) Helper function to fetch conversation owner email
CREATE OR REPLACE FUNCTION public.get_conversation_owner_email(_conversation_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT user_email FROM public.chat_conversations WHERE id = _conversation_id;
$function$;

-- 3) Tighten RLS on chat_conversations
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

-- Drop overly permissive policies if they exist
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'chat_conversations' AND policyname = 'Allow anonymous conversation viewing'
  ) THEN
    DROP POLICY "Allow anonymous conversation viewing" ON public.chat_conversations;
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'chat_conversations' AND policyname = 'Allow anonymous conversation updates'
  ) THEN
    DROP POLICY "Allow anonymous conversation updates" ON public.chat_conversations;
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'chat_conversations' AND policyname = 'Allow anonymous conversation creation'
  ) THEN
    DROP POLICY "Allow anonymous conversation creation" ON public.chat_conversations;
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'chat_conversations' AND policyname = 'Anyone can create chat conversations'
  ) THEN
    DROP POLICY "Anyone can create chat conversations" ON public.chat_conversations;
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'chat_conversations' AND policyname = 'Admins can do everything on conversations'
  ) THEN
    DROP POLICY "Admins can do everything on conversations" ON public.chat_conversations;
  END IF;
END $$;

-- Recreate least-privilege policies
-- Admin full access
CREATE POLICY "Admins can manage conversations"
ON public.chat_conversations
AS PERMISSIVE
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Users can insert their own conversation (email must match header)
CREATE POLICY "Users can create their conversation"
ON public.chat_conversations
AS PERMISSIVE
FOR INSERT
WITH CHECK (user_email = public.get_current_user_email());

-- Users can view their conversations
CREATE POLICY "Users can view their conversations"
ON public.chat_conversations
AS PERMISSIVE
FOR SELECT
USING (user_email = public.get_current_user_email());

-- Users can update their conversations (e.g., updated_at)
CREATE POLICY "Users can update their conversations"
ON public.chat_conversations
AS PERMISSIVE
FOR UPDATE
USING (user_email = public.get_current_user_email())
WITH CHECK (user_email = public.get_current_user_email());

-- 4) Tighten RLS on chat_messages
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Drop overly permissive policies on chat_messages
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'chat_messages' AND policyname = 'Allow anonymous message viewing'
  ) THEN
    DROP POLICY "Allow anonymous message viewing" ON public.chat_messages;
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'chat_messages' AND policyname = 'Allow anonymous message creation'
  ) THEN
    DROP POLICY "Allow anonymous message creation" ON public.chat_messages;
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'chat_messages' AND policyname = 'Anyone can create chat messages'
  ) THEN
    DROP POLICY "Anyone can create chat messages" ON public.chat_messages;
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'chat_messages' AND policyname = 'Anyone can view chat messages'
  ) THEN
    DROP POLICY "Anyone can view chat messages" ON public.chat_messages;
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'chat_messages' AND policyname = 'Admins can do everything on messages'
  ) THEN
    DROP POLICY "Admins can do everything on messages" ON public.chat_messages;
  END IF;
END $$;

-- Admin full access
CREATE POLICY "Admins can manage messages"
ON public.chat_messages
AS PERMISSIVE
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Users can insert messages for their conversations
CREATE POLICY "Users can create messages in their conversations"
ON public.chat_messages
AS PERMISSIVE
FOR INSERT
WITH CHECK (
  public.get_conversation_owner_email(conversation_id) = public.get_current_user_email()
);

-- Users can view messages for their conversations
CREATE POLICY "Users can view messages in their conversations"
ON public.chat_messages
AS PERMISSIVE
FOR SELECT
USING (
  public.get_conversation_owner_email(conversation_id) = public.get_current_user_email()
);
