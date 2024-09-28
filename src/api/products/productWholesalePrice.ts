"use server";

import { createClient } from "@/lib/supabase";

export default async function productsWholeSalePrice() {
  const supabase = createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("stock, wholesale_price")
    .gt("stock",0);
  const totaleWholesalePrice = products?.reduce((acc, product) => {
    const productWholeSalePrice = product.stock * product.wholesale_price;
    return acc + productWholeSalePrice;
  }, 0);

  return {
    totaleWholesalePrice,
    error,
  };
}
