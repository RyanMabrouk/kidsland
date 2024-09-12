import { Option } from "@/app/ui/SelectGeneric";

export type CartFilterType = {
  title: string;
  items: Option[];
};

export const cartFilters: CartFilterType[] = [
  {
    title: "Sorted",
    items: [
      { label: "Alphabetically", value: "Alphabetically" },
      { label: "By price", value: "By price" },
      { label: "By Discount", value: "By Discount" },
    ],
  },
  /* {
    title: "Filters",
    items: [
      { title: "1", icon: "/Cart/cubes.png" },
      { title: "2", icon: "/Cart/dollar.png" },
      { title: "3", icon: "/Cart/tag.png" },
    ],
  }, */
];

/* "/Cart/cubes.png"
"/Cart/dollar.png"
"/Cart/tag.png" */
