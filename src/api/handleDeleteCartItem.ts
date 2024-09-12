"use server";

import { createClient } from "@/lib/server";
import getUser from "./getUser";

async function handleDeleteCartItem(id: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await getUser();

  const { data, error } = await supabase
    .from("cart")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", id)
    .select()
    .single();
  return data;
}

export default handleDeleteCartItem;
