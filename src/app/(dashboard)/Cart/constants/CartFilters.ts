export type CartFilterType = {
  title: string;
  items: { title: string; icon: string }[];
};

export const cartFilters: CartFilterType[] = [
  {
    title: "Sorted",
    items: [
      { title: "Alphabetically", icon: "/Cart/cubes.png" },
      { title: "By price", icon: "/Cart/dollar.png" },
      { title: "By Discount", icon: "/Cart/tag.png" },
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
