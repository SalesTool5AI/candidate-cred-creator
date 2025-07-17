-- Create table for pending access requests
CREATE TABLE public.pending_access_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  domain TEXT NOT NULL,
  company_name TEXT,
  request_message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.pending_access_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for pending access requests
CREATE POLICY "Anyone can insert pending requests" 
  ON public.pending_access_requests 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can view pending requests" 
  ON public.pending_access_requests 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can update pending requests" 
  ON public.pending_access_requests 
  FOR UPDATE 
  USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_pending_requests_updated_at
  BEFORE UPDATE ON public.pending_access_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for pending requests
ALTER TABLE public.pending_access_requests REPLICA IDENTITY FULL;

-- Add table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.pending_access_requests;