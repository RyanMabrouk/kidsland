"use server";

import { cookies } from "next/headers";
import { Tables } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function getOrderProducts(id: number) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = (await supabase
    .from("order_products")
    .select("*")
    .eq("order_id", id)) as { data: Tables<"order_products">[]; error: any };
  if (error) throw new Error(error.message);
  return { data };
}

export default getOrderProducts;
