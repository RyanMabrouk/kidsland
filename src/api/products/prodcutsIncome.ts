"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function productsIncome() {
  const supabase = createServerActionClient({ cookies });

  // Query the products table to get all the necessary fields
  const { data: products, error } = await supabase
    .from("products")
    .select("stock, price, discount, wholesale_price");

  if (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }

  // Calculate the total income from the fetched products
  const totalIncome = products.reduce((acc, product) => {
    const stock = product.stock || 0;
    const price = product.price || 0;
    const discount = product.discount || 0;
    const wholesalePrice = product.wholesale_price || 0;

    // Calculate income for the current product
    const income = stock * ((price - discount) - wholesalePrice);

    // Accumulate the income
    return acc + income;
  }, 0);

  return totalIncome;
}