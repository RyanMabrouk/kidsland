"use client";

import useOrderById from "@/hooks/data/Orders/useOrderById";
import OrderItem from "../../ui/OrderItem";
import OrderProducts from "./OrderProducts";

export default function Content({ id }: { id: string }) {
  const { data } = useOrderById(Number(id));
  const { order, orderProducts } = data ?? {};
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-[55rem] max-md:w-[30rem] max-sm:w-[25rem]">
        <OrderItem key={order?.id} order={order ?? null} />
      </div>
      <h1 className="p-6 text-2xl font-semibold">
        Order Products ({orderProducts?.length}) :{" "}
      </h1>
      <OrderProducts products={orderProducts ?? []} />
    </div>
  );
}
