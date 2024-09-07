import getData from "@/api/getData";
import { infinityPagination } from "@/helpers/infinityPagination";
import { Tables } from "@/types/database.types";

const purchasesQuery = (args: {
  page: number;
  limit: number;
  search?: { column: keyof Tables<"purchases">; value: string };
  sort?: {
    ascending: boolean;
    column: keyof Tables<"purchases">;
  };
}) => ({
  queryKey: [
    "purchases",
    {
      ...args,
    },
  ],
  queryFn: async () => {
    const [data, countData] = await Promise.all([
      getData<Tables<"purchases">>({
        tableName: "purchases",
        ...args,
        pagination: {
          page: args.page,
          limit: args.limit,
        },
      }),
      getData<never>({
        tableName: "purchases",
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

export { purchasesQuery };
