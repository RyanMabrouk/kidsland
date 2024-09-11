"use client";
import Product from "@/app/(dashboard)/home/ui/ProductsSection/Product";
import CustomSwiper from "@/app/ui/swiper";
import useProducts from "@/hooks/data/products/useProducts";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function RecommendationSection() {
  const limit = 12;
  const page = 1;
  const { data: products } = useProducts({ page, limit });
  return (
    <div className="mt-20 flex flex-col gap-12">
      <div className="flex flex-row items-center justify-center gap-3">
        <Image
          src="/home/icons/blue-flower.png"
          alt=""
          height={15}
          width={15}
        />
        <div className="text-2xl font-bold uppercase text-slate-700">
          We recommend
        </div>
        <Image
          src="/home/icons/blue-flower.png"
          alt=""
          height={15}
          width={15}
        />
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="relative ml-12 max-w-[75rem]">
          <MdKeyboardArrowRight className="btn_swiper_arrow_left absolute -left-[3.5rem] top-[35%] z-20 size-[3.5rem] rotate-180 cursor-pointer text-slate-700" />
          <MdKeyboardArrowRight className="btn_swiper_arrow_right absolute -right-0 top-[35%] z-20 size-[3.5rem] cursor-pointer text-slate-700" />
          <CustomSwiper
            loop
            allowTouchMove
            autoplay
            spaceBetween={0}
            navigation={{
              prevEl: ".btn_swiper_arrow_left",
              nextEl: ".btn_swiper_arrow_right",
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1300: {
                slidesPerView: 4,
              },
            }}
            slides={
              products?.data?.map((product, key) => (
                <Product key={key} {...product} />
              )) ?? []
            }
          />
        </div>
      </div>
    </div>
  );
}
