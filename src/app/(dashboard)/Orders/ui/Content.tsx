"use client";
import OrdersHistory from "./OrdersHistory";
import { SortOrders } from "./SortOrders";
import { orderSortFilters } from "../constants/filters";
import { OrderFilterProvider } from "../context/FilterProvider";
import useUserOrders from "@/hooks/data/Orders/useUserOrders";
import useTranslation from "@/translation/useTranslation";

export default function Content() {
  const { data: translation } = useTranslation();
  const { data: orders, isLoading } = useUserOrders();
  if (isLoading || !orders) return null;

  return (
    <OrderFilterProvider>
      <div className="flex w-[60rem] flex-col justify-start gap-4 bg-white p-6 transition-all duration-300">
        <h1 className="pt-10 text-2xl font-semibold">
          {translation?.lang["Orders history"]} ({orders?.length}):{" "}
        </h1>
        <SortOrders filters={orderSortFilters} />
        <OrdersHistory />
      </div>
    </OrderFilterProvider>
  );
}
