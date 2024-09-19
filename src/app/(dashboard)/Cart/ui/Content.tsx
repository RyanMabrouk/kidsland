"use client";

import Items from "./Items";
import Resume from "./Resume";
import { cartSortFilters } from "../constants/CartFilters";
import { Filters } from "./Filters";
import { FiltersProvider } from "../context/FiltersProvider";

export default function Content() {
  return (
    <FiltersProvider>
      <div className="mb-20 flex h-screen flex-col justify-between p-10 transition-all duration-500 sm:w-full sm:items-center sm:gap-10 md:w-10/12 md:flex-row md:items-start md:gap-10 lg:w-10/12 lg:gap-24 xl:gap-36">
        <div className="mb-20 w-8/12 sm:items-center md:items-start">
          <Filters filters={cartSortFilters} />
          <Items />
        </div>
        <Resume />
      </div>
    </FiltersProvider>
  );
}
