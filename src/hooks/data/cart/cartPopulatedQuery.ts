import getData from "@/api/getData";
import { Tables } from "@/types/database.types";
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
    const res = await getData<"cart", ICartResponse[]>({
      tableName: "cart",
      column: "*,products(*)",
      user: true,
    });
    return {
      error: res.error,
      data: res.data?.map((item) => ({
        ...item,
        product: item.products,
      })),
    };
  },
});

export { cartPopulatedQuery };
