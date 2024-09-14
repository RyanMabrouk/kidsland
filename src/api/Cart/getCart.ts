import { ICartResponse } from "@/hooks/data/cart/cartPopulatedQuery";
import getData from "../getData";

export default async function getCart() {
  const res = await getData<"cart", ICartResponse[]>({
    tableName: "cart",
    column: "*,products(*)",
    user: true,
  });
  return res;
}
