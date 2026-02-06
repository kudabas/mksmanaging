-- Create storage bucket for record files
INSERT INTO storage.buckets (id, name, public)
VALUES ('record-files', 'record-files', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'record-files');

-- Allow public read access
CREATE POLICY "Anyone can view files"
ON storage.objects FOR SELECT
USING (bucket_id = 'record-files');

-- Allow authenticated users to delete their files
CREATE POLICY "Authenticated users can delete files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'record-files');