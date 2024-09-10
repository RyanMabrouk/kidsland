"use client";

import Items from "./Items";
import Resume from "./Resume";
import { cartFilters } from "../constants/CartFilters";
import { Filters } from "./Filters";
import { useState } from "react";

export default function Content() {
  const [up, setUp] = useState(false);
  const [filter, setFilter] = useState("Alphabetically");
  return (
    <div className="flex w-8/12 justify-between">
      <div className="w-8/12">
        <Filters
          filters={cartFilters}
          setFilter={setFilter}
          up={up}
          setUp={setUp}
        />
        <Items filter={filter} up={up} />
      </div>
      <div>
        <Resume />
      </div>
    </div>
  );
}
