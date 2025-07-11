-- Add missing RLS policies for admin operations on sam_knowledge_base table

-- Allow anyone to insert entries (since this is admin-protected at the application level)
CREATE POLICY "Allow insert on knowledge base" 
ON public.sam_knowledge_base 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to update entries
CREATE POLICY "Allow update on knowledge base" 
ON public.sam_knowledge_base 
FOR UPDATE 
USING (true);

-- Allow anyone to delete entries
CREATE POLICY "Allow delete on knowledge base" 
ON public.sam_knowledge_base 
FOR DELETE 
USING (true);