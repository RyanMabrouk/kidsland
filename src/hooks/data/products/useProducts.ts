"use client";
import { useQuery } from "@tanstack/react-query";
import { productsQuery } from "./productsQuery";
import { Tables } from "@/types/database.types";

export default function useProducts({
  page,
  limit,
  search
}: {
  page: number;
  limit: number;
  search?: { column: keyof Tables<"products">; value: string };
}) {
  return useQuery(productsQuery({ page, limit,search }));
}
