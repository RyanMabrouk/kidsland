import { OrderProduct } from "@/hooks/data/orders/OrderByIdQuery";
import { formatProduct } from "@/hooks/data/products/formatProducts";
import Image from "next/image";
import React from "react";

export default function OrderItem({ item }: { item: OrderProduct }) {
  const formattedProduct = formatProduct(item.products, {
    cart: [],
    wishlist: [],
  });
  return (
    <div className="ite flex items-center rounded-md bg-white p-4 transition-all duration-200 hover:shadow-lg">
      <Image
        src={formattedProduct?.image_url ?? ""}
        alt="img"
        width={150}
        className="rounded-md max-sm:w-[6rem]"
        height={150}
      />
      <div className="flex w-full flex-col gap-2 p-4">
        <div className="flex w-full flex-1 justify-between">
          <h1 className="text-lg">x {item.quantity}</h1>
          <div className="flex gap-2">
            <h1 className="font-semibold">
              Total price :{" "}
              {(formattedProduct?.price_after_discount ?? 0) * item.quantity}
            </h1>
            <h1 className="font-semibold text-gray-500 line-through">
              {(formattedProduct?.price ?? 0) * item.quantity}
            </h1>
          </div>
        </div>
        <h1 className="font-semibold">{formattedProduct?.title}</h1>
        <h1 className="text-sm text-gray-600">
          Total price : {formattedProduct?.description}
        </h1>
        {formattedProduct && (
          <h1 className="w-fit rounded-lg bg-pink-100 p-2 text-sm font-semibold text-color1">
            {formattedProduct?.subtitle}
          </h1>
        )}
      </div>
    </div>
  );
}
