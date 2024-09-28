"use server";

import { createClient } from "@/lib/supabase";

export default async function getProductTitleAndWholesalePrice(productId : string) {
  const supabase = createClient();
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

