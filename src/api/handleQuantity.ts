"use server";

import { createClient } from "@/lib/server";
import getUser from "./getUser";

async function handleQuantity(id: string, quantity: number) {
  if (quantity < 0) {
    return;
  }
  const supabase = createClient();
  const {
    data: { user },
  } = await getUser();
  const { data, error } = await supabase
    .from("cart")
    .update({ quantity: quantity })
    .eq("user_id", user.id)
    .eq("product_id", id)
    .select()
    .single();
  return;
}

export default handleQuantity;
