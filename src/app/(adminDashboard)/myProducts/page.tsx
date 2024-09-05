"use client";
import Image from "next/image";
import Product from "./ui/Product";
import useProducts from "@/hooks/data/products/useProducts";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { productsQuery } from "@/hooks/data/products/productsQuery";

export default function Page() {
  const [page, setPage] = useState(1);
  const limit = 8;
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
  return (
    <div className="mt-20 flex flex-col gap-12">
      <div className="flex flex-row items-center justify-center gap-3">
        <Image
          src="/home/icons/flower_yellow.png"
          alt=""
          height={15}
          width={15}
        />
        <div className="text-2xl font-bold uppercase text-color5">
          our products
        </div>
        <Image
          src="/home/icons/flower_yellow.png"
          alt=""
          height={15}
          width={15}
        />
      </div>
      <div className="mx-auto grid w-fit grid-cols-4 gap-x-10 gap-y-10">
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
  );
}
