import getData from "@/api/getData";
import { Tables } from "@/types/database.types";
import { formatProduct } from "./formatProducts";

const productByIdQuery = ({
  id,
  cartProducts,
}: {
  id: string;
  cartProducts: string[] | undefined;
}) => ({
  queryKey: ["products", { id, isInCart: cartProducts?.includes(id) }],
  queryFn: async () => {
    return await getData<"products">({
      tableName: "products",
      match: { id },
    }).then((res) => ({
      ...res,
      data: formatProduct(res.data?.[0], { cartProducts }),
    }));
  },
  enabled:
    id !== undefined &&
    id !== null &&
    cartProducts !== undefined &&
    id !== "undefined",
});

export { productByIdQuery };
