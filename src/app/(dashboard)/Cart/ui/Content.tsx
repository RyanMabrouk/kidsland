"use client";

import Items from "./Items";
import Resume from "./Resume";
import { cartFilters } from "../constants/CartFilters";
import { Filters } from "./Filters";
import { useState } from "react";

export default function Content() {
  const [filter, setFilter] = useState("Alphabetically");
  return (
    <div className="flex w-8/12 justify-between">
      <div className="w-8/12">
        <Filters filters={cartFilters} setFilter={setFilter} />
        <Items filter={filter} />
      </div>
      <div>
        <Resume />
      </div>
    </div>
  );
}
