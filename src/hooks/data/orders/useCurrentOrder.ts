import { useQuery } from "@tanstack/react-query";
import CurrentOrderQuery from "./CurrentOrderQuery";

export default function useCurrentOrder(id: string) {
  const query = useQuery(CurrentOrderQuery(id));
  return { ...query, data: query.data?.data };
}
