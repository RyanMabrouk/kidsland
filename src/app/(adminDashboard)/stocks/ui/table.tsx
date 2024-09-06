"use client";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useProducts from "@/hooks/data/products/useProducts";
import { productsQuery } from "@/hooks/data/products/productsQuery";
import { Player } from "@lottiefiles/react-lottie-player";
import DataTable from "./dataTable";
export default function Table({ searchQuery }: { searchQuery: string }) {
    const [page, setPage] = useState(1); // State to track the current page
    const limit = 8; // Number of items per page
    const { data: products, isLoading } = useProducts({ page, limit, search : {column :"title" , value: searchQuery} }); // Fetching products
    const queryClient = useQueryClient();
  
    useEffect(() => {
      if (products?.meta.has_next_page) {
        queryClient.prefetchQuery(
          productsQuery({
            page: page + 1,
            limit,
          })
        );
      }
    }, [page, products?.meta.has_next_page, queryClient]);
    if (isLoading) {
        return     <div className=" mt-[10rem]">
        <Player
          className="m-auto"
          autoplay
          loop
          src="/AnimationLoading.json"
          style={{ height: "20rem", width: "20rem" }}
        />
      </div>;
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
    const income = validStock * ((validPrice - validDiscount) - validWholesalePrice);
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
      <div className="flex justify-between mt-4">
        <button
          className=" w-[10rem] rounded border border-slate-700 bg-slate-100 p-2 px-3 font-bold text-slate-700 duration-300 ease-in-out hover:bg-slate-600 hover:text-slate-200"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))} // Go to the previous page
          disabled={page === 1} // Disable if on the first page
        >
          Previous
        </button>
        <button
          className=" w-[10rem] rounded border border-slate-700 bg-slate-100 p-2 px-3 font-bold text-slate-700 duration-300 ease-in-out hover:bg-slate-600 hover:text-slate-200"
          onClick={() => setPage((prev) => prev + 1)} // Go to the next page
          disabled={!products?.meta.has_next_page} // Disable if there is no next page
        >
          Next
        </button>
      </div>
    </div>
  )
}
