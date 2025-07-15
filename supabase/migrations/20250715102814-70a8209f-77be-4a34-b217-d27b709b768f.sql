-- Create storage bucket for CV files
INSERT INTO storage.buckets (id, name, public) VALUES ('cv-files', 'cv-files', true);

-- Create policies for CV bucket
CREATE POLICY "CV files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'cv-files');

CREATE POLICY "Admin can upload CV files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'cv-files');