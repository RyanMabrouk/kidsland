import { IProduct } from "@/types/database.tables.types";
import { Tables } from "@/types/database.types";

export function formatProduct(
  product: Tables<"products"> | null,
  {
    cart,
    wishlist,
  }: {
    cart: string[] | undefined;
    wishlist: string[] | undefined;
  },
): IProduct | null {
  /*   console.log("product", product);*/
  /*console.log("cart", cart);
  console.log("wishlist", wishlist); */
  if (!product) {
    console.error("Product is null");
    return null;
  }
  return {
    ...product,
    available: product.stock > 0,
    isInCart: cart?.includes(product.id) ?? false,
    isInWishlist: wishlist?.includes(product.id) ?? false,
    price_after_discount:
      product.discount_type === "fixed"
        ? product.price - product.discount
        : product.price - (product.price * product.discount) / 100,
  } as IProduct | null;
}
