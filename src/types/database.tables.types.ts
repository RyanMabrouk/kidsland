import { Database, Tables, TablesInsert } from "./database.types";

// Tables names
export type tableType = keyof Database[Extract<
  keyof Database,
  "public"
>]["Tables"];
