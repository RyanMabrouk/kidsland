"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/database.types";

export default async function getOrdersById(orderId: number) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: order_products, error: fetchError } = await supabase
    .from("order_products")
    .select("*")
    .eq("order_id", orderId);  
  if (fetchError) {
    console.error("Error fetching order products:", fetchError);
    return null;  
  }

  return order_products; 
}
