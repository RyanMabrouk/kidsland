"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function productsWholeSalePrice() {
  const supabase = createServerActionClient({ cookies });

  const { data: products, error } = await supabase
    .from("products")
    .select("stock, wholesale_price");

  if (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
  const totaleWholesalePrice = products.reduce((acc, product) => {
    const stock = product.stock || 0;
    const wholesalePrice = product.wholesale_price || 0;
    const productWholeSalePrice = stock * wholesalePrice;
    return acc + productWholeSalePrice;
  }, 0);

  return totaleWholesalePrice;
}
