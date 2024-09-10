"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/database.types";  // Assuming you have your types defined here

export default async function getTotalIncomeByDay(date: string) {
  const supabase = createServerActionClient<Database>({ cookies });
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("total_price , wholesale_price")
    .gte("created_at", `${date}T00:00:00`)
    .lt("created_at", `${date}T23:59:59`);

  if (ordersError) {
    console.error("Error fetching orders:", ordersError);
    return { error: ordersError };
  }
  const totalIncome = orders.reduce((sum, order) => {
    const income = order.total_price - order.wholesale_price;
    return sum + income;
  }, 0);

  return totalIncome;
}
