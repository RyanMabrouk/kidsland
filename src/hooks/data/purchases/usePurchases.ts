"use client";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/types/database.types";
import { purchasesQuery } from "./purchasesQuery";

export default function usePurchases({
  page,
  limit,
  sort,
  search,
}: {
  page: number;
  limit: number;
  sort?: {
    ascending: boolean;
    column: keyof Tables<"purchases">;
  };
  search?: { column: keyof Tables<"purchases">; value: string };
}) {
  return useQuery(purchasesQuery({ page, limit, sort, search }));
}
