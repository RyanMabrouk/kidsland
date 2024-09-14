"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import getUser from "../getUser";
import { Tables, TablesInsert } from "@/types/database.types";
import getCart from "../Cart/getCart";
import { postOrder } from "./postOrder";

export async function createNewOrder() {
  const supabase = createServerActionClient({ cookies });
  const {
    data: {
      user: { id },
    },
  } = await getUser();
  const cart = await getCart();

  const total_price = cart.reduce(
    (a, b) => a + b.product.price_after_discount * b.quantity,
    0,
  );
  const wholesale_price = cart.reduce(
    (a, b) => a + b.product.wholesale_price * b.quantity,
    0,
  );
  const { data: createdOrder } = await postOrder({
    payment_method: "cash",
    user_id: id,
    total_price: Math.round(total_price * 100) / 100,
    status: "created",
    wholesale_price: Math.round(wholesale_price * 100) / 100,
  } as TablesInsert<"orders">);
  const { data: products, error: error2 } = (await supabase
    .from("order_products")
    .insert(
      cart.map(
        (product) =>
          ({
            product_id: product.product.id,
            quantity: product.quantity,
            price_before_discount: product.product.price,
            discount: product.product.discount,
            discount_type: product.product.discount_type,
            order_id: createdOrder.id,
            wholesale_price: product.product.wholesale_price,
          }) as TablesInsert<"order_products">,
      ),
    )
    .select()) as { data: Tables<"order_products">[]; error: any };
  if (error2) throw new Error(error2.message);
  return createdOrder;
}
