"use client";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { cartQuery } from "./cartQuery";

export default function useCart(): UseQueryResult {
  return useQuery(cartQuery());
}
