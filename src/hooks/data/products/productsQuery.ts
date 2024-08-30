import getData from "@/api/getData";
import { infinityPagination } from "@/helpers/infinityPagination";
import { Tables } from "@/types/database.types";
import { formatProduct } from "./formatProducts";

const productsQuery = ({ page, limit }: { page: number; limit: number }) => ({
  queryKey: [
    "products",
    {
      page,
      limit,
    },
  ],
  queryFn: async () => {
    const [data, countData] = await Promise.all([
      getData<Tables<"products">>({
        tableName: "products",
        pagination: {
          page,
          limit,
        },
      }).then((res) => ({
        ...res,
        data: res.data?.map((e) => formatProduct(e)),
      })),
      getData<any>({
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
