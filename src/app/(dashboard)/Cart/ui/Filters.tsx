"use client";
import React, { Dispatch, SetStateAction } from "react";
import { CartFilterType } from "../constants/CartFilters";
import { SelectGeneric } from "@/app/ui/SelectGeneric";
import { ToggleSortArrow } from "../../products/ui/ToggleSortArrow";
export function Filters({
  filters,
  setFilter,
  setUp,
}: {
  filters: CartFilterType[];
  setFilter: Dispatch<SetStateAction<string>>;
  setUp: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="mb-3 flex items-center gap-4">
      {filters.map((filter) => (
        <div className="bg-white">
          <SelectGeneric
            key={filter.title}
            className=""
            name="filter"
            defaultValue={filter.items[0]}
            options={filter.items}
            required={true}
            onChange={(option: string) => setFilter(option)}
          />
        </div>
      ))}
      <div className="rounded-full bg-white">
        <ToggleSortArrow onClick={setUp} />
      </div>
    </div>
  );
}
