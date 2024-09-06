"use server";
import { tableType } from "@/types/database.tables.types";
import { TablesInsert } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function postData({
  tableName,
  payload,
}: {
  tableName: tableType;
  payload: TablesInsert<'products'> // younes baddalha bellehi ma t3ayatch 3la monta
}) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from(tableName)
    .insert(payload)
    .select();
  return { data: data, error: error };
}
