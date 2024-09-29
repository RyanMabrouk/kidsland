import React from "react";
import OrderButton from "./OrderButton";
import useTranslation from "@/translation/useTranslation";
import useCart from "@/hooks/data/cart/useCart";

export default function Resume() {
  const { data: cart } = useCart();
  const { data: translation } = useTranslation();
  if (!cart || cart.error) {
    return (
      <div className="flex h-fit w-[21rem] flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-2xl transition-all duration-300 max-md:w-full md:sticky md:top-20">
        <h1 className="text-2xl text-color1">
          {translation?.lang["Error loading cart"]}
        </h1>
      </div>
    );
  }
  const totalBeforeDiscount = cart.data.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  const totalAfterDiscount = cart.data.reduce((sum, item) => {
    const priceAfterDiscount = item.price - (item.discount || 0);
    return sum + priceAfterDiscount * item.quantity;
  }, 0);
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
          {totalAfterDiscount.toFixed(2)} TND
        </div>
        {totalAfterDiscount < totalBeforeDiscount && (
          <del className="overflow-hidden whitespace-nowrap text-red-600">
            {totalBeforeDiscount.toFixed(2)} TND
          </del>
        )}
      </div>
      <hr />
      <OrderButton />
    </div>
  );
}
