"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database, Enums, Tables } from "@/types/database.types";

export type getOrdersParams = {
  match?: Partial<Tables<"orders">>;
  column?: string;
  status?: Enums<"status_type_enum">;
  count?: {
    head?: boolean;
    count?: "exact" | "planned" | "estimated";
  };
  search?: { column: keyof Tables<"orders">; value: string };
  sort?: {
    column: keyof Tables<"orders">;
    ascending: boolean;
  };
  pagination?: {
    limit: number;
    page: number;
  };
  filter?: {
    column: keyof Tables<"orders">;
    value: string;
    operator?:
      | "eq"
      | "neq"
      | "gt"
      | "gte"
      | "lt"
      | "lte"
      | "ilike"
      | "not_ilike"
      | "in"
      | "not_in";
  };
};

export default async function getOrders({
  status,
  match,
  column = "*",
  count = {},
  sort,
  pagination,
  search,
  filter,
}: getOrdersParams) {
  const supabase = createServerComponentClient<Database>({ cookies });
  let query = supabase
    .from("orders")
    .select(column, { count: count.count || undefined })
  if (status) {
    query.eq("status", status);
  }
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
    data: data as unknown as Tables<"orders"> | null,
    error,
    count: items_count,
  };
}
