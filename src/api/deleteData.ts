"use server";
import { tableType } from "@/types/database.tables.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function deleteData({
  tableName,
  match,
}: {
  tableName: tableType;
  match: Record<string, unknown>;
}) {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.from(tableName).delete().match(match);
  return { error };
}
