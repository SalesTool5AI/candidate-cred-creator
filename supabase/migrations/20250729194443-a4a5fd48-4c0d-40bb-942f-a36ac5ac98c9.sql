-- Add Sam Bryant as admin user (replace with your actual user ID when you create your account)
-- This is a placeholder - you'll need to update this with your real user_id after registering

-- Example: INSERT INTO public.user_roles (user_id, role) VALUES ('your-actual-user-id-here', 'admin');

-- For now, create a function to make the first user who signs up an admin
CREATE OR REPLACE FUNCTION public.make_first_user_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if this is the first user and no admins exist yet
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger to automatically make first user admin
DROP TRIGGER IF EXISTS on_auth_user_created_make_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_make_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.make_first_user_admin();