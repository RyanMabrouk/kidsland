import { getOrder } from "@/api/Order/getOrder";
import { Tables } from "@/types/database.types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export function useOrder() {
  return useQuery({
    queryKey: ["order"],
    queryFn: async () => await getOrder(),
    staleTime: Infinity,
  });
}
