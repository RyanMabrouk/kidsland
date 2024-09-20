import useCreateOrder from "@/hooks/data/orders/createOrder";
import useCartPopulated from "@/hooks/data/cart/useCartPopulated";
import React from "react";

export default function OrderResume() {
  const { data } = useCartPopulated();
  const {
    numberOfItems: total_articles,
    total_after_discount,
    delivery_cost,
    delivery_cost_before_discount,
  } = data ?? {};
  const { mutate } = useCreateOrder();
  return (
    <form
      action={() => mutate()}
      className="sticky flex h-fit w-[18rem] flex-col gap-2 rounded-xl bg-white p-4 shadow-2xl transition-all duration-300"
    >
      <h1 className="p-2 text-center">Order Resume</h1>
      <hr />
      <div className="flex justify-between p-2">
        <h1>Total Articles : ({total_articles})</h1>
        <h1>{total_after_discount} TND</h1>
      </div>
      <hr />
      <div className="flex flex-row justify-between p-2">
        <h1>Delivery Costs :</h1>
        <div className="flex flex-row items-center gap-2">
          <span>{delivery_cost} TND</span>
          {delivery_cost == 0 && (
            <del className="text-color8">
              {delivery_cost_before_discount} TND
            </del>
          )}
        </div>
      </div>
      <hr />
      <div className="flex justify-between p-2">
        <h1>Total :</h1>
        <h1 className="text-xl">{total_after_discount} TND</h1>
      </div>
      <hr />
      <button
        type="submit"
        className="rounded-lg bg-color1 p-3 text-center text-xl font-semibold text-white transition-all duration-300 hover:bg-red-400"
      >
        Confirm the Order
      </button>
      <h1 className="p-2">(complete the steps to continue)</h1>
    </form>
  );
}
