"use client";

import useOrders from "@/hooks/data/Orders/useOrders";
import OrdersHistory from "./OrdersHistory";
import { SortOrders } from "./SortOrders";
import { orderSortFilters } from "../constants/filters";
import { OrderFilterProvider } from "../context/FilterProvider";

export default function Content() {
  const { data: orders, isLoading } = useOrders();
  if (isLoading || !orders) return null;
  return (
    <OrderFilterProvider>
      <div className="flex w-[60rem] flex-col justify-start gap-4 bg-white p-6 transition-all duration-300">
        <h1 className="pt-10 text-2xl font-semibold">
          Orders History ({orders?.length}):{" "}
        </h1>
        <SortOrders filters={orderSortFilters} />
        <OrdersHistory />
      </div>
    </OrderFilterProvider>
  );
}
