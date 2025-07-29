-- CRITICAL SECURITY FIXES: Part 3 - Secure admin functions and access requests

-- 1. Secure admin functions with role checks
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
  WHERE public.is_admin() -- Only admins can access this function
  GROUP BY c.id, c.user_email, c.user_name, c.created_at, c.updated_at
  ORDER BY c.updated_at DESC;
$function$;

CREATE OR REPLACE FUNCTION public.get_messages_for_admin(conversation_uuid uuid)
RETURNS TABLE(id uuid, role text, content text, created_at timestamp with time zone)
LANGUAGE sql
SECURITY DEFINER  
SET search_path = public
AS $function$
  SELECT id, role, content, created_at
  FROM chat_messages
  WHERE conversation_id = conversation_uuid
    AND public.is_admin() -- Only admins can access this function
  ORDER BY created_at ASC;
$function$;

-- 2. Restrict pending_access_requests to remove all-access policy
DROP POLICY IF EXISTS "Anyone can view pending requests" ON public.pending_access_requests;
DROP POLICY IF EXISTS "Anyone can update pending requests" ON public.pending_access_requests;

-- Create restricted policies for access requests
CREATE POLICY "Public can create access requests" 
ON public.pending_access_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all access requests" 
ON public.pending_access_requests 
FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can update access requests" 
ON public.pending_access_requests 
FOR UPDATE 
USING (public.is_admin());

-- 3. Make knowledge base truly read-only for non-admins
DROP POLICY IF EXISTS "Allow delete on knowledge base" ON public.sam_knowledge_base;
DROP POLICY IF EXISTS "Allow insert on knowledge base" ON public.sam_knowledge_base;  
DROP POLICY IF EXISTS "Allow update on knowledge base" ON public.sam_knowledge_base;

CREATE POLICY "Only admins can modify knowledge base" 
ON public.sam_knowledge_base 
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());