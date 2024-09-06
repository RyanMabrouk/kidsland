"use client";
import { useQuery } from "@tanstack/react-query";
import { productsQuery } from "./productsQuery";
import { getDataParams } from "@/api/getData";
import { IProduct } from "@/types/database.tables.types";
import { Tables } from "@/types/database.types";

export default function useProducts({
  page,
  limit,
  sort,
  search,
}: {
  page: number;
  limit: number;
  sort?: {
    ascending: boolean;
    column: keyof Tables<"products">;
  };
  search?: { column: keyof Tables<"products">; value: string };
}) {
  return useQuery(productsQuery({ page, limit, sort, search }));
}
