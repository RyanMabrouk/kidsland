import { IProduct } from "@/types/database.tables.types";
import { Tables } from "@/types/database.types";

export function formatProduct(
  product: Tables<"products"> | undefined,
): IProduct | null {
  if (!product) return null;
  return {
    ...product,
    available: product.stock > 0,
    price_after_discount:
      product.discount_type === "fixed"
        ? product.price - product.discount
        : product.price - (product.price * product.discount) / 100,
  };
}