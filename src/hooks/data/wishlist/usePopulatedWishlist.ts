"use client";
import { useQuery } from "@tanstack/react-query";
import useCart from "../cart/useCart";
import {
  populatedWishlistQuery,
  UserWishlistQueryType,
} from "./populatedWishlistQuery";
import { formatProduct } from "../products/formatProducts";
import useWishlist from "./useWishlist";

export default function usePopulatedWishlist(args: UserWishlistQueryType) {
  const { data: cart } = useCart();
  const { data: wishlist } = useWishlist();
  const query = useQuery(
    populatedWishlistQuery({
      ...args,
    }),
  );
  return {
    ...query,
    data: {
      ...query.data,
      data: query.data?.data?.map((e) => {
        const formattedProduct = formatProduct(e?.products ?? null, {
          cart: cart?.data,
          wishlist: wishlist?.data ?? [],
        });

        return {
          ...e,
          products: formattedProduct,
        };
      }),
    },
  };
}
