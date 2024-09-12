import getCart from "@/api/getCart";
import { Cart } from "@/types/database.tables.types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export default function useCart(): UseQueryResult<Cart, Error> {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    staleTime: Infinity,
  });
}
