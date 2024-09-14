"use server";

import { cookies } from "next/headers";
import getUser from "../getUser";
import { Tables, TablesInsert } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import getCart from "../Cart/getCart";

export async function getOrder() {
  const supabase = createServerActionClient({ cookies });
  const {
    data: { user },
  } = await getUser();
  const { data } = await supabase
    .from("orders")
    .select()
    .eq("user_id", user.id)
    .eq("status", "created")
    .single();
  if (data === null || data === undefined) {
  }
  return data as Tables<"orders">;
}
