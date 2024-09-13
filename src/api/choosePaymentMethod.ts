"use server";

import { Tables } from "@/types/database.types";
import { getOrder } from "./getOrder";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function choosePaymentMethod(formData: FormData) {
  const { paymentOption } = Object.fromEntries(formData);
  const supabase = createServerActionClient({ cookies });
  console.log(paymentOption);
  const { data: order } = await getOrder();
  const { data, error } = await supabase
    .from("orders")
    .update({ payment_method: paymentOption })
    .eq("id", order.id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return { data } as { data: Tables<"orders"> };
}
