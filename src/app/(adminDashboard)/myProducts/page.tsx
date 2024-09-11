"use client";
import Image from "next/image";
import { useState } from "react";
import Products from "./ui/products";
import {
  ProductsPaginationProvider,
  useProductsPagination,
} from "./context/useProductsPagination";

function ProductListPage() {
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const { page, setPage } = useProductsPagination(); // Using the pagination context

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    setPage(1); // Reset page to 1 when search query changes
  }

  return (
    <div className="mt-10 flex flex-col gap-6 px-5 pb-5 sm:px-10">
      <div className="flex flex-row items-center justify-center gap-3">
        <Image
          src="/home/icons/flower_yellow.png"
          alt=""
          height={15}
          width={15}
        />
        <div className="text-xl font-bold uppercase text-color5 sm:text-2xl">
          My products
        </div>
        <Image
          src="/home/icons/flower_yellow.png"
          alt=""
          height={15}
          width={15}
        />
      </div>
      <div className="flex max-w-full flex-row items-center gap-1 rounded-lg border-2 border-gray-200 px-2 sm:max-w-[40rem] lg:mx-auto">
        <Image
          src="/MagnifyingGlass.Png"
          alt="Search Icon"
          width={20}
          height={20}
        />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 focus:outline-none sm:w-96"
        />
      </div>

      <Products searchQuery={searchQuery} />
    </div>
  );
}

export default function Page() {
  return (
    <ProductsPaginationProvider>
      <ProductListPage />
    </ProductsPaginationProvider>
  );
}
