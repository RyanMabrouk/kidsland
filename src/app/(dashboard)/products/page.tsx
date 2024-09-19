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
function Page() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({
    column: "created_at" as keyof Tables<"products">,
    ascending: false,
  });
  const [filters, setFilters] = useState({
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
    <div className="mb-20 flex flex-col">
      <Image
        src={"/product/igracke_header.jpg"}
        alt="logo"
        width={2000}
        height={2000}
        className="w-full"
      />
      <BreadCrumbs />
      <div className="mx-auto flex flex-row gap-12">
        <div className="w-[15rem] flex-col border-r border-gray-200 px-5 py-10">
          <span className="w-full min-w-full text-center text-xl font-bold text-color8">
            Choose a filter
          </span>
          <Divider className="my-4" />
          <PriceRangeFilter
            onChange={(value) => {
              setFilters((prev) => ({
                ...prev,
                priceRange: value,
              }));
            }}
          />
          <Divider className="my-4" />
          <DiscountFilter
            onChange={(value) => {
              setFilters((prev) => ({
                ...prev,
                minDiscount: value,
              }));
            }}
          />
          <Divider className="my-4" />
          <CategoriesFilter
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                category_id: value,
              }))
            }
          />
        </div>
        <div className="mt-10 flex flex-col gap-12">
          <div className="flex flex-row items-center gap-6">
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
          </div>
          <div className="mx-auto grid min-h-screen w-[50rem] grid-cols-3 gap-x-10 gap-y-10">
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
