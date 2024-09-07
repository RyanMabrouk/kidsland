import { cn } from "@/lib/utils";
import React from "react";

export default function PrimaryButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "rounded-full border-2 border-[#153963] bg-[#153963] px-9 py-2 font-semibold text-white transition-all ease-in-out hover:bg-white hover:text-[#153963] hover:shadow-lg",
        className,
      )}
    >
      {children}
    </button>
  );
}
