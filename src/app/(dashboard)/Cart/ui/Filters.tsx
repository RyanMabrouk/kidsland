"use client";
import React, { Dispatch, SetStateAction } from "react";
import { CartFilterType } from "../constants/CartFilters";
export function Filters({
  filters,
  setFilter,
}: {
  filters: CartFilterType[];
  setFilter: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex">
      {filters.map((filter) => (
        <CartElement filters={filter} setFilter={setFilter} />
      ))}
    </div>
  );
}

function CartElement({
  filters,
  setFilter,
}: {
  filters: CartFilterType;
  setFilter: Dispatch<SetStateAction<string>>;
}) {
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <div className="relative h-[3rem] w-1/4">
      <div
        className={`${
          isHovering ? "bg-color1 text-white" : "text-slate-700"
        } flex h-full min-w-[5rem] items-center justify-center px-2 text-center text-lg font-normal text-slate-700 transition-all ease-linear hover:bg-color1 hover:text-white`}
        key={filters.title}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {filters.title}
      </div>
      {isHovering && (
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          id="account-menu"
          className={`${
            filters.items.length > 6 ? "grid grid-cols-2" : "flex flex-col"
          } absolute left-0 top-[100%] z-50 w-max min-w-full bg-white py-0 shadow-lg`}
        >
          {filters.items.map((subItem) => {
            return (
              <button
                onClick={() => setFilter(subItem.title)}
                key={subItem.title}
                className="group flex cursor-pointer flex-row items-center gap-4 py-3 pl-3 pr-6 transition-all ease-linear hover:bg-color1 hover:text-white"
              >
                <span>
                  <img
                    src={subItem.icon}
                    alt="icon"
                    className="h-[20px] w-[20px]"
                  />
                </span>
                {subItem.title}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
