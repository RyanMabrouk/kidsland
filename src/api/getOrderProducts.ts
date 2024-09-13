"use server";

import { cookies } from "next/headers";
import { Tables } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function getOrderProducts(id: number) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from("order_products")
    .select("*")
    .eq("order_id", id);
  if (error) throw new Error(error.message);
  return { data } as { data: Tables<"order_products">[] };
}

export default getOrderProducts;
