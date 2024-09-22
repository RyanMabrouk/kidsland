import React from "react";
import CartItem from "./CartItem";
import useCartPopulated from "@/hooks/data/cart/useCartPopulated";
import { Player } from "@lottiefiles/react-lottie-player";
import { useFilters } from "../context/FiltersProvider";
import useTranslation from "@/translation/useTranslation";

export default function Items() {
  const { filter, isReversed } = useFilters();
  const { data: cart } = useCartPopulated();
  const { data: translation } = useTranslation();
  const sortedCart = cart?.data?.sort((a, b) => {
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
  if (cart.data?.length === 0)
    return (
      <div className="flex h-full w-full items-center justify-center rounded-md bg-color1 bg-white shadow-md">
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
    <div className="w-full max-w-[40rem] rounded-md bg-white shadow-md">
      <div className="ml-5 py-4 text-xl text-color1">
        {translation?.lang[
          "you have ${QUANTITY} products in your cart"
        ].replace("${QUANTITY}", String(cart?.data?.length) ?? 0)}
      </div>

      <div className="flex w-full flex-col items-center gap-5 pb-4">
        {finalCart?.map((item) => (
          <CartItem
            key={item?.product_id}
            product={item.product}
            quantity={item.quantity}
          />
        ))}
      </div>
    </div>
  );
}
