import { getOrder } from "@/api/Order/getOrder";
import getOrders from "@/api/Orders/getOrders";
import { Tables } from "@/types/database.types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export function useOrder(): UseQueryResult<Tables<"orders">> {
  return useQuery({
    queryKey: ["order"],
    queryFn: async () => await getOrder(),
    staleTime: Infinity,
  });
}
