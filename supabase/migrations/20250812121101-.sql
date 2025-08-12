-- Create Jack's account with email and secure password
-- This will be handled by Supabase Auth, but we can prepare by ensuring his domain is allowed

-- Verify Palo Alto Networks domain exists (it should already be there)
INSERT INTO allowed_domains (domain, company_name) 
VALUES ('paloaltonetworks.com', 'Palo Alto Networks')
ON CONFLICT (domain) DO NOTHING;