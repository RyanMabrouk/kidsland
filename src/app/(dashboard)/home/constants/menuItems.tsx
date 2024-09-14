import { MdToys } from "react-icons/md";
import { GiBrain } from "react-icons/gi";
import { MdConstruction } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";

export type MenuItemsType = {
  title: string;
  href: string;
  subItems?: {
    title: string;
    filter: string;
    icon: ({ className }: { className: string }) => React.JSX.Element;
  }[];
}[];
const menuItems: MenuItemsType = [
  {
    title: "Kidsland moments",
    href: "/products",
  },
  {
    title: "Toys",
    href: "/products",
    subItems: [
      {
        title: "Concentration",
        filter: `category=concentration`,
        icon: ({ className }: { className: string }) => (
          <GiBrain className={className} />
        ),
      },
      {
        title: "Social",
        filter: `category=social`,
        icon: ({ className }: { className: string }) => (
          <MdToys className={className} />
        ),
      },
      {
        title: "Construction",
        filter: `category=construction`,
        icon: ({ className }: { className: string }) => (
          <MdConstruction className={className} />
        ),
      },
    ],
  },

  {
    title: "Deals",
    href: "/products",
    subItems: [
      {
        title: "Discounts",
        filter: `discount=true`,
        icon: ({ className }: { className: string }) => (
          <RiDiscountPercentFill className={className} />
        ),
      },
    ],
  },
];
export { menuItems };
