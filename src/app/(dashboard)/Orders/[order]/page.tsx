import React from "react";
import Content from "./ui/Content";

export default function page({ params }: { params: { order: string } }) {
  const { order: id } = params;

  return (
    <div className="min-h-screen w-full">
      <Content id={id} />
    </div>
  );
}
