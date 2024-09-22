"use client";
import Image from "next/image";
import React from "react";
import { NavbarItemsSubmenu } from "./NavbarItemsSubmenu";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import CartButton from "./CartButton";
import { menuItems } from "../../home/constants/menuItems";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Nav() {
  return (
    <nav className="mx-auto flex h-20 w-full flex-row items-center justify-evenly px-4 max-[830px]:justify-between max-[439px]:px-2 min-[830px]:max-w-[80rem]">
      <PhoneSheet />
      <Link href={"/home"}>
        <Image
          src="/logo/logo-2.png"
          alt="logo"
          width={60}
          height={60}
          className="py-3 max-[830px]:hidden"
        />
      </Link>
      <div className="flex h-full flex-row items-center justify-center gap-6 max-[830px]:hidden">
        {menuItems.map((item) => (
          <NavbarItemsSubmenu {...item} key={item.title} />
        ))}
      </div>
      <div className="flex flex-row items-center justify-evenly gap-12 max-[530px]:gap-2">
        <SearchBar />
        <span className="flex flex-row items-center justify-center gap-2">
          <UserMenu />
          <Link href="/Cart">
            <CartButton />
          </Link>
        </span>
      </div>
    </nav>
  );
}

function PhoneSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <IoMenu className="hidden size-[2.5rem] cursor-pointer text-3xl max-[830px]:block" />
      </SheetTrigger>
      <SheetContent
        className="z-[100] w-[20rem] p-0 max-[400px]:w-full"
        side={"left"}
      >
        <SheetHeader>
          <SheetTitle className="flex items-center justify-start p-6">
            <Link href={"/home"}>
              <Image
                src="/logo/logo-2.png"
                alt="logo"
                width={80}
                height={80}
                className="py-3"
              />
            </Link>
          </SheetTitle>
          <SheetDescription className="flex h-full flex-col items-start justify-start">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <SheetClose className="w-full" key={item.title}>
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex w-full min-w-max border-collapse cursor-pointer flex-row items-center gap-2 px-3 py-6 text-left text-2xl font-bold text-black hover:bg-color1 hover:font-semibold hover:text-white"
                  >
                    <Icon className="size-8" />
                    <span>{item.title}</span>
                  </Link>
                </SheetClose>
              );
            })}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
