"use server";

import { cookies } from "next/headers";
import { Tables } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import getData from "../getData";

export async function getOrderProducts(id: number) {
  return await getData({
    tableName: "order_products",
    match: { order_id: id },
  });
}

export default getOrderProducts;
