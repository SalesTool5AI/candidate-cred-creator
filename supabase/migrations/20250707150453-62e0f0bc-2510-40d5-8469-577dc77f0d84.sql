
-- Create a table to store allowed domains for job applications
CREATE TABLE public.allowed_domains (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  domain TEXT NOT NULL UNIQUE,
  company_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table to track authorized users
CREATE TABLE public.authorized_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  email TEXT NOT NULL,
  domain TEXT NOT NULL,
  company_name TEXT NOT NULL,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.allowed_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authorized_users ENABLE ROW LEVEL SECURITY;

-- Create policies for allowed_domains (only you can manage these)
CREATE POLICY "Public can view allowed domains" 
  ON public.allowed_domains 
  FOR SELECT 
  TO public
  USING (true);

-- Create policies for authorized_users 
CREATE POLICY "Users can view their own record" 
  ON public.authorized_users 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own record" 
  ON public.authorized_users 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own record" 
  ON public.authorized_users 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Insert Snowflake as an example allowed domain
INSERT INTO public.allowed_domains (domain, company_name) 
VALUES ('snowflake.com', 'Snowflake Inc.');
