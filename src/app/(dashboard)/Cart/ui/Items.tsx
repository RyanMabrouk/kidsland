import React from "react";
import CartItem from "./CartItem";
import useCartPopulated from "@/hooks/data/cart/useCartPopulated";
import { cartSortFiltersValues } from "../constants/CartFilters";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Items({
  filter,
  isReversed,
}: {
  filter: cartSortFiltersValues;
  isReversed: boolean;
}) {
  const {
    data: { data: cart },
  } = useCartPopulated();
  const sortedCart = cart?.sort((a, b) => {
    if (filter === "price") {
      return (
        (a.product?.price_after_discount ?? 0) -
        (b.product?.price_after_discount ?? 0)
      );
    }
    if (filter === "discount") {
      return (b.product?.discount ?? 0) - (a.product?.discount ?? 0);
    }
    if (filter === "title") {
      return a.product?.title.localeCompare(b.product?.title ?? "") ?? 0;
    }
    return 0;
  });
  const finalCart = isReversed ? [...(sortedCart ?? [])].reverse() : sortedCart;
  const numberOfItems = cart?.reduce((acc, item) => acc + item.quantity, 0);
  if (cart?.length === 0)
    return (
      <div className="flex h-full w-full items-center justify-center rounded-md bg-white shadow-md">
        <Player
          src={
            "https://lottie.host/85fb7313-2848-45c2-bdb9-2b729f57afc2/AwfmWMtW8n.json"
          }
          className="h-60 w-60"
          loop
          autoplay
        />
      </div>
    );
  return (
    <div className="w-full rounded-md bg-white shadow-md">
      <div className="ml-5 py-4 text-xl text-color1">
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
