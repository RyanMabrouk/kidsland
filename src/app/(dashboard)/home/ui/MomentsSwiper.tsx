"use client";
import { LiaBabyCarriageSolid } from "react-icons/lia";
import Link from "next/link";
import { PiBaby } from "react-icons/pi";
import { GiBalloons, GiClothes, GiSpiralLollipop } from "react-icons/gi";
import CustomSwiper from "@/app/ui/swiper";
export default function MomentsSwiper() {
  const moments = [
    {
      title: "Wedding",
      icon: <GiBalloons className="size-[6rem] font-thin text-red-900" />,
      bg: "bg-color1",
      text: "",
    },
    {
      title: "Celebrations & Birthdays",
      icon: <PiBaby className="size-[6rem] font-thin text-cyan-900" />,
      bg: "bg-color2",
      text: "text-color2",
    },
    {
      title: "Graduation",
      icon: (
        <LiaBabyCarriageSolid className="size-[6rem] font-thin text-sky-900" />
      ),
      bg: "bg-color3",
      text: "text-color3",
    },
    {
      title: "Anniversary",
      icon: <GiClothes className="size-[6rem] font-thin text-rose-900" />,
      bg: "bg-color4",
      text: "text-color4",
    },
    {
      title: "Baby Shower",
      icon: (
        <LiaBabyCarriageSolid className="size-[6rem] font-thin text-yellow-900" />
      ),
      bg: "bg-color5",
      text: "text-color5",
    },
    {
      title: "House Warming",
      icon: (
        <GiSpiralLollipop className="size-[6rem] font-thin text-blue-900" />
      ),
      bg: "bg-color6",
      text: "text-color6",
    },
  ];
  return (
    <div className="flex w-full flex-col gap-6 bg-gray-100 px-4 pb-10 pt-6 text-center">
      <span className="text-[2rem] font-semibold text-slate-800">
        Every moment is important. Choose your own!
      </span>
      <div className="mx-auto max-w-[75rem]">
        <CustomSwiper
          slidesPerView={4}
          spaceBetween={15}
          loop
          autoplay
          slides={moments.map((e, i) => (
            <div
              key={i}
              className={`flex h-[8rem] max-w-[18rem] flex-row items-center justify-center gap-4 rounded-lg ${e.bg} p-6`}
            >
              <span className="text-lg font-bold text-white">{e.title}</span>
              {e.icon}
            </div>
          ))}
        />
      </div>
    </div>
  );
}
