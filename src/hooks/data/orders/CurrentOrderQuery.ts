import getData from "@/api/getData";
import { Tables } from "@/types/database.types";

export interface PopulatedOrderResponse extends Tables<"orders"> {
  order_products: Tables<"order_products">[];
}

export default function CurrentOrderQuery(id: string) {
  return {
    queryKey: ["order", { id, user: true }],
    queryFn: async () => {
      const { data, error } = await getData<"orders", PopulatedOrderResponse[]>(
        {
          tableName: "orders",
          column: "*, order_products(*)",
          user: true,
          match: { id: Number(id) },
        },
      );
      const totalOrder = data ? data[0] : null;
      if (totalOrder) {
        const { order_products, ...order } = totalOrder;
        return { data: { order, order_products }, error };
      } else {
        return { data: null, error };
      }
    },
  };
}
