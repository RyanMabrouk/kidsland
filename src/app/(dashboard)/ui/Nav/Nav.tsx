"use client";
import Image from "next/image";
import React from "react";
import { NavbarItemsSubmenu } from "./NavbarItemsSubmenu";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import CartButton from "./CartButton";
import { menuItems } from "../../home/constants/menuItems";
import Link from "next/link";

export function Nav() {
  return (
    <nav className="px-auto mx-auto flex h-20 w-full max-w-[80rem] flex-row items-center justify-evenly">
      <Link href={"/home"}>
        <Image
          src="/logo/logo-2.png"
          alt="logo"
          width={60}
          height={60}
          className="py-3"
        />
      </Link>
      <div className="flex h-full flex-row items-center justify-center gap-6">
        {menuItems.map((item) => (
          <NavbarItemsSubmenu {...item} key={item.title} />
        ))}
      </div>
      <div className="flex flex-row items-center justify-center gap-12">
        <SearchBar />
        <span className="flex flex-row items-center justify-center gap-2">
          <UserMenu />
          <CartButton />
        </span>
      </div>
    </nav>
  );
}
