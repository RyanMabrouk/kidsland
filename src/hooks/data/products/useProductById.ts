"use client";
import { useQuery } from "@tanstack/react-query";
import { productByIdQuery } from "./productByIdQuery";

export default function useProductById(id: string) {
  return useQuery(productByIdQuery(id));
}
