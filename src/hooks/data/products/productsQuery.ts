import { infinityPagination } from "@/helpers/infinityPagination";
import { Tables } from "@/types/database.types";
import getProducts from "@/actions/products/getProducts";

export interface ProductsQueryType {
  page: number;
  limit: number;
  search?: { column: keyof Tables<"products">; value: string };
  sort?: {
    ascending: boolean;
    column: keyof Tables<"products">;
  };
  filters?: {
    minDiscount: number;
    priceRange: number[];
    category_id: number | null;
  };
}

const productsQuery = (args: ProductsQueryType) => ({
  queryKey: [
    "products",
    {
      ...args,
    },
  ],
  queryFn: async () => {
    const [data, countData] = await Promise.all([
      getProducts({
        tableName: "products",
        ...args,
        match: args.filters?.category_id
          ? {
              category_id: args.filters.category_id,
            }
          : undefined,
        minDiscount: args.filters?.minDiscount,
        priceRange: args.filters?.priceRange,
        pagination: {
          page: args.page,
          limit: args.limit,
        },
      }),
      getProducts({
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
