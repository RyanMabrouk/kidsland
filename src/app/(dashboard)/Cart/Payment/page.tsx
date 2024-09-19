import React from "react";
import Content from "./ui/Content";

export default function Page() {
  return (
    <div className="flex items-center justify-center bg-gray-50 sm:bg-yellow-100 md:bg-orange-100 lg:bg-red-100 xl:bg-purple-100">
      <Content />
    </div>
  );
}
