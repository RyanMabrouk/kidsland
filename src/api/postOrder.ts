"use server";

import { cookies } from "next/headers";
import { Tables, TablesInsert } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function postOrder(payload: TablesInsert<"orders">) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from("orders")
    .insert(payload)
    .select();
  if (error) throw new Error(error.message);

  return { data } as { data: Tables<"orders">[] };
}
