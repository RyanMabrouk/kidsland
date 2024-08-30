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
  count?: {
    head?: boolean;
    count?: "exact" | "planned" | "estimated";
  };
  sort?: {
    column: string;
    ascending: boolean;
  };
  pagination?: {
    limit: number;
    page: number;
  };
};
export default async function getData<T = any>({
  tableName,
  user,
  match,
  column = "*",
  count = {},
  sort,
  pagination,
}: getDataParams): Promise<{
  data: T[] | null;
  error: PostgrestError | null;
  count: number | null;
}> {
  const supabase = createServerComponentClient<Database>({ cookies });
  let query = supabase.from(tableName).select(column, count);
  if (match) {
    query = query.match(match);
  }
  if (user) {
    const { session, error: sessionErr } = await getSession();
    const user_id = session?.user?.id;
    if (!user_id || sessionErr) {
      return {
        data: null,
        count: null,
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
      pagination.page === 1 ? 0 : (pagination.page - 1) * pagination.limit;
    const end =
      pagination.page === 1
        ? pagination.limit - 1
        : start + pagination.limit - 1;
    query = query.range(start, end);
  }
  const { data, error, count: items_count } = await query;
  // @ts-ignore BUG : possible bug in supabase type GenericStringError[] in data is never returned
  return { data: data, error: error, count: items_count };
}
