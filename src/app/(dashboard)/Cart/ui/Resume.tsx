import React from "react";
import OrderButton from "./OrderButton";
import useCartPopulated from "@/hooks/data/cart/useCartPopulated";

export default function Resume() {
  const { data: cart } = useCartPopulated();
  const total = cart?.data?.reduce(
    (a, b) => a + (b.product?.price_after_discount ?? 0) * b.quantity,
    0,
  );
  return (
    <div className="fixed left-[70rem] top-40 flex w-[20rem] flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-2xl transition-all duration-300">
      <h1 className="text-2xl text-red-300">Cart Summary</h1>
      <hr />
      <div className="flex w-full items-center justify-between p-3">
        <h1 className="text-xl">Subtotal</h1>
        <div className="text-2xl">
          {Math.round(total ? total * 100 : 0) / 100} TND
        </div>
      </div>
      <hr />
      <OrderButton total={total ?? 0} />
    </div>
  );
}
