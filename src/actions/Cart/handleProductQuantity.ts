"use server";

import { cookies } from "next/headers";
import getUser from "../../api/getUser";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import updateData from "@/api/updateData";

async function handleProductQuantity(id: string, quantity: number) {
  if (quantity < 0) {
    return;
  }
  const supabase = createServerActionClient({ cookies });
  const {
    data: { user },
  } = await getUser();
  const { data, error } = await updateData<"cart">({
    tableName: "cart",
    payload: { quantity },
    match: { user_id: user.id, product_id: id },
  });
  console.log(data);
  if (error) {
    throw new Error(error.message);
  }
}

export default handleProductQuantity;
