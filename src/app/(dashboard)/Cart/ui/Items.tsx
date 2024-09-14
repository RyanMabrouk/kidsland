import React from "react";
import CartItem from "./CartItem";
import useCartPopulated from "@/hooks/data/cart/useCartPopulated";

export default function Items({ filter, up }: { filter: string; up: boolean }) {
  const { data: cart, isLoading } = useCartPopulated();
  const cart2 = cart?.data?.sort((a, b) => {
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
  const numberOfItems = cart?.data?.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  if (isLoading) return <div>Loading Cart Items ...</div>;
  return (
    <div className="w-full rounded-md bg-white shadow-md">
      <div className="ml-5 py-4 text-xl text-rose-500">
        you have ({numberOfItems}) products in your cart
      </div>
      <Container>
        {finalCart?.map((item, index) => (
          <CartItem
            key={index}
            product={item.product}
            filter={filter}
            quantity={item.quantity}
          />
        ))}
      </Container>
    </div>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center gap-5 pb-4">
      {children}
    </div>
  );
}
