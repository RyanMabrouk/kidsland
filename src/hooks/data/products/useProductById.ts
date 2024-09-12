"use client";
import { useQuery } from "@tanstack/react-query";
import { productByIdQuery } from "./productByIdQuery";
import useCart from "../cart/useCart";
import { formatProduct } from "./formatProducts";

export default function useProductById(id: string) {
  const { data: cart } = useCart();
  const query = useQuery(productByIdQuery({ id }));
  return {
    ...query,
    data: {
      ...query.data,
      data: formatProduct(query.data?.data?.[0], { cartProducts: cart?.data }),
    },
  };
}
