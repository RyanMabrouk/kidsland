"use client";
import { Divider } from "@mui/material";
import useScreenWidth from "@/hooks/useScreenWidth";
import { IoMdClose } from "react-icons/io";
import { ProductsFilterType } from "../page";
import PriceRangeFilter from "./PriceRangeFilter";
import DiscountFilter from "./DiscountFilter";
import CategoriesFilter from "./CategoriesFilter";

export function Filters({
  setFilters,
  isVisible,
  setIsVisible,
}: {
  setFilters: React.Dispatch<React.SetStateAction<ProductsFilterType>>;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const screenWidth = useScreenWidth();
  return (
    <div
      className={`relative top-10 z-50 flex h-full w-[15rem] flex-col gap-3 border-r border-gray-200 !bg-white px-5 py-10 transition-all duration-300 ease-linear max-[830px]:sticky ${
        screenWidth < 830
          ? isVisible
            ? "h-screen translate-x-[0%]"
            : "translate-x-[-200%]"
          : ""
      }`}
    >
      <IoMdClose
        className="absolute right-2 top-2 hidden size-6 cursor-pointer max-[830px]:block"
        onClick={() => {
          setIsVisible(false);
        }}
      />
      <span className="w-full min-w-full bg-white text-center text-xl font-bold text-color8">
        Choose a filter
      </span>
      <Divider className="!my-4 !bg-white" />
      <PriceRangeFilter
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            priceRange: value,
          }));
        }}
      />
      <Divider className="!my-4 !bg-white" />
      <DiscountFilter
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            minDiscount: value,
          }));
        }}
      />
      <Divider className="!my-4 !bg-white" />
      <CategoriesFilter
        onChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            category_id: value,
          }))
        }
      />
    </div>
  );
}
