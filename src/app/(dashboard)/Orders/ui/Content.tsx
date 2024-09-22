"use client";

import useOrders from "@/hooks/data/Orders/useOrders";
import OrdersHistory from "./OrdersHistory";
import { OrderFilters } from "./OrderFilters";
import { orderSortFilters } from "../constants/filters";
import { OrderFilterProvider } from "../context/FilterProvider";

export default function Content() {
  const { data: orders } = useOrders();
  return (
    <OrderFilterProvider>
      <div className="flex flex-col justify-start gap-4 bg-white p-6">
        <h1 className="pt-10 text-2xl font-semibold">
          Orders History ({orders?.length}):{" "}
        </h1>
        <OrderFilters filters={orderSortFilters} />
        <OrdersHistory />
      </div>
    </OrderFilterProvider>
  );
}
