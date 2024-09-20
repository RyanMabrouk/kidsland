import React from "react";
import CartItem from "./CartItem";
import useCartPopulated from "@/hooks/data/cart/useCartPopulated";

import { cartSortFiltersValues } from "../constants/CartFilters";
import { Player } from "@lottiefiles/react-lottie-player";
import { useFilters } from "../context/FiltersProvider";

export default function Items() {
  const { filter, isReversed } = useFilters();
  const { data, isLoading } = useCartPopulated(6, 1);
  const { numberOfItems, cart } = data ?? {};
  const sortedCart = data?.cart?.sort((a, b) => {
    if (filter === "price") {
      return (
        (a.products?.price_after_discount ?? 0) -
        (b.products?.price_after_discount ?? 0)
      );
    }

    if (filter === "discount") {
      return (b.products?.discount ?? 0) - (a.products?.discount ?? 0);
    }
    if (filter === "title") {
      return a.products?.title.localeCompare(b.products?.title ?? "") ?? 0;
    }
    return 0;
  });

  const finalCart = isReversed ? [...(sortedCart ?? [])].reverse() : sortedCart;
  if (cart?.length === 0)
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
    <div className="w-full rounded-md bg-white shadow-md">
      <div className="ml-5 py-4 text-xl text-color1">
        you have ({numberOfItems}) products in your cart
      </div>

      <div className="flex w-full flex-col items-center gap-5 pb-4">
        {finalCart?.map((item) => (
          <CartItem
            key={item?.product_id}
            product={item.products}
            quantity={item.quantity}
          />
        ))}
      </div>
    </div>
  );
}
