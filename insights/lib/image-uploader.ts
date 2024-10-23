import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface UploadResult {
  path: string;
  url: string;
}

export async function uploadImage(
  supabase: SupabaseClient,
  buffer: Buffer,
  folder: string,
  filename: string
): Promise<UploadResult> {
  const fullPath = `${folder}/${filename}`;
  
  const { data, error } = await supabase.storage
    .from('betting-images')
    .upload(fullPath, buffer, {
      contentType: 'image/png',
      upsert: true
    });

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from('betting-images')
    .getPublicUrl(fullPath);

  return {
    path: fullPath,
    url: publicUrl.publicUrl
  };
}