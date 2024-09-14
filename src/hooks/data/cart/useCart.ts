"use client";
import { useQuery } from "@tanstack/react-query";
import { cartQuery } from "./cartQuery";

export default function useCart() {
  return useQuery(cartQuery());
}
