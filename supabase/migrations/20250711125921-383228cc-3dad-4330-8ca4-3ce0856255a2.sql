-- Create admin functions to bypass RLS for conversation management

-- Function to get all conversations for admin
CREATE OR REPLACE FUNCTION get_all_conversations_for_admin()
RETURNS TABLE (
  id uuid,
  user_email text,
  user_name text,
  created_at timestamptz,
  updated_at timestamptz,
  message_count bigint
) 
SECURITY DEFINER
LANGUAGE sql
AS $$
  SELECT 
    c.id,
    c.user_email,
    c.user_name,
    c.created_at,
    c.updated_at,
    COUNT(m.id) as message_count
  FROM chat_conversations c
  LEFT JOIN chat_messages m ON c.id = m.conversation_id
  GROUP BY c.id, c.user_email, c.user_name, c.created_at, c.updated_at
  ORDER BY c.updated_at DESC;
$$;

-- Function to get all messages for a conversation (admin)
CREATE OR REPLACE FUNCTION get_messages_for_admin(conversation_uuid uuid)
RETURNS TABLE (
  id uuid,
  role text,
  content text,
  created_at timestamptz
)
SECURITY DEFINER  
LANGUAGE sql
AS $$
  SELECT id, role, content, created_at
  FROM chat_messages
  WHERE conversation_id = conversation_uuid
  ORDER BY created_at ASC;
$$;