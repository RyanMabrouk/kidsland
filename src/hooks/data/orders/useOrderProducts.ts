import getOrderProducts from "@/actions/Order products/getOrderProducts";
import { Tables } from "@/types/database.types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useOrderProducts = (id: number) => {
  return useQuery({
    queryKey: ["orderProducts"],
    queryFn: async () => getOrderProducts(id),
  });
};
