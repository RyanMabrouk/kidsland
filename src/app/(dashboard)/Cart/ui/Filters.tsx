"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  cartSortFiltersValues,
  CartSortFilterType,
} from "../constants/CartFilters";
import { SelectGeneric } from "@/app/ui/SelectGeneric";
import { ToggleSortArrow } from "../../products/ui/ToggleSortArrow";
export function Filters({
  filters,
  setFilter,
  setIsReversed,
}: {
  filters: CartSortFilterType[];
  setFilter: Dispatch<SetStateAction<cartSortFiltersValues>>;
  setIsReversed: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="mb-3 flex items-center gap-4">
      {filters.map((filter) => (
        <div className="bg-white" key={filter.title}>
          <SelectGeneric
            className=""
            name="filter"
            inputLabel={filter.title}
            defaultValue={filter.items[0]}
            options={filter.items}
            required={true}
            onChange={(option) => setFilter(option as cartSortFiltersValues)}
          />
        </div>
      ))}
      <div className="rounded-full bg-white">
        <ToggleSortArrow onClick={setIsReversed} />
      </div>
    </div>
  );
}
