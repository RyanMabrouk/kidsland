"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import getUser from "../getUser";
import { Tables, TablesInsert } from "@/types/database.types";
import getCart from "../Cart/getCart";
import getOrderProducts from "../Order products/getOrderProducts";
import { postOrder } from "./postOrder";
import { create } from "domain";
import { createNewOrder } from "./createNewOrder";

export async function fixOrder() {
  const supabase = createServerActionClient({ cookies });
  const {
    data: {
      user: { id },
    },
  } = await getUser();
  const cart = await getCart();
  const { data: currentOrder } = (await supabase
    .from("orders")
    .select("*")
    .eq("status", "created")
    .eq("user_id", id)
    .select()
    .single()) as { data: Tables<"orders"> };
  if (!currentOrder) {
    return createNewOrder();
  } else {
    const { data: orderProducts } = await getOrderProducts(currentOrder.id);

    const isOrderValid = cart.every((cartItem) => {
      const orderProduct = orderProducts.find(
        (orderProduct) => orderProduct.product_id === cartItem.product.id,
      );
      return orderProduct && orderProduct.quantity === cartItem.quantity;
    });
    if (isOrderValid && cart.length === orderProducts.length) {
      return currentOrder as Tables<"orders">;
    } else {
      const { data: deletedOrder, error } = await supabase
        .from("orders")
        .update({ status: "cancelled" })
        .eq("id", currentOrder.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      const { data: deletedOrderProducts, error: error2 } = (await supabase
        .from("order_products")
        .delete()
        .eq("order_id", currentOrder.id)
        .select()) as { data: Tables<"order_products">[]; error: any };
      console.log(deletedOrderProducts);
      if (error2) throw new Error(error2.message);
      return createNewOrder();
    }
  }

  return;
}
