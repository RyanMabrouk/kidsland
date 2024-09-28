import Image from "next/image";
import React from "react";
import BreadCrumbs from "./[productId]/ui/BreadCrumbs";
import dynamic from "next/dynamic";
const ClientSideContent = dynamic(() => import("./ui/Content"), {
  ssr: false, // Ensure the component is only rendered on the client side
});
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
      <ClientSideContent />
    </div>
  );
}

export default Page;
