"use client";
import getData from "@/api/getData";
import { Tables } from "@/types/database.types";
import { IProduct } from "@/types/database.tables.types";
import { formatProduct } from "../products/formatProducts";
import useWishlist from "../wishlist/useWishlist";
export interface ICartResponse extends Tables<"cart"> {
  products: Tables<"products">;
}
const cartPopulatedQuery = () => ({
  queryKey: [
    "cart",
    {
      user: true,
      populated: true,
    },
  ],
  queryFn: async () => {
    const cartQuery = getData<"cart", ICartResponse[]>({
      tableName: "cart",
      column: "*,products(*)",
      user: true,
    });
    const wishlistQuery = getData<"wishlist">({
      tableName: "wishlist",
      column: "*",
      user: true,
    });
    const [{ data }, { data: wishlistInitial }] = await Promise.all([
      cartQuery,
      wishlistQuery,
    ]);
    const cart = data?.map((e) => e.product_id) ?? [];
    const wishlist = wishlistInitial?.map((e) => e.product_id) ?? [];
    const newData = (data || []).map((e) => {
      const product = formatProduct(e.products, { cart, wishlist });
      return {
        ...e,
        products: product,
      } as ICartResponse & { products: IProduct };
    });
    return {
      cart: newData,
      numberOfItems: newData?.reduce((acc, item) => acc + item.quantity, 0),
      total_after_discount: newData?.reduce(
        (a, b) => a + (b.products?.price_after_discount ?? 0) * b.quantity,
        0,
      ),
      total_before_discount: newData?.reduce(
        (a, b) => a + (b.products?.price ?? 0) * b.quantity,
        0,
      ),
    };
  },
});

export { cartPopulatedQuery };
