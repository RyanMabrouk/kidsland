"use client";
import { IoMenu } from "react-icons/io5";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { menuItems } from "../../home/constants/menuItems";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "@/translation/useTranslation";
export default function PhoneSheet() {
  const { data: translation } = useTranslation();
  return (
    <Sheet>
      <SheetTrigger>
        <IoMenu className="hidden size-[2.5rem] cursor-pointer text-3xl max-[830px]:block" />
      </SheetTrigger>
      <SheetContent
        className="z-[100] w-[75%] xs:w-[15rem] p-0 sm:w-[18rem] "
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
                    className="flex w-full min-w-max border-collapse cursor-pointer flex-row items-center gap-2 px-3 py-6 text-left text-base xs:text-lg sm:text-xl font-bold text-black hover:bg-color1 hover:font-semibold hover:text-white"
                  >
                    <Icon className="size-8" />
                    <span>{translation?.lang[item.title]}</span>
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
