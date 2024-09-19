"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/database.types";  

export default async function getOldestOrder() {
  const supabase = createServerActionClient<Database>({ cookies });
  
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("created_at")
    .order("created_at", { ascending: true })  
    .limit(1); 
  if (ordersError) {
    console.error("Error fetching orders:", ordersError);
    return { error: ordersError };
  }

  if (orders && orders.length > 0) {
    return { oldestOrder: orders[0].created_at };
  } else {
    return { message: "No orders found" };
  }
}
