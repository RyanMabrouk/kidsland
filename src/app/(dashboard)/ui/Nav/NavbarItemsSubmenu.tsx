"use client";
import Link from "next/link";
import React from "react";
export function NavbarItemsSubmenu(item: {
  title: string;
  href: string;
  subItems?: {
    title: string;
    filter: string;
    icon: React.ElementType;
  }[];
}) {
  const [isHovering, setIsHovering] = React.useState(false);
  return (
    <div className="relative h-full">
      <Link
        className={`${
          isHovering ? "bg-color1 text-white" : "text-slate-700"
        } flex h-full min-w-[5rem] items-center justify-center px-2 text-center text-lg font-normal text-slate-700 transition-all ease-linear hover:bg-color1 hover:text-white`}
        key={item.title}
        href={item.href}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {item.title}
      </Link>
      {isHovering && (
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          id="account-menu"
          className={`${
            item.subItems && item.subItems.length > 6
              ? "grid grid-cols-2"
              : "flex flex-col"
          } absolute left-0 top-[100%] z-50 w-max min-w-full bg-white py-0 shadow-lg`}
        >
          {item.subItems?.map((subItem) => {
            const Icon = subItem.icon;
            return (
              <Link
                key={subItem.title}
                className="group flex cursor-pointer flex-row items-center gap-4 py-3 pl-3 pr-6 transition-all ease-linear hover:bg-color1 hover:text-white"
                href={`${item.href}?${subItem.filter}`}
              >
                <span>
                  {<Icon className="size-6 group-hover:text-white" />}
                </span>
                {subItem.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
