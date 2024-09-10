import useCart from "@/hooks/data/products/useCart";
import React from "react";
import CartItem from "./CartItem";
import { Cart, IProduct } from "@/types/database.tables.types";

export default function Items({ filter, up }: { filter: string; up: boolean }) {
  const { data: cart, isLoading } = useCart();
  const cart2 = cart?.sort(
    (
      a: { product: IProduct; quantity: number },
      b: { product: IProduct; quantity: number },
    ) => {
      if (filter === "By price") {
        return a.product.price_after_discount - b.product.price_after_discount;
      }
      if (filter === "By Discount") {
        return b.product.discount - a.product.discount;
      }
      return a.product.title.localeCompare(b.product.title);
    },
  ) as Cart;
  const finalCart = up ? [...cart2].reverse() : cart2;
  const numberOfItems = cart?.reduce((acc, item) => acc + item.quantity, 0);
  if (isLoading) return <div>Loading Cart Items ...</div>;
  return (
    <div className="w-full border-2 border-red-300">
      <div className="ml-5 pt-4 text-xl text-rose-300">
        you have ({numberOfItems}) products in your cart
      </div>
      <Container>
        {finalCart.map((item) => (
          <CartItem
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
    <div className="m-5 flex w-full flex-col items-start gap-5">{children}</div>
  );
}
