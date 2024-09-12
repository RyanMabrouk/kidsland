"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { CartFilterType } from "../constants/CartFilters";
import { SelectGeneric } from "@/app/ui/SelectGeneric";
import { ToggleSortArrow } from "../../products/ui/ToggleSortArrow";
export function Filters({
  filters,
  setFilter,
  up,
  setUp,
}: {
  filters: CartFilterType[];
  setFilter: Dispatch<SetStateAction<string>>;
  up: boolean;
  setUp: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="mb-3 flex items-end gap-4">
      {filters.map((filter) => (
        <SelectGeneric
          key={filter.title}
          className=""
          name="filter"
          defaultValue={filter.items[0]}
          label="Sorted"
          options={filter.items}
          required={true}
          onChange={(option: string) => setFilter(option)}
        />
      ))}
      <ToggleSortArrow onClick={setUp} />
    </div>
  );
}
