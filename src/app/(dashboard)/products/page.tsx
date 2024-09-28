import Image from "next/image";
import React, { Suspense } from "react";
import BreadCrumbs from "./[productId]/ui/BreadCrumbs";
import Content from "./ui/Content";
import { Spinner } from "@/app/ui/Spinner";

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
      <Suspense fallback={<Spinner />}>
        <Content />
      </Suspense>
    </div>
  );
}

export default Page;
