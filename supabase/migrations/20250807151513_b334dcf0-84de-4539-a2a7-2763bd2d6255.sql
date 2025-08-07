-- Add emmajmountain1987@gmail.com to authorized users
INSERT INTO public.authorized_users (user_id, email, domain, company_name) 
VALUES (gen_random_uuid(), 'emmajmountain1987@gmail.com', 'gmail.com', 'Gmail');