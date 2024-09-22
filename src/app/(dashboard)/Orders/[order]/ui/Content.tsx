"use client";

import useCurrentOrder from "@/hooks/data/Orders/useCurrentOrder";
import OrderItem from "../../ui/OrderItem";
import OrderProducts from "./OrderProducts";

export default function Content({ id }: { id: string }) {
  const { data: totalOrder, isLoading } = useCurrentOrder(id);
  if (isLoading || !totalOrder) return null;
  const { order, order_products } = totalOrder;
  return (
    <div className="bg-gray flex w-full flex-col items-center">
      <OrderItem order={order} />
      <OrderProducts products={order_products} />
    </div>
  );
}
