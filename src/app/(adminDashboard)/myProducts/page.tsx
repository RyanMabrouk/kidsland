"use client";
import Image from "next/image";
import { useState } from "react";
import Products from "./ui/products";
import { ProductsPaginationProvider, useProductsPagination } from "./context/useProductsPagination";

function ProductListPage() {
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const { page, setPage } = useProductsPagination(); // Using the pagination context

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    setPage(1); // Reset page to 1 when search query changes
  }

  return (
    <div className="mt-20 pb-5 flex flex-col gap-12">
      <div className="flex flex-row items-center justify-center gap-3">
        <Image
          src="/home/icons/flower_yellow.png"
          alt=""
          height={15}
          width={15}
        />
        <div className="text-2xl font-bold uppercase text-color5">
          My products
        </div>
        <Image
          src="/home/icons/flower_yellow.png"
          alt=""
          height={15}
          width={15}
        />
      </div>
      <div className="flex flex-row gap-1 items-center border-gray-200 border-2 px-2 w-[40rem] m-auto">
        <Image src="/MagnifyingGlass.Png" alt="Search Icon" width={20} height={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-96 p-3 hover:border-none focus:outline-none"
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
