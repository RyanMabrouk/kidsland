"use server";

import { cookies } from "next/headers";
import getUser from "./getUser";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

async function handleQuantity(id: string, quantity: number) {
  if (quantity < 0) {
    return;
  }
  const supabase = createServerActionClient({ cookies });
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
