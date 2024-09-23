"use client";
import PriceRangeFilter from "./PriceRangeFilter";
import DiscountFilter from "./DiscountFilter";
import CategoriesFilter from "./CategoriesFilter";
import { useProductsFilter } from "../context/ProductsFilterContext";

export function Filters() {
  const { setFilters, filters } = useProductsFilter();
  return (
    <>
      <hr className="!my-4 h-[1px] w-full !bg-gray-500" />
      <PriceRangeFilter
        defaultValue={filters.priceRange}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            priceRange: value as [number, number],
          }));
        }}
      />
      <hr className="!my-4 h-[1px] w-full !bg-gray-500" />
      <DiscountFilter
        defaultValue={filters.minDiscount}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            minDiscount: value,
          }));
        }}
      />
      <hr className="!my-4 h-[1px] w-full !bg-gray-500" />
      <CategoriesFilter
        defaultValue={filters.category_id}
        onChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            category_id: value,
          }))
        }
      />
    </>
  );
}
