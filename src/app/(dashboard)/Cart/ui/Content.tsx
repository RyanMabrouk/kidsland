"use client";

import Items from "./Items";
import Resume from "./Resume";
import {
  cartSortFilters,
  cartSortFiltersValues,
} from "../constants/CartFilters";
import { Filters } from "./Filters";
import { useState } from "react";

export default function Content() {
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [filter, setFilter] = useState<cartSortFiltersValues>("title");
  return (
    <div className="mb-20 flex h-screen w-8/12 flex-row justify-between p-10">
      <div className="mb-20 w-8/12">
        <Filters
          filters={cartSortFilters}
          setFilter={setFilter}
          setIsReversed={setIsReversed}
        />
        <Items filter={filter} isReversed={isReversed} />
      </div>
      <Resume />
    </div>
  );
}
