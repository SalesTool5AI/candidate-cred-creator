-- CRITICAL SECURITY FIXES: Implement proper RLS policies and user roles

-- 1. Create user roles system for admin access control
CREATE TYPE IF NOT EXISTS public.user_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table for role-based access control
CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role user_role NOT NULL DEFAULT 'user',
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role user_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- 4. Create function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin');
$$;

-- 5. Fix overly permissive chat policies
DROP POLICY IF EXISTS "Allow message operations" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can create messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Allow conversation creation and user access" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can create conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can create their own conversations" ON public.chat_conversations;

-- Create proper restrictive policies for chat_messages
CREATE POLICY "Users can view messages from their conversations" 
ON public.chat_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.chat_conversations 
    WHERE id = conversation_id 
    AND user_email = current_setting('request.headers')::json->>'x-user-email'
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
    AND user_email = current_setting('request.headers')::json->>'x-user-email'
  )
  OR public.is_admin()
);

-- Create proper restrictive policies for chat_conversations  
CREATE POLICY "Users can view their own conversations" 
ON public.chat_conversations 
FOR SELECT 
USING (
  user_email = current_setting('request.headers')::json->>'x-user-email'
  OR public.is_admin()
);

CREATE POLICY "Users can create their own conversations" 
ON public.chat_conversations 
FOR INSERT 
WITH CHECK (
  user_email = current_setting('request.headers')::json->>'x-user-email'
);

CREATE POLICY "Users can update their own conversations" 
ON public.chat_conversations 
FOR UPDATE 
USING (
  user_email = current_setting('request.headers')::json->>'x-user-email'
  OR public.is_admin()
);

-- 6. Secure admin functions with role checks
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

-- 7. Add user_roles policies
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Only admins can manage roles" 
ON public.user_roles 
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 8. Restrict pending_access_requests to remove all-access policy
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

-- 9. Make knowledge base truly read-only for non-admins
DROP POLICY IF EXISTS "Allow delete on knowledge base" ON public.sam_knowledge_base;
DROP POLICY IF EXISTS "Allow insert on knowledge base" ON public.sam_knowledge_base;  
DROP POLICY IF EXISTS "Allow update on knowledge base" ON public.sam_knowledge_base;

CREATE POLICY "Only admins can modify knowledge base" 
ON public.sam_knowledge_base 
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());