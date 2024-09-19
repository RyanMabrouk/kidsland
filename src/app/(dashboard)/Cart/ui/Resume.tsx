import React from "react";
import OrderButton from "./OrderButton";
import useCartPopulated from "@/hooks/data/cart/useCartPopulated";

export default function Resume() {
  const { data } = useCartPopulated();
  const { total_after_discount, total_before_discount } = data ?? {};

  return (
    <div className="flex h-fit w-[21rem] flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-2xl transition-all duration-300 md:sticky md:top-20">
      <h1 className="text-2xl text-red-300">Cart Summary</h1>

      <hr />
      <div className="flex w-full items-center justify-between p-3">
        <h1 className="text-xl">Total</h1>
        <div className="overflow-hidden whitespace-nowrap text-2xl">
          {total_after_discount} TND
        </div>
        {total_after_discount < total_before_discount && (
          <del className="overflow-hidden whitespace-nowrap text-red-600">
            {total_before_discount} TND
          </del>
        )}
      </div>
      <hr />
      <OrderButton />
    </div>
  );
}
