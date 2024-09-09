"use server";

import { createClient } from "@/lib/server";
import getUser from "./getUser";
import { Tables } from "@/types/database.types";
import { PostgrestError } from "@supabase/supabase-js";
import { Cart, IProduct } from "@/types/database.tables.types";

async function getInfiniteCart({ PageParam = 0 }: { PageParam: number }) {
  const {
    data: { user },
  } = await getUser();
  const id = user.id;
  const supabase = createClient();
  const { data, error } = (await supabase
    .from("cart")
    .select("*")
    .eq("user_id", id)
    .range(PageParam * 8, (PageParam + 1) * 8 - 1)) as {
    data: Tables<"cart">[];
    error: PostgrestError | null;
  };
  const { count } = (await supabase
    .from("cart")
    .select("count(*)", { count: "exact" })
    .eq("user_id", id)
    .single()) as { count: number };

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
    };
    return { product: newProduct, quantity: el.quantity } as {
      product: IProduct;
      quantity: number;
    };
  });

  return { finalCart, PageParam, count } as {
    finalCart: Cart;
    PageParam: number;
    count: number;
  };
}

export default getInfiniteCart;
