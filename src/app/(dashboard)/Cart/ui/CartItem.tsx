import useChangeQuantity from "@/hooks/data/cart/changeQuantity";
import useDeleteCartItem from "@/hooks/data/cart/deleteCartItem";
import { IProduct } from "@/types/database.tables.types";
import Image from "next/image";
import React from "react";

export default function CartItem({
  product,
  quantity,
}: {
  product: IProduct | null;
  quantity: number;
}) {
  const { mutate: change } = useChangeQuantity(product);
  const { mutate: remove } = useDeleteCartItem(product);

  return (
    <div className="color w-[95%] border-2 border-solid transition-all duration-200 hover:w-[97%] hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Image
            src={product?.image_url ?? ""}
            alt="item_img"
            className="h-[7rem] w-[7rem] p-3"
            width={500}
            height={500}
          />
          <div className="pt-7">
            <div className={`${product?.available ?? "text-red-600"}`}>
              {product?.title}
            </div>
            {product?.available ? (
              <div>Available</div>
            ) : (
              <div className="text-gray-500">Not Available</div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 p-3">
          <div className="text-right">
            {Math.round((product?.price_after_discount ?? 0) * 100) / 100} TND
          </div>
          {product?.discount && product.discount > 0 && (
            <div className="flex items-center gap-2">
              <div className="text-gray-600 line-through">
                {product.price} TND
              </div>
              <div className="text-oran bg-red-100 p-1 text-red-600">
                {product.discount} %
              </div>
            </div>
          )}
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => remove()}
          className="min-w-[6rem] rounded-xl border-2 bg-red-700 p-2 text-white transition-all duration-300 hover:border-red-700 hover:bg-white hover:text-red-700"
        >
          Delete
        </button>
        <div className="flex gap-7">
          <button
            className="h-[2rem] w-[2rem] bg-red-100 text-center"
            onClick={() => change(quantity - 1)}
          >
            -
          </button>
          <div>{quantity}</div>
          <button
            className="h-[2rem] w-[2rem] bg-red-100 text-center"
            onClick={() => change(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
