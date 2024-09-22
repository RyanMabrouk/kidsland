"use client";

import useOrders from "@/hooks/data/Orders/useOrders";
import OrdersHistory from "./OrdersHistory";

export default function Content() {
  const { data: orders } = useOrders();
  return (
    <div className="flex flex-col justify-start gap-4 bg-white">
      <h1 className="px-6 pt-10 text-2xl font-semibold">
        Orders History ({orders?.length}):{" "}
      </h1>
      <OrdersHistory />
    </div>
  );
}
