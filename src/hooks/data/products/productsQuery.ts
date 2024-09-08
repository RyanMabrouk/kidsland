import { infinityPagination } from "@/helpers/infinityPagination";
import { Tables } from "@/types/database.types";
import { formatProduct } from "./formatProducts";
import getProducts from "@/actions/products/getProducts";

const productsQuery = (args: {
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
  };
  cartProducts: string[] | undefined;
}) => ({
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
        minDiscount: args.filters?.minDiscount,
        priceRange: args.filters?.priceRange,
        pagination: {
          page: args.page,
          limit: args.limit,
        },
      }).then((res) => ({
        ...res,
        data: res.data?.map((e) =>
          formatProduct(e, {
            cartProducts: args.cartProducts,
          }),
        ),
      })),
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
  enabled: args.cartProducts !== undefined,
});

export { productsQuery };
