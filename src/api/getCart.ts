"use server";

import { Tables } from "@/types/database.types";
import { PostgrestError } from "@supabase/supabase-js";
import getUser from "./getUser";
import { Cart, IProduct } from "@/types/database.tables.types";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

async function getCart() {
  const {
    data: { user },
  } = await getUser();
  const id = user.id;
  const supabase = createServerActionClient({ cookies });
  const { data, error } = (await supabase
    .from("cart")
    .select("*")
    .eq("user_id", id)) as {
    data: Tables<"cart">[];
    error: PostgrestError | null;
  };
  if (error) throw new Error(error.message);

  const products = data?.flatMap((e) => ({
    product: e.product_id,
    quatity: e.quantity,
  }));
  const cart = await Promise.all(
    products.map(async (e) => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", e.product)
        .single();
      return { product: data, quantity: e.quatity } as {
        product: Tables<"products">;
        quantity: number;
      };
    }),
  );
  const finalCart = cart.map((el) => {
    const newProduct: IProduct = {
      ...el.product,
      available: el.product.stock > 0,
      price_after_discount: el.product.discount
        ? el.product.price * (1 - el.product.discount / 100)
        : el.product.price,
      isInCart: el.quantity > 0,
    };
    return { product: newProduct, quantity: el.quantity } as {
      product: IProduct;
      quantity: number;
    };
  });

  return finalCart as Cart;
}

export default getCart;
