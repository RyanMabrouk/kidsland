"use client";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useProducts from "@/hooks/data/products/useProducts";
import { productsQuery } from "@/hooks/data/products/productsQuery";
import { Player } from "@lottiefiles/react-lottie-player";
import DataTable from "./dataTable";
import { Pagination } from "@mui/material";
import { useStockPagination } from "../context/useStockPagination";
export default function Table({ searchQuery }: { searchQuery: string }) {
  const {page, setPage} = useStockPagination();
  const limit = 8; // Number of items per page
  const { data: products, isLoading } = useProducts({
    page,
    limit,
    search: { column: "title", value: searchQuery },
  }); // Fetching products
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
  if (isLoading) {
    return (
      <div className="mt-[10rem]">
        <Player
          className="m-auto"
          autoplay
          loop
          src="/AnimationLoading.json"
          style={{ height: "12rem", width: "12rem" }}
        />
      </div>
    );
  }
  // Ensure products are available before rendering the table
  if (!products?.data.length) {
    return <div>No products found</div>;
  }

  const tableData = products.data.map((product: any) => {
    const { stock, price, discount, wholesalePrice } = product;
    const validStock = stock || 0;
    const validPrice = price || 0;
    const validDiscount = discount || 0;
    const validWholesalePrice = wholesalePrice || 0;
    const income =
      validStock * (validPrice - validDiscount - validWholesalePrice);
    return {
      product: product.title, // Adjust according to your product object
      stock: validStock,
      wholesale_price: validWholesalePrice,
      price: validPrice,
      income: income,
    };
  });

  return (
    <div>
      <DataTable data={tableData} />
      <Pagination
        className="flex w-full justify-center mt-5"
        count={products?.meta.total_pages}
        page={page}
        boundaryCount={3}
        siblingCount={3}
        onChange={(e, value) => setPage(value)}
      />
    </div>
  );
}
