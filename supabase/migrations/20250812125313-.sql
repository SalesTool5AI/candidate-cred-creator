-- Tighten access to authorized_emails to prevent email harvesting
ALTER TABLE public.authorized_emails ENABLE ROW LEVEL SECURITY;

-- Drop existing public SELECT policy if present
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'authorized_emails' AND policyname = 'Public can check authorized emails'
  ) THEN
    DROP POLICY "Public can check authorized emails" ON public.authorized_emails;
  END IF;
END $$;

-- Allow admins to view
CREATE POLICY "Admins can view authorized emails"
ON public.authorized_emails
AS PERMISSIVE
FOR SELECT
USING (public.is_admin());

-- Allow authenticated users to view (but not anonymous/public)
CREATE POLICY "Authenticated users can view authorized emails"
ON public.authorized_emails
AS PERMISSIVE
FOR SELECT
USING (auth.role() = 'authenticated');