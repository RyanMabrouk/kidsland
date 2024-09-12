"use server";

import { createClient } from "@/lib/server";
import { Tables, TablesUpdate } from "@/types/database.types";

export async function updateOrderProducts(
  payload: TablesUpdate<"order_products">,
  id: string,
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("order_products")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return { data } as { data: Tables<"order_products"> };
}
