import React from "react";
import { OffersContainer } from "./ui/Offers/Offers";
import MomentsSwiper from "./ui/MomentsSwiper";
import HomeSwiper from "./ui/HomeSwiper";
import { ProductsSection } from "./ui/ProductsSection/ProductsSection";

export default function Page() {
  return (
    <div className="flex min-h-screen w-screen flex-col overflow-x-hidden">
      <hr />
      <HomeSwiper />
      <MomentsSwiper />
      <OffersContainer />
      <ProductsSection />
    </div>
  );
}
