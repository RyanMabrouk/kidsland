import React from "react";
import { Pagination, Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export default function CustomSwiper(
  props: SwiperProps & {
    slides: React.ReactNode[];
    setActiveIndex?: React.Dispatch<React.SetStateAction<number>>;
  },
) {
  return (
    <Swiper
      className="w-full"
      {...props}
      modules={[Virtual, Pagination, Navigation]}
      spaceBetween={props.spaceBetween ?? 25}
      slidesPerGroupSkip={props.slidesPerGroupSkip ?? 3}
      pagination={props.pagination ? { clickable: true } : false}
      onSwiper={(swiper) => {
        swiper.updateSize();
        swiper.update();
      }}
      onRealIndexChange={(element) =>
        props.setActiveIndex ? props.setActiveIndex(element.activeIndex) : null
      }
    >
      {props.slides?.map((slide: any, index: number) => (
        <SwiperSlide key={"slide" + index} className="h-min w-min">
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
