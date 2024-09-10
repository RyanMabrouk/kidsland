"use client" ;
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaBitbucket, FaGamepad,FaJediOrder,FaMailBulk,FaMoneyBillWave, FaPlusCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { PhoneSideBar } from "./phoneSideBar";
import { FaLetterboxd, FaSquareLetterboxd } from "react-icons/fa6";

export default function SideBar() {
  const [isLoading, setIsLoading] = useState(false);
  const Pathname= usePathname();

  return (
    <>
     <div className="hidden md:flex md:flex-col w-[17rem] bg-slate-900 ">
      <div className="p-3">
      <Link href={"/home"}>
        <Image
          src="/logo/logo-2.png"
          alt="logo"
          width={60}
          height={60}
          className=""
        />
      </Link>
      </div>
      <div className="border-t-[1px] border-gray-500"></div>
      <ul className="py-6 ">
        <Link href={"/addProduct"}>
        <li
          className={`px-4 flex gap-2 items-center py-3 cursor-pointer ${
            Pathname.includes("addProduct")
              ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
              : "text-gray-500"
          }`}
        >
          <FaPlusCircle className="text-xl" />  
          <span className="text-lg">Create New Product</span>
        </li>
        </Link>
        <Link href={"/myProducts"}>
        <li
          className={`px-4 flex gap-2 items-center py-3 cursor-pointer ${
            Pathname.includes("myProducts")
              ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
              : "text-gray-500"
          }`}
        >
          <FaGamepad className="text-2xl" />
          <span className="text-lg">My Products</span>
        </li></Link>
       
        <Link href={"/earnings"}>
        <li
          className={`px-4 flex gap-2 items-center py-3 cursor-pointer ${
            Pathname.includes("earnings")
            ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
              : "text-gray-500"
          }`}
        >

          <FaMoneyBillWave className="text-2xl" />
          <span className="text-lg">Earnings</span>
        </li>
        </Link>
        <Link href={"/stocks"}>
        <li
          className={`px-4 flex gap-2 items-center py-3 cursor-pointer ${
            Pathname.includes("stocks")
             ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
              : "text-gray-500"       }`} 
        >
          <FaBitbucket className="text-xl" />
          <span className="text-lg">Stocks</span>
        </li>
        </Link>
        <Link href={"/orders"}>
        <li
          className={`px-4 flex gap-2 items-center py-3 cursor-pointer ${
            Pathname.includes("orders")
             ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
              : "text-gray-500"       }`} 
        >
          <FaMailBulk className="text-xl" />
          <span className="text-lg">Orders</span>
        </li>
        </Link>
      </ul>
    </div>
    <PhoneSideBar/>

    </>
   
  );
}
