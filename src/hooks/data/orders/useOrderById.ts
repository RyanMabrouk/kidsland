"use client";
import { useQuery } from "@tanstack/react-query";
import orderByIdQuery from "./orderByIdQuery";

export default function useOrdersById(orderId: number) {
  return useQuery(orderByIdQuery(orderId));
}
