"use server";

import deleteData from "@/api/deleteData";
import { Tables } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function deleteOrder(id: number) {
  const { error } = await deleteData<"orders">({
    tableName: "orders",
    match: { id },
  });
  if (error) throw new Error(error.message);
}
