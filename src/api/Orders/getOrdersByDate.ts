"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database, Enums, Tables } from "@/types/database.types";

export type getOrdersByDateParams = {
  search?: { column: keyof Tables<"orders">; value: string };
  date :string;
  pagination: {
    limit: number;
    page: number;
  };
};

export default async function getOrdersByDate({
  search,
  date,
  pagination,
}: getOrdersByDateParams) {
  const supabase = createServerComponentClient<Database>({ cookies });
  let query = supabase
    .from("orders")
    .select("*")
    .gte("created_at", `${date}T00:00:00`)
    .lt("created_at", `${date}T23:59:59`);
  if (search) {
      query = query.ilike(search.column, `%${search.value}%`);
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
