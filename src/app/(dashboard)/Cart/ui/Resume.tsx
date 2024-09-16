import React from "react";
import OrderButton from "./OrderButton";
import useCartPopulated from "@/hooks/data/cart/useCartPopulated";

export default function Resume() {
  const { data: cart } = useCartPopulated();
  return (
    <div className="fixed right-[15rem] top-40 flex w-[20rem] flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-2xl transition-all duration-300">
      <h1 className="text-2xl text-color1">Cart Summary</h1>
      <hr />
      <div className="flex w-full items-center justify-between p-3">
        <h1 className="text-xl">Total</h1>
        <div className="text-2xl">{cart.total_after_discount} TND</div>
        {cart.total_after_discount < cart.total_before_discount && (
          <del className="text-red-600">{cart.total_before_discount} TND</del>
        )}
      </div>
      <hr />
      <OrderButton />
    </div>
  );
}
