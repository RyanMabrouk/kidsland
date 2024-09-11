"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  OrdersPaginationProvider,
  useOrdersPagination,
} from "./context/useOrdersPagination";
import Orders from "./ui/orders";
import AddOrder from "./ui/addOrder";

function ProductListPage() {
  const { date } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const { page, setPage } = useOrdersPagination(); // Using the pagination context

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    setPage(1); // Reset page to 1 when search query changes
  }

  return (
    <div className="m-auto mt-20 flex w-[50rem] flex-col gap-10 pb-5">
      <div className="flex flex-row items-center justify-center gap-3">
        <Image
          src="/home/icons/flower_yellow.png"
          alt=""
          height={15}
          width={15}
        />
        <div className="text-xl font-bold uppercase text-color5 sm:text-2xl">
          {date} Orders
        </div>
        <Image
          src="/home/icons/flower_yellow.png"
          alt=""
          height={15}
          width={15}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex max-w-full flex-row items-center gap-1 rounded-lg border-2 border-gray-200 px-2 sm:max-w-[40rem] ">
          <Image
            src="/MagnifyingGlass.Png"
            alt="Search Icon"
            width={20}
            height={20}
          />
          <input
            type="text"
            placeholder="Search Orders..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 focus:outline-none sm:w-96"
          />
        </div>
        <AddOrder/>
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
