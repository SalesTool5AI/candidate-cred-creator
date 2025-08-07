-- Remove gmail.com from allowed_domains if it exists
DELETE FROM public.allowed_domains WHERE domain = 'gmail.com';

-- Create a table for individually authorized emails (not dependent on auth.users)
CREATE TABLE IF NOT EXISTS public.authorized_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  authorized_by text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on authorized_emails
ALTER TABLE public.authorized_emails ENABLE ROW LEVEL SECURITY;

-- Allow public to read authorized emails (needed for login flow)
CREATE POLICY "Public can check authorized emails" 
ON public.authorized_emails 
FOR SELECT 
USING (true);

-- Only admins can manage authorized emails
CREATE POLICY "Only admins can manage authorized emails" 
ON public.authorized_emails 
FOR ALL 
USING (is_admin()) 
WITH CHECK (is_admin());

-- Add Emma's email to authorized emails
INSERT INTO public.authorized_emails (email, authorized_by) 
VALUES ('emmajmountain1987@gmail.com', 'manual_authorization');