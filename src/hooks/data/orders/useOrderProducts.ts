import getOrderProducts from "@/api/Order products/getOrderProducts";
import { Tables } from "@/types/database.types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useOrderProducts = (
  id: number,
): UseQueryResult<Tables<"order_products">[], Error> => {
  return useQuery({
    queryKey: ["orderProducts"],
    queryFn: async () => getOrderProducts(id),
  });
};
