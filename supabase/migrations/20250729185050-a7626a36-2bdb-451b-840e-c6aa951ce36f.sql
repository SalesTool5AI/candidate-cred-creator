-- Fix security issues: Set search_path for all database functions to prevent SQL injection

-- Fix function: update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

-- Fix function: get_current_user_email  
CREATE OR REPLACE FUNCTION public.get_current_user_email()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
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
$function$;

-- Fix function: get_all_conversations_for_admin
CREATE OR REPLACE FUNCTION public.get_all_conversations_for_admin()
RETURNS TABLE(id uuid, user_email text, user_name text, created_at timestamp with time zone, updated_at timestamp with time zone, message_count bigint)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT 
    c.id,
    c.user_email,
    c.user_name,
    c.created_at,
    c.updated_at,
    COUNT(m.id) as message_count
  FROM chat_conversations c
  LEFT JOIN chat_messages m ON c.id = m.conversation_id
  GROUP BY c.id, c.user_email, c.user_name, c.created_at, c.updated_at
  ORDER BY c.updated_at DESC;
$function$;

-- Fix function: get_messages_for_admin
CREATE OR REPLACE FUNCTION public.get_messages_for_admin(conversation_uuid uuid)
RETURNS TABLE(id uuid, role text, content text, created_at timestamp with time zone)
LANGUAGE sql
SECURITY DEFINER  
SET search_path = public
AS $function$
  SELECT id, role, content, created_at
  FROM chat_messages
  WHERE conversation_id = conversation_uuid
  ORDER BY created_at ASC;
$function$;