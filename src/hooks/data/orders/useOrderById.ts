"use client";
import { useQuery } from "@tanstack/react-query";
import OrderByIdQuery from "./OrderByIdQuery";

export default function useOrdersById(orderId: number) {
  return useQuery(OrderByIdQuery(orderId));
}
