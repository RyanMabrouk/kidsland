"use client";

import Items from "./Items";
import Resume from "./Resume";
import { cartFilters } from "../constants/CartFilters";
import { Filters } from "./Filters";
import { useState } from "react";

export default function Content() {
  const [up, setUp] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("Alphabetically");
  return (
    <div className="flex justify-between p-10 transition-all duration-500 sm:gap-10 md:w-full md:gap-16 lg:w-10/12 lg:gap-24 xl:gap-36">
      <div className="relative flex w-8/12 flex-col sm:items-center md:items-start">
        <Filters filters={cartFilters} />
        <Items />
      </div>
      <Resume />
    </div>
  );
}
