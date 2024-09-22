"use client";
import React from "react";

import { SelectGeneric } from "@/app/ui/SelectGeneric";
import { ToggleSortArrow } from "../../products/ui/ToggleSortArrow";
import {
  OrderSortFilterType,
  orderSortFiltersValues,
} from "../constants/filters";
import { useOrderFilters } from "../context/FilterProvider";
export function OrderFilters({ filters }: { filters: OrderSortFilterType[] }) {
  const { setFilters: setFilter, setIsReversed } = useOrderFilters();
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
            onChange={(option) => setFilter(option as orderSortFiltersValues)}
          />
        </div>
      ))}
      <div className="rounded-full bg-white">
        <ToggleSortArrow onClick={setIsReversed} />
      </div>
    </div>
  );
}
