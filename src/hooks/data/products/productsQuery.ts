import getData from "@/api/getData";
import { infinityPagination } from "@/helpers/infinityPagination";
import { Tables } from "@/types/database.types";
import { formatProduct } from "./formatProducts";

const productsQuery = ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: { column: keyof Tables<"products">; value: string };
}) => ({
  queryKey: [
    "products",
    {
      page,
      limit,
      search,
    },
  ],
  queryFn: async () => {
    const [data, countData] = await Promise.all([
      getData<Tables<"products">>({
        tableName: "products",
        search,
        pagination: {
          page,
          limit,
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
        page,
        limit,
        total_count: countData.count ?? 0,
      }),
      error: data.error || countData.error,
    };
  },
});

export { productsQuery };
