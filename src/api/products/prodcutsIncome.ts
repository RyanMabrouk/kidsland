"use server";

import { createClient } from "@/lib/supabase";

export default async function productsIncome() {
  const supabase = createClient();

  // Query the products table to get all the necessary fields
  const { data: products, error } = await supabase
    .from("products")
    .select("stock, price, discount, wholesale_price");

  if (error) {
    return { error: error.message };
  }
  const totalIncome = products.reduce((acc, product) => {
    const stock = product.stock || 0;
    const price = product.price || 0;
    const discount = product.discount || 0;
    const wholesalePrice = product.wholesale_price || 0;
    const income = stock * ((price - discount) - wholesalePrice);
    return acc + income;
  }, 0);

  return totalIncome;
}
