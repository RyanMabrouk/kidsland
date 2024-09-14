"use client";
import { useQuery } from "@tanstack/react-query";
import { cartPopulatedQuery } from "./cartPopulatedQuery";
import useCart from "./useCart";
import useWishlist from "../wishlist/useWishlist";
import { formatProduct } from "../products/formatProducts";

export default function useCartPopulated() {
  const { data: cart } = useCart();
  const { data: wishlist } = useWishlist();
  const query = useQuery(cartPopulatedQuery());
  return {
    ...query,
    data: {
      ...query,
      data: query.data?.data?.map((e) => {
        return {
          ...e,
          product: formatProduct(e.product, {
            cart: cart?.data,
            wishlist: wishlist?.data,
          }),
        };
      }),
    },
  };
}
