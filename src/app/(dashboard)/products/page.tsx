import Image from "next/image";
import React from "react";
import BreadCrumbs from "./[productId]/ui/BreadCrumbs";
import { ProductsFilterProvider } from "./context/ProductsFilterContext";
import Content from "./ui/Content";

function Page() {
  return (
    <div className="mb-20 flex flex-col">
      <Image
        src={"/product/igracke_header.jpg"}
        alt="logo"
        width={2000}
        height={2000}
        className="w-full"
      />
      <BreadCrumbs />
      <ProductsFilterProvider>
        <Content />
      </ProductsFilterProvider>
    </div>
  );
}

export default Page;
