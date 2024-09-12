"use server";

import { createClient } from "@/lib/server";
import { Tables } from "@/types/database.types";

export async function getOrderProducts(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("order_products")
    .select("*")
    .eq("order_id", id);
  if (error) throw new Error(error.message);
  return {data} as {data :Tables<"order_products">[]};
}

export default getOrderProducts;
