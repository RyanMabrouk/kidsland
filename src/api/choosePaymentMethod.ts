"use server";

import { createClient } from "@/lib/server";
import { Tables } from "@/types/database.types";
import { getOrder } from "./getOrder";
import getUser from "./getUser";

export async function choosePaymentMethod(formData: FormData) {
  const { paymentOption } = Object.fromEntries(formData);
  const supabase = createClient();
  const { data: order } = await getOrder();
  const { data, error } = await supabase
    .from("orders")
    .update({ paymentOption })
    .eq("id", order.id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return { data } as { data: Tables<"orders"> };
}
