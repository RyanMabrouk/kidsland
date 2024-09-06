"use client";
import Image from "next/image";
import { useState } from "react";
import Products from "./ui/products";


export default function Page() {
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
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
          our products
        </div>
        <Image
          src="/home/icons/flower_yellow.png"
          alt=""
          height={15}
          width={15}
        />
      </div>
      <div className="flex flex-row gap-1 items-center border-gray-200 border-2 px-2 w-[40rem] m-auto" >
            <Image
              src="/MagnifyingGlass.Png"
              alt="aaa"
              width={20}
              height={20}
            />

          <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-96 p-3 hover:border-none focus:outline-none"        />
      </div>     

      <Products searchQuery={searchQuery} /> 

    </div>
  );
}
