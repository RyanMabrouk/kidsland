"use server";

import { cookies } from "next/headers";
import getUser from "../getUser";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

async function handleDeleteCartItem(id: string) {
  const supabase = createServerActionClient({ cookies });
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
