"use server";
import { createClient } from "@/lib/supabase";
export async function DeleteFromBucket({
  url,
  bucketName,
}: {
  url: string;
  bucketName: string;
}) {
  const supabase = createClient();
  const filePath = url.split(`${bucketName}/`)[1];
  const { error } = await supabase.storage.from(bucketName).remove([filePath]);

  if (error) {
    console.error('Error deleting file:', error.message);
    throw error;
  }
  console.log('File deleted successfully');
}
