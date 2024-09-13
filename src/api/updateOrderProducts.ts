"use server";

import { cookies } from "next/headers";
import { Tables, TablesUpdate } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function updateOrderProducts(
  payload: TablesUpdate<"order_products">,
  id: string,
) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from("order_products")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return { data } as { data: Tables<"order_products"> };
}
