import Image from "next/image";
import React from "react";
import RecommendationSection from "./ui/RecommendationSection";
import ProductDetails from "./ui/ProductDetails";
import Policies from "./ui/Policies";
import BreadCrumbs from "./ui/BreadCrumbs";

export default function Page() {
  return (
    <div className="flex flex-col">
      <Image
        src={"/product/opsti-uslovi_header.jpg"}
        alt="logo"
        width={2000}
        height={2000}
        className="w-full"
      />
      <BreadCrumbs />
      <ProductDetails />
      <Policies />
      <RecommendationSection />
    </div>
  );
}
