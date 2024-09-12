"use server";

import { createClient } from "@/lib/server";
import { Tables, TablesUpdate } from "@/types/database.types";

export async function updateOrder(payload: TablesUpdate<"orders">, id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);

  return { data } as { data: Tables<"orders"> };
}
