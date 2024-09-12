import getOrdersByDate from "@/api/Orders/getOrdersByDate";
import { infinityPagination } from "@/helpers/infinityPagination";
import { Tables } from "@/types/database.types";

const ordersByDateQuery = (args: {
  search?: { column: keyof Tables<"orders">; value: string };
  date : string;
  pagination:{
    limit: number;
    page: number;
  }
}) => ({
  queryKey: [
    "orders",
    {
      search:args.search,
      date: args.date,
      page: args.pagination?.page,
      limit: args.pagination?.limit,

    },
  ],
  queryFn: async () => {
    const result = await getOrdersByDate({
      search: args.search,
      date: args.date,
      pagination: args.pagination,
    });
    const data = Array.isArray(result.data) ? result.data : [];
    return infinityPagination(data as Tables<"orders">[], {
      total_count: result.count || 0,
      limit: args.pagination?.limit,
      page: args.pagination?.page,
      
    });
  },
  keepPreviousData: true,
  staleTime: 5000,
});

export { ordersByDateQuery };
