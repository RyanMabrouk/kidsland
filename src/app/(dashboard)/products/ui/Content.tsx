"use client";
import useProducts from "@/hooks/data/products/useProducts";
import { useQueryClient } from "@tanstack/react-query";
import { productsQuery } from "@/hooks/data/products/productsQuery";
import { Pagination } from "@mui/material";
import { SelectGeneric, SelectGenericOption } from "@/app/ui/SelectGeneric";
import { Tables } from "@/types/database.types";
import { useEffect, useState } from "react";
import { useProductsFilter } from "../context/ProductsFilterContext";
import FiltersLaptop from "./FiltersLaptop";
import FiltersPhone from "./FiltersPhone";
import { ToggleSortArrow } from "./ToggleSortArrow";
import Product from "../../home/ui/ProductsSection/Product";
import useTranslation from "@/translation/useTranslation";

export default function Content() {
  const { data: translation } = useTranslation();
  const sortOptions = [
    {
      label: translation?.lang["price"],
      value: "price",
    },
    {
      label: translation?.lang["Newest"],
      value: "created_at",
    },
    {
      label: translation?.lang["Products on sale"],
      value: "discount",
    },
    {
      label: translation?.lang["Name"],
      value: "title",
    },
  ] as const;
  const [page, setPage] = useState(1);
  const { filters } = useProductsFilter();
  const [sort, setSort] = useState({
    column: "created_at" as keyof Tables<"products">,
    ascending: false,
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
    <div className="mx-auto flex flex-row gap-12 max-[830px]:gap-0">
      <FiltersLaptop />
      <div className="mt-10 flex flex-col gap-12">
        <div className="flex flex-row items-center gap-6 max-[515px]:gap-3">
          <FiltersPhone />
          <SelectGeneric
            options={sortOptions as unknown as SelectGenericOption[]}
            inputLabel={translation?.lang["Sort"]}
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
            {products?.meta?.total_count} {translation?.lang["Products"]}
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
  );
}
