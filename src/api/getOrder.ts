"use server";

import { createClient } from "@/lib/server";
import getUser from "./getUser";
import { Tables } from "@/types/database.types";

export async function getOrder() {
  const supabase = createClient();
  const {
    data: { user },
  } = await getUser();
  const { data, error } = await supabase
    .from("orders")
    .select()
    .eq("user_id", user.id)
    .eq("status", "pending")
    .single();
  if (error) throw new Error(error.message);
  return { data } as { data: Tables<"orders"> };
}
