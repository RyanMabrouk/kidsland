"use server";
import { dbTableType } from "@/types/database.tables.types";
import { Tables } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function deleteData<ITableName extends dbTableType>({
  tableName,
  match,
  matchInArray,
}: {
  tableName: ITableName;
  match?: Partial<Tables<ITableName>>;
  matchInArray?: {
    column: keyof Tables<ITableName>;
    in: string[];
  };
}) {
  const supabase = createServerActionClient({ cookies });
  let query = supabase.from(tableName).delete();
  if (match) {
    query = query.match(match);
  }
  Object.keys;
  if (matchInArray) {
    query = query.in(matchInArray.column as string, matchInArray.in);
  }
  const { error } = await query;
  return { error };
}
