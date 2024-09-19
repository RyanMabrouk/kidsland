"use client";
import { useQuery } from "@tanstack/react-query";
import { cartPopulatedQuery } from "./cartPopulatedQuery";
import useWishlist from "../wishlist/useWishlist";

export default function useCartPopulated(
  limit: number = Infinity,
  page: number = 1,
) {
  const query = useQuery(cartPopulatedQuery(limit, page));
  const total_after_discount = query.data?.total_after_discount ?? 0;
  const total_before_discount = query.data?.total_before_discount ?? 0;
  const isFreeDelivery = total_after_discount >= 100;
  const delivery_cost_before_discount = 8;
  const delivery_cost = isFreeDelivery ? 0 : delivery_cost_before_discount;
  return {
    ...query,
    data: {
      ...query.data,
      total_before_discount,
      total_after_discount,
      isFreeDelivery,
      total_with_delivery: total_after_discount + delivery_cost,
      delivery_cost,
      delivery_cost_before_discount,
    },
  };
}
