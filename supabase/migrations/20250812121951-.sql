-- Create Jack's user account directly with predetermined credentials
-- Using Supabase admin functions to create the user

-- Create user with email and password
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated', 
  'jacporter@paloaltonetworks.com',
  crypt('SamBryant2025!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Create identity record for the user
INSERT INTO auth.identities (
  provider_id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  'jacporter@paloaltonetworks.com',
  (SELECT id FROM auth.users WHERE email = 'jacporter@paloaltonetworks.com'),
  format('{"sub":"%s","email":"%s"}', (SELECT id FROM auth.users WHERE email = 'jacporter@paloaltonetworks.com'), 'jacporter@paloaltonetworks.com')::jsonb,
  'email',
  now(),
  now(),
  now()
);