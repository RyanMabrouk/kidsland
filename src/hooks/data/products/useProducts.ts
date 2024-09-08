"use client";
import { useQuery } from "@tanstack/react-query";
import { productsQuery } from "./productsQuery";
import { Tables } from "@/types/database.types";
import useCart from "../cart/useCart";

export default function useProducts({
  page,
  limit,
  sort,
  search,
  filters,
}: {
  page: number;
  limit: number;
  sort?: {
    ascending: boolean;
    column: keyof Tables<"products">;
  };
  search?: { column: keyof Tables<"products">; value: string };
  filters?: {
    minDiscount: number;
    priceRange: number[];
  };
}) {
  const { data: cart } = useCart();
  return useQuery(
    productsQuery({
      page,
      limit,
      sort,
      search,
      cartProducts: cart?.data,
      filters,
    }),
  );
}
