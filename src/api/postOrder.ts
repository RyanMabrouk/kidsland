"use server";

import { createClient } from "@/lib/server";
import { Tables, TablesInsert } from "@/types/database.types";

export async function postOrder(payload: TablesInsert<"orders">) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .insert(payload)
    .select();
  if (error) throw new Error(error.message);

  return { data } as { data: Tables<"orders">[] };
}
