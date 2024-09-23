"use client";
import { useQuery } from "@tanstack/react-query";
import useCart from "../cart/useCart";
import { userWishlistQuery, UserWishlistQueryType } from "./userWishlistQuery";
import { formatProduct } from "../products/formatProducts";

export default function useUserWishlist(args: UserWishlistQueryType) {
  const { data: cart } = useCart();

  const query = useQuery(
    userWishlistQuery({
      ...args,
    })
  );
  return {
    ...query,
    data: {
      ...query.data,
      data: query.data?.data?.map((e) => {
        const formattedProduct = formatProduct(e?.products ?? null, {
          cart: cart?.data,
          wishlist: query.data?.data.map((item) => item?.products?.id) ?? [],
        });

        return {
          ...e,
          products: formattedProduct, 
        };
      }),
    },
  };
}
