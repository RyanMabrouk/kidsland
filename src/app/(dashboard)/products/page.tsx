"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import BreadCrumbs from "./[productId]/ui/BreadCrumbs";
import useProducts from "@/hooks/data/products/useProducts";
import { useQueryClient } from "@tanstack/react-query";
import { productsQuery } from "@/hooks/data/products/productsQuery";
import Product from "../home/ui/ProductsSection/Product";
import { Divider, Pagination, Slider } from "@mui/material";
import { SelectGeneric } from "@/app/ui/SelectGeneric";
import { IProduct } from "@/types/database.tables.types";
import { Tables } from "@/types/database.types";
import { ToggleSortArrow } from "./ui/ToggleSortArrow";
import useCart from "@/hooks/data/cart/useCart";
import Checkbox from "@/app/ui/Checkbox";
const sortOptions: { label: string; value: keyof IProduct }[] = [
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
  });
  const limit = 6;
  const { data: products } = useProducts({
    page,
    limit,
    sort,
    filters,
  });
  const { data: cart } = useCart();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (products?.meta.has_next_page) {
      queryClient.prefetchQuery(
        productsQuery({
          page: page + 1,
          limit,
          sort,
          cartProducts: cart?.data,
          filters,
        }),
      );
    }
  }, [
    page,
    products?.meta.has_next_page,
    queryClient,
    sort,
    cart?.data,
    filters,
  ]);
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
        </div>
        <div className="mt-10 flex flex-col gap-12">
          <div className="flex flex-row items-center gap-6">
            <SelectGeneric
              options={sortOptions}
              inputLabel="Sort"
              onChange={(value) => {
                setSort((prev) => ({
                  ...prev,
                  column: value as keyof Tables<"products">,
                }));
              }}
            />
            <ToggleSortArrow
              onClick={(value) => {
                setSort((prev) => ({
                  ...prev,
                  ascending: value,
                }));
              }}
            />
          </div>
          <div className="mx-auto grid min-h-screen w-[50rem] grid-cols-3 gap-x-10 gap-y-10">
            {products?.data.map((product, key) => (
              <Product key={key} {...product} />
            ))}
          </div>
          <Pagination
            className="flex w-full justify-center"
            count={products?.meta.total_pages}
            page={page}
            boundaryCount={3}
            siblingCount={3}
            onChange={(e, value) => setPage(value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;

function PriceRangeFilter({
  onChange,
}: {
  onChange: (value: number[]) => void;
}) {
  const [value, setValue] = useState([5, 999]);
  return (
    <div className="flex flex-col items-start justify-center">
      <span className="mb-1 text-sm font-medium uppercase">Price (TND)</span>
      <Slider
        className="mx-1 text-color8"
        onChange={(e, newValue) => {
          setValue(newValue as number[]);
          onChange(newValue as number[]);
        }}
        value={value}
        defaultValue={999}
        max={999}
        min={5}
        aria-label="Default"
        valueLabelDisplay="auto"
        getAriaValueText={(value) => String(value)}
      />
      <div className="mt-2 flex flex-row items-center justify-between">
        <input
          type="number"
          value={value[0]}
          className="h-[2rem] w-full rounded-sm border border-gray-500 text-center focus:outline-color8"
          onChange={(e) => {
            setValue((prev) => [Number(e.target.value), prev[1]]);
          }}
        />
        <span className="mx-4 text-lg font-bold">-</span>
        <input
          type="number"
          value={value[1]}
          className="h-[2rem] w-full rounded-sm border border-gray-500 text-center focus:outline-color8"
          onChange={(e) => {
            setValue((prev) => [prev[0], Number(e.target.value)]);
          }}
        />
      </div>
    </div>
  );
}

function DiscountFilter({ onChange }: { onChange: (value: number) => void }) {
  const [value, setValue] = useState<number | null>(null);
  const discount_options = [
    {
      value: 10,
      label: "10% and more",
    },
    {
      value: 30,
      label: "30% and more",
    },
  ];
  return (
    <div className="flex flex-col items-start justify-center">
      <span className="mb-1 text-sm font-medium uppercase">Discount (%)</span>
      {discount_options.map((e) => (
        <Checkbox
          key={e.value}
          name="discount_options"
          label={e.label}
          checked={value === e.value}
          onChange={() => {
            setValue(e.value === value ? 0 : e.value);
            onChange(e.value === value ? 0 : e.value);
          }}
        />
      ))}
    </div>
  );
}
