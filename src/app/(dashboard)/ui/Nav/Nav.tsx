"use client";
import Image from "next/image";
import React from "react";
import { NavbarItemsSubmenu } from "./NavbarItemsSubmenu";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import CartButton from "./CartButton";
import { menuItems } from "../../home/constants/menuItems";
import Link from "next/link";
import useTranslation from "@/translation/useTranslation";
import PhoneSheet from "./PhoneSheet";
import LanguageSwitcher from "./LanguageSwitch";
import useUser from "@/hooks/data/user/useUser";

export function Nav() {
  const { data: translation } = useTranslation();
  const { data: user } = useUser();
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
          <NavbarItemsSubmenu
            {...{
              ...item,
              title: translation?.lang[item.title] as string,
              subItems:
                item.subItems.length > 0
                  ? item.subItems.map((subItem) => ({
                      ...subItem,
                      title: translation?.lang[subItem.title] as string,
                    }))
                  : [],
            }}
            key={item.title}
          />
        ))}
      </div>
      <div className="flex flex-row items-center justify-evenly gap-12 max-[530px]:gap-2">
        <SearchBar />
        <span className="flex flex-row items-center justify-center gap-2">
          <LanguageSwitcher />
          <div className="flex flex-row items-center">
            {user?.data ? (
              <>
                <UserMenu />
                <Link href="/Cart">
                  <CartButton />
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className={`flex h-9 items-center justify-center rounded-lg border border-slate-700 bg-transparent px-3 py-2 text-center font-semibold text-slate-700 transition-all ease-linear hover:bg-slate-700 hover:text-white`}
              >
                Login
              </Link>
            )}
          </div>
        </span>
      </div>
    </nav>
  );
}
