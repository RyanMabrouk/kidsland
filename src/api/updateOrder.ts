"use server";

import { cookies } from "next/headers";
import { Tables, TablesUpdate } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function updateOrder(payload: TablesUpdate<"orders">, id: number) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from("orders")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);

  return { data } as { data: Tables<"orders"> };
}
