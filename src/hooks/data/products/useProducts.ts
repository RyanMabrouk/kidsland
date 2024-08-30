"use client";
import { useQuery } from "@tanstack/react-query";
import { productsQuery } from "./productsQuery";

export default function useProducts({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  return useQuery(productsQuery({ page, limit }));
}
