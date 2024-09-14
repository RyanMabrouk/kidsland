import getOrders from "@/api/Orders/getOrders";
import { infinityPagination } from "@/helpers/infinityPagination";
import { Enums, Tables } from "@/types/database.types";
import Column from "antd/es/table/Column";

const ordersQuery = (args: {
  pagination?:{
    limit: number;
    page: number;
  }
  columns?: (keyof Tables<"orders">)[];
  status?: Enums<"status_type_enum">;
  search?: { column: keyof Tables<"orders">; value: string };
  sort?: {
    ascending: boolean;
    column: keyof Tables<"orders">;
  };
  date?: {
    from: string;
    to: string;
  };

  filter?: {
    column: keyof Tables<"orders">;
    value: string;
    operator?:
      | "eq"
      | "neq"
      | "gt"
      | "gte"
      | "lt"
      | "lte"
      | "ilike"
      | "not_ilike"
      | "in"
      | "not_in";
  };
}) => ({
  queryKey: [
    "orders",
    {
     ...args,
    },
  ],
  queryFn: async () => {
    const result = await getOrders({
      ...args
    });
    const data = Array.isArray(result.data) ? result.data : [];
    return infinityPagination(data, {
      total_count: result.count || 0,
      limit: args.pagination?.limit,
      page: args.pagination?.page,
      
    });
  }
});

export { ordersQuery };
