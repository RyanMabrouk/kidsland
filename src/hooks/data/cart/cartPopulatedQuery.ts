"use client";
import getData from "@/api/getData";
import { Tables } from "@/types/database.types";
import { IProduct } from "@/types/database.tables.types";
export interface ICartResponse extends Tables<"cart"> {
  products: Tables<"products">;
}
const cartPopulatedQuery = (limit: number, page: number) => ({
  queryKey: [
    "cart",
    {
      user: true,
      populated: true,
    },
  ],
  queryFn: async () => {
    console.log("cartPopulatedQuery");
    const { data } = await getData<"cart", ICartResponse[]>({
      tableName: "cart",
      column: "*,products(*)",
      user: true,
      pagination: { limit: limit, page: page },
    });
    const newData = (data || []).map((e) => {
      const price_after_discount =
        e.products.discount_type === "fixed"
          ? e.products.price - e.products.discount
          : e.products.price - (e.products.price * e.products.discount) / 100;
      const product = {
        id: e.product_id,
        created_at: e.products.created_at,
        available: e.products.stock > 0,
        category_id: e.products.category_id,
        description: e.products.description,
        discount: e.products.discount,
        discount_type: e.products.discount_type,
        image_url: e.products.image_url,
        isInCart: true,
        price: e.products.price,
        price_after_discount,
        stock: e.products.stock,
        title: e.products.title,
        subtitle: e.products.subtitle,
        wholesale_price: e.products.wholesale_price,
        isInWishlist: false,
      } as IProduct;
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
