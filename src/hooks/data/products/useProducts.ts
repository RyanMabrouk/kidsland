"use client";
import { useQuery } from "@tanstack/react-query";
import { productsQuery, ProductsQueryType } from "./productsQuery";
import useCart from "../cart/useCart";
import { formatProduct } from "./formatProducts";
import useWishlist from "../wishlist/useWishlist";

export default function useProducts(args: ProductsQueryType) {
  const { data: cart } = useCart();
  const { data: wishlist } = useWishlist();
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
          cart: cart?.data,
          wishlist: wishlist?.data,
        }),
      ),
    },
  };
}
