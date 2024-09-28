import React from "react";
import OrderButton from "./OrderButton";
import useCartPopulated from "@/hooks/data/cart/useCartPopulated";
import useTranslation from "@/translation/useTranslation";

export default function Resume() {
  const { data: cart } = useCartPopulated();
  const { data: translation } = useTranslation();
  return (
    <div className="flex h-fit w-[21rem] flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-2xl transition-all duration-300 max-md:w-full md:sticky md:top-20">
      <h1 className="text-2xl text-color1">
        {translation?.lang["Cart Summary"]}
      </h1>

      <hr />
      <div className="flex w-full items-center justify-center gap-4 p-3 max-[440px]:text-sm">
        <h1 className="min-w-max text-2xl font-semibold">
          {translation?.lang["Total"]}:
        </h1>
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
