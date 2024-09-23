"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export async function DeleteFromBucket({
  url,
  bucketName,
}: {
  url: string;
  bucketName: string;
}) {
  const supabase = createServerActionClient({ cookies });
  const filePath = url.split(`${bucketName}/`)[1];
  const { error } = await supabase.storage.from(bucketName).remove([filePath]);

  if (error) {
    console.error('Error deleting file:', error.message);
    throw error;
  }
  console.log('File deleted successfully');
}
