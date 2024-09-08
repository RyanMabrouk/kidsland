"use client";
import { useQuery } from "@tanstack/react-query";
import { productByIdQuery } from "./productByIdQuery";
import useCart from "../cart/useCart";

export default function useProductById(id: string) {
  const { data: cart } = useCart();
  return useQuery(productByIdQuery({ id, cartProducts: cart?.data }));
}
