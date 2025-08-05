-- Create a table to track site visits for notification purposes
CREATE TABLE public.site_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_ip TEXT,
  user_agent TEXT,
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_email TEXT,
  notified BOOLEAN DEFAULT false
);

-- Enable RLS on site visits table
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

-- Create policy for site visits (allow anonymous inserts)
CREATE POLICY "Anyone can record site visits" 
ON public.site_visits 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admins to view site visits
CREATE POLICY "Admins can view site visits" 
ON public.site_visits 
FOR SELECT 
USING (is_admin());

-- Create function to notify on new user login
CREATE OR REPLACE FUNCTION public.notify_new_user_login()
RETURNS TRIGGER AS $$
DECLARE
  notification_payload JSONB;
BEGIN
  -- Prepare notification payload
  notification_payload := jsonb_build_object(
    'type', 'login',
    'email', NEW.email,
    'company_name', NEW.company_name,
    'domain', NEW.domain,
    'timestamp', NEW.created_at
  );
  
  -- Call the notification edge function
  PERFORM
    net.http_post(
      url := 'https://navnadoeznbzvqivamem.supabase.co/functions/v1/send-user-activity-notification',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key', true) || '"}'::jsonb,
      body := notification_payload
    );
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user logins
CREATE TRIGGER notify_on_new_user_login
  AFTER INSERT ON public.authorized_users
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_user_login();

-- Create function to notify on site visits
CREATE OR REPLACE FUNCTION public.notify_site_visit()
RETURNS TRIGGER AS $$
DECLARE
  notification_payload JSONB;
BEGIN
  -- Only notify if not already notified
  IF NEW.notified = false THEN
    -- Prepare notification payload
    notification_payload := jsonb_build_object(
      'type', 'site_view',
      'user_agent', NEW.user_agent,
      'ip_address', NEW.visitor_ip,
      'timestamp', NEW.visited_at
    );
    
    -- Call the notification edge function
    PERFORM
      net.http_post(
        url := 'https://navnadoeznbzvqivamem.supabase.co/functions/v1/send-user-activity-notification',
        headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key', true) || '"}'::jsonb,
        body := notification_payload
      );
      
    -- Mark as notified
    UPDATE public.site_visits SET notified = true WHERE id = NEW.id;
  END IF;
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for site visits
CREATE TRIGGER notify_on_site_visit
  AFTER INSERT ON public.site_visits
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_site_visit();