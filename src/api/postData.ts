"use server";
import { dbTableType } from "@/types/database.tables.types";
import { TablesInsert } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function postData<ITableName extends dbTableType>({
  tableName,
  payload,
}: {
  tableName: ITableName;
  payload: TablesInsert<ITableName>[];
}) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from(tableName)
    .insert(payload)
    .select("id");
  return { data: data, error: error };
}
