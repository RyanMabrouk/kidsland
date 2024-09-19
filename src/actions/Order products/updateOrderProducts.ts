"use server";

import { TablesUpdate } from "@/types/database.types";
import updateData from "@/api/updateData";

export async function updateOrderProducts(
  payload: TablesUpdate<"order_products">,
  id: number,
) {
  const { data, error } = await updateData({
    tableName: "order_products",
    payload,
    match: { id },
  });
  if (error) throw new Error(error.message);
  return { data };
}
