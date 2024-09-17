import React from "react";
import CartItem from "./CartItem";
import useCartPopulated from "@/hooks/data/cart/useCartPopulated";
import { useFilters } from "../context/FiltersProvider";

export default function Items() {
  const { filter, up } = useFilters();
  const { data, isLoading } = useCartPopulated();
  const { cart: cart, numberOfItems, totalPrice } = data ?? {};
  const cart2 = cart?.sort((a, b) => {
    if (filter === "By price") {
      return (
        (a.products?.price_after_discount ?? 0) -
        (b.products?.price_after_discount ?? 0)
      );
    }
    if (filter === "By Discount") {
      return (b.products?.discount ?? 0) - (a.products?.discount ?? 0);
    }
    return 0;
  });
  const finalCart = up ? [...(cart2 ?? [])].reverse() : cart2;
  if (isLoading) return <div>Loading Cart Items ...</div>;
  return (
    <div className="w-full rounded-md bg-gray-100 shadow-md">
      <div className="ml-5 py-4 text-xl font-semibold text-rose-500">
        you have ({numberOfItems}) products in your cart
      </div>

      <div className="flex w-full flex-col items-center gap-5 pb-4">
        {finalCart?.map((item) => (
          <CartItem
            key={[item?.product_id, item?.user_id].join("-")}
            product={item.products}
            quantity={item.quantity}
          />
        ))}
      </div>
    </div>
  );
}
