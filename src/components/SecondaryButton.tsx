import { cn } from "@/lib/utils";
import React from "react";

export default function SecondaryButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border-2 border-[#153963] bg-white px-9 py-2 font-semibold text-[#153963] transition-all ease-in-out hover:bg-[#153963] hover:text-white hover:shadow-lg focus:outline-none focus:ring-[#153963]",
        className,
      )}
    >
      {children}
    </button>
  );
}
