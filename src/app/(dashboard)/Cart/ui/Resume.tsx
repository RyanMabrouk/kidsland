import useCart from "@/hooks/data/products/useCart";
import React from "react";
import OrderButton from "./OrderButton";

export default function Resume() {
  const { data: cart } = useCart();
  const total = cart?.reduce(
    (a, b) => a + b.product.price_after_discount * b.quantity,
    0,
  );
  return (
    <div className="flex w-[20rem] flex-col items-center rounded-xl border-4 border-double border-red-500 p-4 ring-4 ring-red-400 ring-opacity-0 ring-offset-0 transition-all duration-300 hover:ring-opacity-70 hover:ring-offset-4">
      <h1 className="text-2xl text-red-300">Cart Summary</h1>
      <hr />
      <div className="flex w-full items-center justify-between p-3">
        <h1>Subtotal</h1>
        <div>{total} TND</div>
      </div>
      <hr />
      <OrderButton total={total ?? 0} />
    </div>
  );
}
