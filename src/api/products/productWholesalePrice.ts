"use server";

import { createClient } from "@/lib/supabase";

export default async function productsWholeSalePrice() {
  const supabase = createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("stock, wholesale_price");

  if (error) {
    return { error: error.message };
  }
  const totaleWholesalePrice = products.reduce((acc, product) => {
    const stock = product.stock || 0;
    const wholesalePrice = product.wholesale_price || 0;
    const productWholeSalePrice = stock * wholesalePrice;
    return acc + productWholeSalePrice;
  }, 0);

  return totaleWholesalePrice;
}
