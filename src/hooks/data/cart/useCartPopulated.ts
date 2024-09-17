"use client";
import { useQuery } from "@tanstack/react-query";
import { cartPopulatedQuery } from "./cartPopulatedQuery";

export default function useCartPopulated() {
  return useQuery(cartPopulatedQuery());
}
