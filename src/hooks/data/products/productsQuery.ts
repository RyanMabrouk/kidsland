import getData from "@/api/getData";
import { infinityPagination } from "@/helpers/infinityPagination";
import { Tables } from "@/types/database.types";
import { formatProduct } from "./formatProducts";

const productsQuery = (args: {
  page: number;
  limit: number;
  search?: { column: keyof Tables<"products">; value: string };
  sort?: {
    ascending: boolean;
    column: keyof Tables<"products">;
  };
}) => ({
  queryKey: [
    "products",
    {
      ...args,
    },
  ],
  queryFn: async () => {
    const [data, countData] = await Promise.all([
      getData<Tables<"products">>({
        tableName: "products",
        ...args,
        pagination: {
          page: args.page,
          limit: args.limit,
        },
      }).then((res) => ({
        ...res,
        data: res.data?.map((e) => formatProduct(e)),
      })),
      getData<never>({
        tableName: "products",
        count: { count: "exact", head: true },
      }).then((res) => ({
        count: res.count,
        error: res.error,
      })),
    ]);
    return {
      ...infinityPagination(data?.data ?? [], {
        page: args.page,
        limit: args.limit,
        total_count: countData.count ?? 0,
      }),
      error: data.error || countData.error,
    };
  },
});

export { productsQuery };