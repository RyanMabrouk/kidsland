import getOrders from "@/api/getOrders";
import { Tables } from "@/types/database.types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    staleTime: Infinity,
  });
}