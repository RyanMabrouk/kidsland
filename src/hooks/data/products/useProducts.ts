"use client";
import { useQuery } from "@tanstack/react-query";
import { productsQuery, ProductsQueryType } from "./productsQuery";
import useCart from "../cart/useCart";
import { formatProduct } from "./formatProducts";

export default function useProducts(args: ProductsQueryType) {
  const { data: cart } = useCart();
  const query = useQuery(
    productsQuery({
      ...args,
    }),
  );
  return {
    ...query,
    data: {
      ...query.data,
      data: query.data?.data?.map((e) =>
        formatProduct(e, {
          cartProducts: cart?.data,
        }),
      ),
    },
  };
}
