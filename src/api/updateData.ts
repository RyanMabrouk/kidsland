"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { dbTableType } from "@/types/database.tables.types";
import { Tables, TablesUpdate } from "@/types/database.types";
import { PostgrestError } from "@supabase/supabase-js";
export default async function updateData<ITableName extends dbTableType>({
  tableName,
  payload,
  match,
}: {
  tableName: ITableName;
  payload: TablesUpdate<ITableName>;
  match: Partial<Tables<ITableName>>;
}): Promise<{
  data: Tables<ITableName>[] | null;
  error: PostgrestError | null;
}> {
  console.log(match)
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from(tableName)
    .update(payload)
    .match(match)
    .select();
  return { data, error };
}
