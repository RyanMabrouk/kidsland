"use server";

import { createClient } from "@/lib/server";
import { Tables } from "@/types/database.types";

export async function deleteOrder(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);

  return { data } as { data: Tables<"orders">[] };
}
