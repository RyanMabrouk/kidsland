import { SelectGenericOption } from "@/app/ui/SelectGeneric";
import { Tables } from "@/types/database.types";

interface CartFilterOption extends SelectGenericOption {
  value: keyof Tables<"products">;
}

export type CartSortFilterType = {
  title: string;
  items: CartFilterOption[];
};

export const cartSortFilters: CartSortFilterType[] = [
  {
    title: "Sort",
    items: [
      { label: "Alphabetically", value: "title" },
      { label: "By price", value: "price" },
      { label: "By Discount", value: "discount" },
    ],
  },
];

export type cartSortFiltersValues =
  (typeof cartSortFilters)[number]["items"][number]["value"];
