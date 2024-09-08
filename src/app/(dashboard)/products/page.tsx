"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import BreadCrumbs from "./[productId]/ui/BreadCrumbs";
import useProducts from "@/hooks/data/products/useProducts";
import { useQueryClient } from "@tanstack/react-query";
import { productsQuery } from "@/hooks/data/products/productsQuery";
import Product from "../home/ui/ProductsSection/Product";
import { Pagination } from "@mui/material";
import { SelectGeneric } from "@/app/ui/SelectGeneric";
import { IProduct } from "@/types/database.tables.types";
import { Tables } from "@/types/database.types";
import { ToggleSortArrow } from "./ui/ToggleSortArrow";
import useCart from "@/hooks/data/cart/useCart";

function Page() {
  const [page, setPage] = useState(1);
  const [sortDescending, setSortDescending] = useState(true);
  const [sortColumn, setSortColumn] = useState<
    keyof Tables<"products"> | undefined
  >(undefined);
  const limit = 6;
  const sort = useMemo(
    () =>
      sortColumn
        ? {
            column: sortColumn,
            ascending: !sortDescending,
          }
        : undefined,
    [sortColumn, sortDescending],
  );
  const { data: products } = useProducts({
    page,
    limit,
    sort,
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
        }),
      );
    }
  }, [page, products?.meta.has_next_page, queryClient, sort]);
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
      <div className="mx-auto flex flex-row gap-[2rem]">
        <div className="w-[15rem] bg-color1"></div>
        <div className="mt-10 flex flex-col gap-12">
          <div className="flex flex-row items-center gap-6">
            <SelectGeneric
              options={sortOptions}
              inputLabel="Sort"
              setValueInParent={setSortColumn}
            />
            <ToggleSortArrow setSortDescending={setSortDescending} />
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
