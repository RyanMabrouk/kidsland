"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database, Tables } from "@/types/database.types";
import { dbTableType } from "@/types/database.tables.types";
import getSession from "./getSession";
export default async function getData<ITableName extends dbTableType>({
  tableName,
  user,
  match,
  column = "*",
  count = {},
  sort,
  pagination,
  search,
}: {
  tableName: ITableName;
  user?: boolean;
  match?: Partial<Tables<ITableName>>;
  column?: string;
  count?: {
    head?: boolean;
    count?: "exact" | "planned" | "estimated";
  };
  search?: { column: keyof Tables<ITableName>; value: string };
  sort?: {
    column: keyof Tables<ITableName>;
    ascending: boolean;
  };
  pagination?: {
    limit: number;
    page: number;
  };
}) {
  const supabase = createServerActionClient<Database>({ cookies });
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
    query = query.order(sort.column as string, { ascending: sort.ascending });
  }
  if (search) {
    query = query.ilike(search.column as string, `%${search.value}%`);
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
  return {
    data: data as Tables<ITableName>[] | null,
    error,
    count: items_count,
  };
}
