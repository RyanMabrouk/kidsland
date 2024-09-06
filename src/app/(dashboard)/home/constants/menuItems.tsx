import { MdToys } from "react-icons/md";

export type MenuItemsType = {
  title: string;
  href: string;
  subItems: {
    title: string;
    href: string;
    icon: ({ className }: { className: string }) => React.JSX.Element;
  }[];
}[];
const menuItems: MenuItemsType = [
  {
    title: "Kidsland moments",
    href: "/moments",
    subItems: [
      {
        title: "New Arrivals",
        href: "/new-arrivals",
        icon: ({ className }: { className: string }) => (
          <MdToys className={className} />
        ),
      },
      {
        title: "Best Sellers",
        href: "/best-sellers",
        icon: ({ className }: { className: string }) => (
          <MdToys className={className} />
        ),
      },
      {
        title: "Trending",
        href: "/trending",
        icon: ({ className }: { className: string }) => (
          <MdToys className={className} />
        ),
      },
    ],
  },
  {
    title: "Toys",
    href: "/products",
    subItems: [
      {
        title: "Action Figures",
        href: "/action-figures",
        icon: ({ className }: { className: string }) => (
          <MdToys className={className} />
        ),
      },
      {
        title: "Dolls",
        href: "/dolls",
        icon: ({ className }: { className: string }) => (
          <MdToys className={className} />
        ),
      },
      {
        title: "Educational",
        href: "/educational",
        icon: ({ className }: { className: string }) => (
          <MdToys className={className} />
        ),
      },
      {
        title: "Games",
        href: "/games",
        icon: ({ className }: { className: string }) => (
          <MdToys className={className} />
        ),
      },
      {
        title: "Outdoor",
        href: "/outdoor",
        icon: ({ className }: { className: string }) => (
          <MdToys className={className} />
        ),
      },
      {
        title: "Puzzles",
        href: "/puzzles",
        icon: ({ className }: { className: string }) => (
          <MdToys className={className} />
        ),
      },
      {
        title: "Remote Control",
        href: "/remote-control",
        icon: ({ className }: { className: string }) => (
          <MdToys className={className} />
        ),
      },
      {
        title: "Stuffed Animals",
        href: "/stuffed-animals",
        icon: ({ className }: { className: string }) => (
          <MdToys className={className} />
        ),
      },
      {
        title: "Vehicles",
        href: "/vehicles",
        icon: ({ className }: { className: string }) => (
          <MdToys className={className} />
        ),
      },
    ],
  },

  {
    title: "Deals",
    href: "/deals",
    subItems: [
      {
        title: "Clearance",
        href: "/clearance",
        icon: ({ className }: { className: string }) => (
          <MdToys className={className} />
        ),
      },
      {
        title: "Discounts",
        href: "/discounts",
        icon: ({ className }: { className: string }) => (
          <MdToys className={className} />
        ),
      },
      {
        title: "Sales",
        href: "/sales",
        icon: ({ className }: { className: string }) => (
          <MdToys className={className} />
        ),
      },
    ],
  },
];
export { menuItems };
