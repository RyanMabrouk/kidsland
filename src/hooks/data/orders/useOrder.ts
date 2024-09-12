import { getOrder } from "@/api/getOrder";
import getOrders from "@/api/getOrders";
import { Tables } from "@/types/database.types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export function useOrder(): UseQueryResult<{ data: Tables<"orders"> }> {
  return useQuery({
    queryKey: ["order"],
    queryFn: async () => await getOrder(),
    staleTime: Infinity,
  });
}
