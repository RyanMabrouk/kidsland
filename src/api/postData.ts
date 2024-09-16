"use server";
import { dbTableType } from "@/types/database.tables.types";
import { Tables, TablesInsert } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
export default async function postData<ITableName extends dbTableType>({
  tableName,
  payload,
}: {
  tableName: ITableName;
  payload: TablesInsert<ITableName>[];
}): Promise<{
  data: Tables<ITableName>[] | null;
  error: PostgrestError | null;
}> {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from(tableName)
    .insert(payload)
    .select();
  return { data, error };
}
