"use client";
import TooltipGeneric from "@/app/ui/InsightGeneric";

import useCart from "@/hooks/data/cart/useCart";
import { IconButton } from "@mui/material";
import { IoMdCart } from "react-icons/io";
export default function CartButton() {
  const { data: cart } = useCart();
  return (
    <TooltipGeneric tip="Cart" position="bottom">
      <IconButton size="small" aria-haspopup="true" className="relative">
        <IoMdCart className="size-8 text-gray-500" />
        {!!cart?.data?.length && (
          <span className="absolute -right-0 top-0 rounded-full bg-color1 px-1.5 text-[0.75rem] text-white">
            {cart?.data?.length}
          </span>
        )}
      </IconButton>
    </TooltipGeneric>
  );
}
