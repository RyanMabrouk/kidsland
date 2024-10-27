"use client";
import getCartProducts from "@/actions/Cart/getCartProducts";
import { Tables } from "@/types/database.types";

export interface ICartItem extends Tables<"products"> {
  quantity: number;
}

const cartQuery = () => ({
  queryKey: ["cart"],
  queryFn: async () => {
    const cart: { product_id: string; quantity: number }[] = JSON.parse(
      localStorage.getItem("cart") ?? "[]",
    );
    const productsIds = cart.map(
      (item: { product_id: string; quantity: number }) => item.product_id,
    );
    if (productsIds.length === 0) {
      return { data: [], error: null, count: 0 };
    }

    const [data, countData] = await Promise.all([
      getCartProducts({
        tableName: "products",
        productsIds,
      }),
      getCartProducts({
        tableName: "products",
        productsIds,
      }).then((res) => ({
        count: res.count,
        error: res.error,
      })),
    ]);
    const cartProducts: ICartItem[] =
      data?.data?.map((product) => ({
        ...product,
        quantity:
          cart.find((item) => item.product_id === product.id)?.quantity ?? 1,
      })) ?? [];

    return {
      data: cartProducts,
      count: countData.count,
      error: data.error || countData.error,
    };
  },
});

export { cartQuery };
