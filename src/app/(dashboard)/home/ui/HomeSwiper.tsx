"use client";
import CustomSwiper from "@/app/ui/Swiper";
import Image from "next/image";

export default function HomeSwiper() {
  return (
    <div className="[&_.swiper-pagination-bullet-active]:bg-color1">
      <CustomSwiper
        slides={Array.from({ length: 4 }).map((_, i) => (
          <Image
            key={i}
            src={`/home/banners/banner-${i + 1}.jpg`}
            alt=""
            width={1920}
            height={1000}
            className="w-full object-cover h-[50vh]"
          />
        ))}
        initialSlide={0}
        slidesPerView={1}
        pagination
        loop
        allowTouchMove
        speed={1500}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
      />
    </div>
  );
}
