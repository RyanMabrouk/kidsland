"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database, Tables } from "@/types/database.types";
import { paginateQuery } from "@/helpers/paginateQuery";
export default async function getProducts({
  tableName,
  count = {},
  sort,
  minDiscount,
  priceRange,
  pagination,
  search,
  match,
}: {
  tableName: "products";
  count?: {
    head?: boolean;
    count?: "exact" | "planned" | "estimated";
  };
  search?: { column: keyof Tables<"products">; value: string };
  sort?: {
    column: keyof Tables<"products">;
    ascending: boolean;
  };
  match?:
    | Partial<{ [k in keyof Tables<"products">]: Tables<"products">[k] }>
    | undefined;
  minDiscount?: number;
  priceRange?: number[];
  category?: string;
  pagination?: {
    limit: number;
    page: number;
  };
}) {
  const supabase = createServerActionClient<Database>({ cookies });
  let query = supabase.from(tableName).select("*", count);
  if (sort) {
    query = query.order(sort.column as string, { ascending: sort.ascending });
  }
  if (search) {
    query = query.ilike(search.column as string, `%${search.value}%`);
  }
  if (pagination) {
    const { start, end } = paginateQuery(pagination);
    query = query.range(start, end);
  }
  if (minDiscount) {
    query = query.gte("discount", minDiscount);
  }
  if (priceRange) {
    query = query.gte("price", priceRange[0]).lte("price", priceRange[1]);
  }
  if (match) {
    query = query.match(match);
  }
  const { data, error, count: items_count } = await query;
  return {
    data: data as Tables<"products">[] | null,
    error,
    count: items_count,
  };
}
