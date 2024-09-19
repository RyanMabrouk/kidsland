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

export function Nav() {
  return (
    <nav className="mx-auto flex h-20 w-full flex-row items-center justify-evenly px-4 max-[830px]:justify-between max-[439px]:px-2 min-[830px]:max-w-[80rem]">
      <PhoneMenu />
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

function PhoneMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <IoMenu
        onClick={() => {
          setIsMenuOpen(true);
        }}
        className="hidden size-[2.5rem] cursor-pointer text-3xl max-[830px]:block"
      />
      {isMenuOpen && (
        <div className="fixed left-0 top-0 z-[100] flex h-screen w-screen flex-col justify-start bg-white">
          <div className="flex flex-row justify-between px-8 py-6">
            <Link href={"/home"}>
              <Image
                src="/logo/logo-2.png"
                alt="logo"
                width={60}
                height={60}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              />
            </Link>
            <IoMdClose
              className="size-8"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            />
          </div>
          <div className="mt-20 flex h-full flex-col items-center justify-start gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="cursor-pointer hover:font-semibold hover:text-color1"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
