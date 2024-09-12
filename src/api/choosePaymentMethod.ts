"use server";

import { createClient } from "@/lib/server";
import { Tables } from "@/types/database.types";
import { getOrder } from "./getOrder";
import getUser from "./getUser";

export async function choosePaymentMethod(formData: FormData) {
  const { paymentOption } = Object.fromEntries(formData);
  const supabase = createClient();
  console.log(paymentOption);
  const { data: order } = await getOrder();
  const { data, error } = await supabase
    .from("orders")
    .update({ payment_method: paymentOption === "card" ? "online" : "cash" })
    .eq("id", order.id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return { data } as { data: Tables<"orders"> };
}
