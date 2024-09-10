"use client" ;
import React, { useState } from 'react'
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { OrdersPaginationProvider, useOrdersPagination } from './context/useOrdersPagination';
import Orders from './ui/orders';

function ProductListPage() {
  const { date } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const { page, setPage } = useOrdersPagination(); // Using the pagination context

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    setPage(1); // Reset page to 1 when search query changes
  }

  return (
    <div className="mt-20 pb-5 flex flex-col gap-10 w-[50rem] m-auto">
      <div className="flex flex-row items-center justify-center gap-3">
        <Image
          src="/home/icons/flower_yellow.png"
          alt=""
          height={15}
          width={15}
        />
        <div className="text-xl sm:text-2xl font-bold uppercase text-color5">
        { date } Orders
        </div>
        <Image
          src="/home/icons/flower_yellow.png"
          alt=""
          height={15}
          width={15}
        />
      </div>
      <div className=" flex flex-row gap-1 items-center border-gray-200 border-2 px-2 max-w-full sm:max-w-[40rem] lg:mx-auto">
        <Image src="/MagnifyingGlass.Png" alt="Search Icon" width={20} height={20} />
        <input
          type="text"
          placeholder="Search Orders..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full sm:w-96 p-2 focus:outline-none"
        />
      </div>

      <Orders searchQuery={searchQuery} />
    </div>
  );
}

export default function Page() {
  return (
    <OrdersPaginationProvider>
      <ProductListPage />
    </OrdersPaginationProvider>
  );
}
