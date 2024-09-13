"use server";

import { cookies } from "next/headers";
import getUser from "./getUser";
import { Tables } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function getOrder() {
  const supabase = createServerActionClient({ cookies });
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
