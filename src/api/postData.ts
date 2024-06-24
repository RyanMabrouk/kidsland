"use server";
import { tableType } from "@/types/database.tables.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function postData({
  tableName,
  payload,
}: {
  tableName: tableType;
  payload: Record<string, unknown>;
}) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from(tableName)
    .insert(payload)
    .select();
  return { data: data, error: error };
}
