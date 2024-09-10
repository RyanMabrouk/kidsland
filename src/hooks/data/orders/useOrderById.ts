"use client";
import { useQuery } from "@tanstack/react-query";
import ordersByIdQuery from "./orderByIdQuery";

export default function useOrdersById(orderId: number) {
  return useQuery(ordersByIdQuery(orderId));
}
