"use client";
import useChangeQuantity from "@/hooks/data/cart/changeQuantity";
import useDeleteFromCart from "@/hooks/data/cart/deleteFromCart";
import { IProduct } from "@/types/database.tables.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CartItem({
  product,
  quantity,
}: {
  product: IProduct | null;
  quantity: number;
}) {
  const { mutate: change } = useChangeQuantity(product);
  const { mutate: remove } = useDeleteFromCart(product);

  return (
    <div className="w-[95%] border-2 border-solid transition-all duration-200 hover:w-[97%] hover:shadow-md max-[480px]:w-full">
      <Link
        className="flex cursor-pointer items-center justify-between"
        href={`/products/${product?.id}`}
      >
        <div className="flex w-full gap-2 max-[390px]:gap-1 sm:flex-row md:flex-col md:items-center lg:flex-row">
          <Image
            src={product?.image_url ?? ""}
            alt="item_img"
            className="h-[7rem] w-[7rem] p-3 max-[390px]:p-0 md:h-[14rem] md:w-[14rem] lg:h-[7rem] lg:w-[7rem]"
            width={500}
            height={500}
          />
          <div className="flex flex-1 justify-between md:w-full md:px-5 lg:px-0">
            <div className="max-[390px]:max pt-7">
              <div
                className={`line-clamp-1 ${product?.available ?? "text-red-600"}`}
              >
                {product?.title}
              </div>
              <div
                className={`${product?.available ? "text-green-500" : "text-color1"}`}
              >
                {product?.available ? "" : "Not"} Available
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-3 max-[520px]:text-sm">
              <div className="text-right">
                {product?.price_after_discount.toFixed(2)}
                TND
              </div>
              {!!product?.discount && product.discount > 0 && (
                <div className="flex items-center gap-2">
                  <div className="min-w-max text-gray-600 line-through">
                    {product.price} TND
                  </div>
                  <div className="min-w-max bg-red-100 p-1 text-red-600">
                    {product.discount} %
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
      <hr />
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => remove()}
          className="min-w-[6rem] rounded-xl border-2 bg-color1 p-2 text-white transition-all duration-300 hover:border-color1 hover:bg-white hover:text-color1"
        >
          Delete
        </button>
        <div className="flex gap-7">
          <button
            className="h-[2rem] w-[2rem] rounded-md bg-red-100 text-center"
            onClick={() => change(quantity - 1)}
          >
            -
          </button>
          <div>{quantity}</div>
          <button
            className="h-[2rem] w-[2rem] rounded-md bg-red-100 text-center"
            onClick={() => change(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
