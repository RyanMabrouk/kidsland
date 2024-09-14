"use client";
import { useQuery } from "@tanstack/react-query";
import { productByIdQuery } from "./productByIdQuery";
import useCart from "../cart/useCart";
import { formatProduct } from "./formatProducts";
import useWishlist from "../wishlist/useWishlist";

export default function useProductById(id: string) {
  const { data: cart } = useCart();
  const { data: wishlist } = useWishlist();
  const query = useQuery(productByIdQuery({ id }));
  return {
    ...query,
    data: {
      ...query.data,
      data: formatProduct(query.data?.data?.[0], {
        cart: cart?.data,
        wishlist: wishlist?.data,
      }),
    },
  };
}
