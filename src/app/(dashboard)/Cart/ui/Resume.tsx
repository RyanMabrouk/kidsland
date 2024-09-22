import React from "react";
import OrderButton from "./OrderButton";
import useCartPopulated from "@/hooks/data/cart/useCartPopulated";

export default function Resume() {
  const { data: cart } = useCartPopulated();

  return (
    <div className="flex h-fit w-[21rem] max-md:w-full flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-2xl transition-all duration-300 md:sticky md:top-20">
      <h1 className="text-2xl text-color1">Cart Summary</h1>

      <hr />
      <div className="flex w-full items-center gap-4 justify-center p-3 max-[440px]:text-sm">
        <h1 className="text-2xl font-semibold min-w-max">Total :</h1>
        <div className="overflow-hidden whitespace-nowrap text-xl">
          {cart.total_after_discount} TND
        </div>
        {cart.total_after_discount < cart.total_before_discount && (
          <del className="overflow-hidden whitespace-nowrap text-red-600">
            {cart.total_before_discount} TND
          </del>
        )}
      </div>
      <hr />
      <OrderButton />
    </div>
  );
}
