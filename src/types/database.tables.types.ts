import { Database, Tables, TablesInsert } from "./database.types";

// Tables names
export type dbTableType = keyof Database[Extract<
  keyof Database,
  "public"
>]["Tables"];
export interface IProduct extends Tables<"products"> {
  available: boolean;
  price_after_discount: number;
  isInCart: boolean;
}
