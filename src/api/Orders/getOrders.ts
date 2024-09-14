"use server";

import { cookies } from "next/headers";
import getUser from "../getUser";
import { Tables } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function getOrders() {
  const {
    data: { user },
  } = await getUser();
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id);
  if (error) throw new Error(error.message);
  return { data } as { data: Tables<"orders">[] };
}

export default getOrders;
