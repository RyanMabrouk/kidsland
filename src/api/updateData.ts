"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { tableType } from "@/types/database.tables.types";
export default async function updateData<
  IPayload extends object,
  IMatch extends object,
>({
  tableName,
  payload,
  match,
}: {
  tableName: tableType;
  payload: IPayload;
  match: IMatch;
}) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from(tableName)
    .update(payload)
    .match(match)
    .select();
  return { data: data, error: error };
}
