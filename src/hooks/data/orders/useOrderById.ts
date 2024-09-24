import { useQuery } from "@tanstack/react-query";
import OrderByIdQuery from "./OrderByIdQuery";

export default function useOrderById(id: number | null) {
  const query = useQuery(OrderByIdQuery(id));
  return { ...query, data: query?.data?.data };
}
