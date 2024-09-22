"use client";
import React from "react";
import {
  cartSortFiltersValues,
  CartSortFilterType,
} from "../constants/CartFilters";
import { SelectGeneric } from "@/app/ui/SelectGeneric";
import { ToggleSortArrow } from "../../products/ui/ToggleSortArrow";
import { useFilters } from "../context/FiltersProvider";
export function Filters({ filters }: { filters: CartSortFilterType[] }) {
  const { setFilter, setIsReversed } = useFilters();
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
