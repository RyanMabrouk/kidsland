"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BreadCrumbs from "./[productId]/ui/BreadCrumbs";
import useProducts from "@/hooks/data/products/useProducts";
import { useQueryClient } from "@tanstack/react-query";
import { productsQuery } from "@/hooks/data/products/productsQuery";
import Product from "../home/ui/ProductsSection/Product";
import { Pagination } from "@mui/material";
import { SelectGeneric } from "@/app/ui/SelectGeneric";
import { IProduct } from "@/types/database.tables.types";
import { FaLongArrowAltDown } from "react-icons/fa";

function Page() {
  const [page, setPage] = useState(1);
  const limit = 21;
  const { data: products } = useProducts({ page, limit });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (products?.meta.has_next_page) {
      queryClient.prefetchQuery(
        productsQuery({
          page: page + 1,
          limit,
        }),
      );
    }
  }, [page, products?.meta.has_next_page, queryClient]);
  const sortOptions: { label: string; value: keyof IProduct }[] = [
    {
      label: "Price",
      value: "price_after_discount",
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
        src={"/product/opsti-uslovi_header.jpg"}
        alt="logo"
        width={2000}
        height={2000}
        className="w-full"
      />
      <BreadCrumbs />
      <div className="mx-auto flex flex-row gap-[2rem]">
        <div className="w-[15rem] bg-color1"></div>
        <div className="mt-20 flex flex-col gap-12">
          <div className="flex flex-row gap-6 items-center">
            <SelectGeneric options={sortOptions} inputLabel="Sort" />
            <FaLongArrowAltDown className="size-7 border rounded-full p-1 " />
          </div>
          <div className="mx-auto grid w-fit grid-cols-3 gap-x-10 gap-y-10">
            {products?.data?.map((product, key) => (
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
