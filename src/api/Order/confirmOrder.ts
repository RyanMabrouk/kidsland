"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getOrder } from "./getOrder";
import getUser from "../getUser";
import { Tables } from "@/types/database.types";

export async function confirmOrder() {
  const order = await getOrder();
  if (
    !order.first_name ||
    !order.last_name ||
    !order.phone_number ||
    !order.address ||
    !order.city ||
    !order.region
  )
    throw new Error("all fields must be filled first");
  const supabase = createServerActionClient({ cookies });
  const {
    data: {
      user: { id },
    },
  } = await getUser();
  const { data, error } = await supabase
    .from("orders")
    .update({ status: "pending" })
    .eq("user_id", id)
    .eq("status", "created")
    .select()
    .single();
  if (error) throw new Error(error.message);
  const { data: deletedRows, error: deleteError } = await supabase
    .from("cart")
    .delete()
    .eq("user_id", id)
    .select();

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  return { data } as { data: Tables<"orders"> };
}
