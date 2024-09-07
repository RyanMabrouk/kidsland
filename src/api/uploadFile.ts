"use server";
import { UploadToBucket } from "./UploadToBucket";

export async function uploadFile({
  formData,
  name,
  title,
}: {
  formData: FormData;
  name: string;
  title: string;
}) {
  const file = formData.get(name) as File;
  if (!file) {
    throw new Error("File not found in form data");
  }
  const { data, error } = await UploadToBucket({
    file,
    fileName: title,
    bucketName: "products_images",
  });
  if (error) {
    throw new Error(`Failed to upload the file: ${error.message}`);
  }

  return (process.env.SUPABASE_STORAGE_LINK as string) +"/"+ data?.fullPath;
}
