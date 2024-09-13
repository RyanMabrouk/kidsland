"use server";

import { Tables } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function deleteOrder(id: number) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);

  return { data } as { data: Tables<"orders">[] };
}
