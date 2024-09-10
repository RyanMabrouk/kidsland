"use client"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBitbucket, FaGamepad, FaMailBulk, FaMoneyBillWave, FaPlusCircle } from "react-icons/fa";

export function PhoneSideBar() {
  const Pathname= usePathname();
  return (
    <div className=" sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <div className="py-4 flex items-center">
            <Menu className="text-slate-900 cursor-pointer" />
          </div>
        </SheetTrigger>
        <SheetContent side={"left"} className="w-[12rem] bg-slate-900">
          <SheetHeader>
          </SheetHeader>
          <div className="">
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
          <ul className="py-4 text-xs">
            <Link href={"/addProduct"}>
            <li
              className={` flex gap-2 items-center py-3 cursor-pointer ${
                Pathname.includes("addProduct")
                  ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
                  : "text-gray-500"
              }`}
            >
              <FaPlusCircle className="text-xl" />  
              <span className="">Create New Product</span>
            </li>
            </Link>
            <Link href={"/myProducts"}>
            <li
              className={` flex gap-2 items-center py-3 cursor-pointer ${
                Pathname.includes("myProducts")
                  ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
                  : "text-gray-500"
              }`}
            >
              <FaGamepad className="text-2xl" />
              <span className="">My Products</span>
            </li></Link>
          
            <Link href={"/earnings"}>
            <li
              className={` flex gap-2 items-center py-3 cursor-pointer ${
                Pathname.includes("earnings")
                ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
                  : "text-gray-500"
              }`}
            >

              <FaMoneyBillWave className="text-2xl" />
              <span className="">Earnings</span>
            </li>
            </Link>
            <Link href={"/stocks"}>
            <li
              className={` flex gap-2 items-center py-3 cursor-pointer ${
                Pathname.includes("stocks")
                ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
                  : "text-gray-500"       }`} 
            >
              <FaBitbucket className="text-xl" />
              <span className="">Stocks</span>
            </li>
            </Link>
            <Link href={"/orders"}>
              <li
                className={`flex gap-2 items-center py-3 cursor-pointer ${
                  Pathname.includes("orders")
                  ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
                    : "text-gray-500"       }`} 
              >
                <FaMailBulk className="text-xl" />
                <span className="">Orders</span>
              </li>
            </Link>
          </ul>
          
          <SheetFooter>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
