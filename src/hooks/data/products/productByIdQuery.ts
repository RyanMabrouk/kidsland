import getData from "@/api/getData";
import { Tables } from "@/types/database.types";
import { formatProduct } from "./formatProducts";

const productByIdQuery = (id: string) => ({
  queryKey: ["products", { id }],
  queryFn: async () => {
    return await getData<Tables<"products">>({
      tableName: "products",
      match: { id },
    }).then((res) => ({
      ...res,
      data: formatProduct(res.data?.[0]),
    }));
  },
  enabled: id !== undefined && id !== null,
});

export { productByIdQuery };
