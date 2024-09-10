"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getProductTitleAndWholesalePrice(productId : string) {
  const supabase = createServerActionClient({ cookies });
  const { data: product, error } = await supabase
    .from("products")
    .select("title, wholesale_price")
    .eq("id" , productId)
    .single()

  if (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
  return {
    title: product.title,
    wholesalePrice: product.wholesale_price,
  };
}

