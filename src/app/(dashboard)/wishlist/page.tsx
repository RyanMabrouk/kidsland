"use client";
import Image from "next/image";
import useProducts from "@/hooks/data/products/useProducts";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { productsQuery } from "@/hooks/data/products/productsQuery";
import { useMemo } from "react";
import useTranslation from "@/translation/useTranslation";
import Product from "../home/ui/ProductsSection/Product";
import useUserWishlist from "@/hooks/data/wishlist/useUserWishlist";

export default function Page() {
  const [page, setPage] = useState(1);
  const limit = 8;
 
  const { data: wishlist } = useUserWishlist({ page, limit });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (wishlist?.meta?.has_next_page) {
      queryClient.prefetchQuery(
        productsQuery({
          page: page + 1,
          limit,
        }),
      );
    }
  }, [page, wishlist?.meta?.has_next_page, queryClient]);
  const { data: translation } = useTranslation();
  return (
    <div className="my-10 flex min-h-screen flex-col gap-12">
      <div className="flex flex-row items-center justify-center gap-3">
        <Image
          src="/home/icons/flower_yellow.png"
          alt=""
          height={15}
          width={15}
        />
        <div className="text-2xl font-bold uppercase text-color5">
          {translation?.lang["Wishlist"]}
        </div>
        <Image
          src="/home/icons/flower_yellow.png"
          alt=""
          height={15}
          width={15}
        />
      </div>
      <div className="mx-auto grid min-h-screen w-fit grid-cols-4 gap-x-10 gap-y-10 max-[1150px]:grid-cols-3 max-[830px]:grid-cols-2">
        {wishlist?.data?.map((product, key) => (
          <Product key={key} {...product.products} />
        ))}
      </div>
      <Pagination
        className="flex w-full justify-center"
        count={2}
        page={page}
        boundaryCount={1}
        onChange={(e, value) => setPage(value)}
      />
    </div>
  );
}
