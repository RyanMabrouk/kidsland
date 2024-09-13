"use server";

import { cookies } from "next/headers";
import getUser from "./getUser";
import { Tables, TablesInsert } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import getCart from "./getCart";

export async function getOrder() {
  console.log("getOrder called");
  const supabase = createServerActionClient({ cookies });
  const {
    data: { user },
  } = await getUser();
  const { data } = await supabase
    .from("orders")
    .select()
    .eq("user_id", user.id)
    .eq("status", "created")
    .single();
  console.log("order Fetched successfully : data = ", data);
  if (data === null || data === undefined) {
    console.log("no corresponding order found");
    const cart = await getCart();
    const total_price = cart.reduce(
      (a, b) => a + b.product.price_after_discount * b.quantity,
      0,
    );
    const wholesale_price = cart.reduce(
      (a, b) => a + b.product.wholesale_price * b.quantity,
      0,
    );
    const { data: createdOrder, error } = (await supabase
      .from("orders")
      .insert({
        payment_method: "cash",
        user_id: user.id,
        total_price: Math.round(total_price * 100) / 100,
        status: "created",
        wholesale_price,
      } as TablesInsert<"orders">)
      .select()
      .single()) as { data: Tables<"orders">; error: any };
    if (error) throw new Error(error.message);
    console.log("order inserted successfully");
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
    console.log("prodcuts inserted successfully");
    return createdOrder;
  }
  return data as Tables<"orders">;
}
