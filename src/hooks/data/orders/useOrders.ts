import getOrders from "@/api/getOrders";
import { Tables } from "@/types/database.types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const useOrders = (): UseQueryResult<Tables<"orders">, Error> =>
  useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
