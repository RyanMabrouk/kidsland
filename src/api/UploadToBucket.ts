"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export async function UploadToBucket({
  file,
  fileName,
  bucketName,
}: {
  file: File;
  fileName: string;
  bucketName: string;
}) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });
  return { data, error };
}
