"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { tableType } from "@/types/database.tables.types";
export default async function updateData({
  tableName,
  payload,
  match,
}: {
  tableName: tableType;
  payload: Record<string, unknown>;
  match: Record<string, unknown>;
}) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from(tableName)
    .update(payload)
    .match(match)
    .select();
  return { data: data, error: error };
}
