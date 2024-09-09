"use client";
import TooltipGeneric from "@/app/ui/InsightGeneric";
import { IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import { IoMdCart } from "react-icons/io";
export default function CartButton() {
  return (
    <TooltipGeneric tip="Cart" position="bottom">
      <IconButton size="small" aria-haspopup="true">
        <Link href="Cart">
          <IoMdCart className="size-8 text-gray-500" />
        </Link>
      </IconButton>
    </TooltipGeneric>
  );
}
