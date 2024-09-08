import getOrders from "@/api/Orders/getOrders";
import { infinityPagination } from "@/helpers/infinityPagination";
import { Enums, Tables } from "@/types/database.types";

const ordersQuery = (args: {
  pagination?:{
    limit: number;
    page: number;
  }
  status : Enums<"status_type_enum">;
  search?: { column: keyof Tables<"orders">; value: string };
  sort?: {
    ascending: boolean;
    column: keyof Tables<"orders">;
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
      page: args.pagination?.page,
      limit: args.pagination?.limit,
      search: args.search,
      sort: args.sort,
      filter: args.filter,
    },
  ],
  queryFn: async () => {
    const result = await getOrders({
      pagination: args.pagination,
      search: args.search,
      sort: args.sort,
      filter: args.filter,
      status : args.status
    });
    const data = Array.isArray(result.data) ? result.data : [];
    return infinityPagination(data, {
      total_count: result.count || 0,
      limit: args.pagination?.limit,
      page: args.pagination?.page,
      
    });
  },
  keepPreviousData: true,
  staleTime: 5000,
});

export { ordersQuery };
