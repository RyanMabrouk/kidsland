"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BreadCrumbs from "./[productId]/ui/BreadCrumbs";
import useProducts from "@/hooks/data/products/useProducts";
import { useQueryClient } from "@tanstack/react-query";
import { productsQuery } from "@/hooks/data/products/productsQuery";
import Product from "../home/ui/ProductsSection/Product";
import { Divider, Pagination } from "@mui/material";
import { SelectGeneric } from "@/app/ui/SelectGeneric";
import { Tables } from "@/types/database.types";
import { ToggleSortArrow } from "./ui/ToggleSortArrow";
import PriceRangeFilter from "./ui/PriceRangeFilter";
import DiscountFilter from "./ui/DiscountFilter";
import CategoriesFilter from "./ui/CategoriesFilter";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import useScreenWidth from "@/hooks/useScreenWidth";
import { IoMdClose } from "react-icons/io";

const sortOptions: { label: string; value: keyof Tables<"products"> }[] = [
  {
    label: "Price",
    value: "price",
  },
  {
    label: "Newest",
    value: "created_at",
  },
  {
    label: "Products on sale",
    value: "discount",
  },
  {
    label: "Name",
    value: "title",
  },
];
type ProductsFilterType = {
  minDiscount: number;
  priceRange: number[];
  category_id: number | null;
};
function Page() {
  const [toggleFilters, setToggleFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({
    column: "created_at" as keyof Tables<"products">,
    ascending: false,
  });
  const [filters, setFilters] = useState<ProductsFilterType>({
    minDiscount: 0,
    priceRange: [5, 999],
    category_id: null as number | null,
  });
  const limit = 18;
  const { data: products } = useProducts({
    page,
    limit,
    sort,
    filters,
    match: filters.category_id
      ? { category_id: filters.category_id }
      : undefined,
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (products?.meta?.has_next_page) {
      queryClient.prefetchQuery(
        productsQuery({
          page: page + 1,
          limit,
          sort,
          filters,
          match: filters.category_id
            ? { category_id: filters.category_id }
            : undefined,
        }),
      );
    }
  }, [page, products?.meta?.has_next_page, sort, filters, queryClient]);
  return (
    <div className="flex flex-col">
      <Image
        src={"/product/igracke_header.jpg"}
        alt="logo"
        width={2000}
        height={2000}
        className="w-full"
      />
      <BreadCrumbs />
      <div className="mx-auto flex flex-row gap-12 max-[830px]:gap-0">
        <div className="relative h-full max-[830px]:w-1">
          <Filters
            setFilters={setFilters}
            isVisible={toggleFilters}
            setIsVisible={setToggleFilters}
          />
        </div>
        <div className="mt-10 flex flex-col gap-12">
          <div className="flex flex-row items-center gap-6 max-[515px]:gap-3">
            <div
              className="hidden h-9 flex-row items-center gap-1 rounded-md border-2 p-2 max-[830px]:flex"
              onClick={() => {
                setToggleFilters((prev) => !prev);
              }}
            >
              <span>Filters</span>
              <AiOutlineMenuUnfold />
            </div>
            <SelectGeneric
              options={sortOptions}
              inputLabel="Sort"
              onChange={(value) => {
                if (value !== sort.column) {
                  setSort((prev) => ({
                    ...prev,
                    column: value as keyof Tables<"products">,
                  }));
                }
              }}
            />
            <ToggleSortArrow
              onClick={(value) => {
                if (value !== sort.ascending) {
                  setSort((prev) => ({
                    ...prev,
                    ascending: value,
                  }));
                }
              }}
            />
            <span className="text-xl font-bold text-color8 max-[515px]:text-sm">
              {products?.meta?.total_count} products
            </span>
          </div>
          <div className="mx-auto grid min-h-screen w-[50rem] grid-cols-3 gap-x-10 gap-y-10 max-[1150px]:w-max max-[1150px]:grid-cols-2 max-[830px]:grid-cols-2">
            {products?.data?.map((product, key) => (
              <Product key={key} {...product} />
            ))}
          </div>
          <Pagination
            className="flex w-full justify-center"
            count={products?.meta?.total_pages}
            page={page}
            boundaryCount={1}
            onChange={(e, value) => setPage(value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;

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
