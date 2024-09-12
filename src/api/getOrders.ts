"use server";

import { createClient } from "@/lib/server";
import getUser from "./getUser";
import { Tables } from "@/types/database.types";

export async function getOrders() {
  const {
    data: { user },
  } = await getUser();
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id);
  if (error) throw new Error(error.message);
  return { data } as { data: Tables<"orders">[] };
}

export default getOrders;
