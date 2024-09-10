"use client";
import { useQuery } from "@tanstack/react-query";
import { ordersByDateQuery } from "./ordersByDateQuery";
import { Tables } from "@/types/database.types";

export default function useOrdersByDate({
  search,
  date,
  pagination,

}: {
  search?: { column: keyof Tables<"orders">; value: string };
    date : string
  pagination:{
    limit: number;
    page: number;
  };
}) {
  return useQuery(ordersByDateQuery({search, date , pagination }));
}
