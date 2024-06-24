"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/database.types";
import { PostgrestError } from "@supabase/supabase-js";
import { tableType } from "@/types/database.tables.types";
import getSession from "./getSession";
type getDataParams = {
  tableName: tableType;
  user?: boolean;
  match?: Record<string, unknown>;
  column?: string;
  sort?: {
    column: string;
    ascending: boolean;
  };
  pagination?: {
    itemsPerPage: number;
    page: number;
  };
};
export default async function getData<T = any>({
  tableName,
  user,
  match,
  column = "*",
  sort,
  pagination,
}: getDataParams): Promise<{
  data: T[] | null;
  error: PostgrestError | null;
}> {
  const supabase = createServerComponentClient<Database>({ cookies });
  let query = supabase.from(tableName).select(column);
  if (match) {
    query = query.match(match);
  }
  if (user) {
    const { session, error: sessionErr } = await getSession();
    const user_id = session?.user?.id;
    if (!user_id || sessionErr) {
      return {
        data: null,
        error: {
          message: "User not found",
          details: "User not found",
          hint: `User ${user_id} not found`,
          code: "404",
        },
      };
    }
    query = query.eq("user_id", user_id);
  }
  if (sort) {
    query = query.order(sort.column, { ascending: sort.ascending });
  }
  if (pagination) {
    const start =
      pagination.page === 1
        ? 0
        : (pagination.page - 1) * pagination.itemsPerPage;
    const end =
      pagination.page === 1
        ? pagination.itemsPerPage - 1
        : start + pagination.itemsPerPage - 1;
    query = query.range(start, end);
  }
  const { data, error } = await query;
  // @ts-ignore BUG : possible bug in supabase type GenericStringError[] in data is never returned
  return { data: data, error: error };
}
