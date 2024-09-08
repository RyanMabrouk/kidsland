"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database, Tables } from "@/types/database.types";
import { PostgrestError } from "@supabase/supabase-js";

export type getPurchasesParams = {
  match?: Record<string, unknown>;
  column?: string;
  count?: {
    head?: boolean;
    count?: "exact" | "planned" | "estimated";
  };
  search?: { column: string; value: string };
  sort?: {
    column: string;
    ascending: boolean;
  };
  pagination?: {
    limit: number;
    page: number;
  };
  filter?: { 
    column: string; 
    value: string;
    operator?: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "ilike" | "not_ilike" | "in" | "not_in";
  };
};

export default async function getPurchases({
  match,
  column = "*",
  count = {},
  sort,
  pagination,
  search,
  filter,
}: getPurchasesParams): Promise<{
  data: Tables<"purchases">[] | null;
  error: PostgrestError | null;
  count: number | null;
}> {
  const supabase = createServerComponentClient<Database>({ cookies });
    let query = supabase
    .from("purchases")
    .select(column, { count: count.count || undefined }); 
  if (match) {
    query = query.match(match);
  }
  if (sort) {
    query = query.order(sort.column, { ascending: sort.ascending });
  }
  if (search) {
    query = query.ilike(search.column, `%${search.value}%`);
  }
  if (filter) {
    query = query.filter(filter.column, filter.operator || "eq", filter.value);
  }
  if (pagination) {
    const start = pagination.page === 1 ? 0 : (pagination.page - 1) * pagination.limit;
    const end = pagination.page === 1 ? pagination.limit - 1 : start + pagination.limit - 1;
    query = query.range(start, end);
  }
  try {
    const { data, error, count: items_count } = await query;
    if (error) {
      console.error("Error fetching purchases:", error);
      return { data: null, error, count: null };
    }
    return { data: data || null, error: null, count: items_count };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { data: null, error: err as PostgrestError, count: null };
  }
}
