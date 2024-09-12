"use server";

import { createClient } from "@/lib/server";
import { Tables, TablesInsert } from "@/types/database.types";

export async function postOrderProducts(
  payload: TablesInsert<"order_products">[],
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("order_products")
    .insert(payload)
    .select();
  if (error) throw new Error(error.message);

  return { data } as { data: Tables<"order_products">[] };
}
