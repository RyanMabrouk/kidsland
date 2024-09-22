import { useQuery } from "@tanstack/react-query";
import OrdersQuery from "./OrdersQuery";

export default function useOrders() {
  const query = useQuery(OrdersQuery());
  return { ...query, data: query.data?.data };
}
