import getCart from "@/api/getCart";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useCart = () =>
  useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    staleTime: Infinity,
  });

export default useCart;
