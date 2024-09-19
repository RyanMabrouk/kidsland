"use server";

import { TablesInsert } from "@/types/database.types";
import postData from "@/api/postData";

export async function postOrderProducts(
  payload: TablesInsert<"order_products">[],
) {
  const { error, data } = await postData({
    tableName: "order_products",
    payload,
  });
  if (error) throw new Error(error.message);
  return { data };
}
