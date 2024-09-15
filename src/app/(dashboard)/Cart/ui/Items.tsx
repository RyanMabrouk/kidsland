import React from "react";
import CartItem from "./CartItem";
import useCartPopulated from "@/hooks/data/cart/useCartPopulated";

export default function Items({ filter, up }: { filter: string; up: boolean }) {
  const {
    data: { data: cart },
    isLoading,
  } = useCartPopulated();
  const cart2 = cart?.sort((a, b) => {
    if (filter === "By price") {
      return (
        (a.product?.price_after_discount ?? 0) -
        (b.product?.price_after_discount ?? 0)
      );
    }
    if (filter === "By Discount") {
      return (b.product?.discount ?? 0) - (a.product?.discount ?? 0);
    }
    return 0;
  });
  const finalCart = up ? [...(cart2 ?? [])].reverse() : cart2;
  const numberOfItems = cart?.reduce((acc, item) => acc + item.quantity, 0);
  if (isLoading) return <div>Loading Cart Items ...</div>;
  return (
    <div className="w-full rounded-md bg-white shadow-md">
      <div className="ml-5 py-4 text-xl text-rose-500">
        you have ({numberOfItems}) products in your cart
      </div>

      <div className="flex w-full flex-col items-center gap-5 pb-4">
        {finalCart?.map((item) => (
          <CartItem
            key={[item?.product_id, item?.user_id].join("-")}
            product={item.product}
            quantity={item.quantity}
          />
        ))}
      </div>
    </div>
  );
}
