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
  const formattedData = query.data?.data?.map((e) => {
    return {
      ...e,
      product: formatProduct(e.product, {
        cart: cart?.data,
        wishlist: wishlist?.data,
      }),
    };
  });
  const total_after_discount =
    formattedData?.reduce(
      (a, b) => a + (b.product?.price_after_discount ?? 0) * b.quantity,
      0,
    ) ?? 0;
  const isFreeDelivery = total_after_discount >= 100;
  const delivery_cost_before_discount = 8;
  const delivery_cost = isFreeDelivery ? 0 : delivery_cost_before_discount;
  return {
    ...query,
    data: {
      ...query,
      data: formattedData,
      total_before_discount:
        formattedData?.reduce(
          (a, b) => a + (b.product?.price ?? 0) * b.quantity,
          0,
        ) ?? 0,
      total_after_discount,
      isFreeDelivery,
      total_with_delivery: total_after_discount + delivery_cost,
      delivery_cost,
      delivery_cost_before_discount,
    },
  };
}
