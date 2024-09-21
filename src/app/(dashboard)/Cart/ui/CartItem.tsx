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
    /*     <div className="color w-[95%] border-2 border-solid bg-white transition-all duration-200 hover:shadow-md md:hover:w-[97%]">
      <div className="border-1 flex items-center justify-between sm:flex-col md:flex-row">
        <Image
          src={product?.image_url ?? ""}
          alt="item_img"
          className="p-3 sm:h-[13rem] sm:w-[90%] md:h-[7rem] md:w-[7rem]"
          width={500}
          height={500}
        />
        <div className="flex flex-1 items-start justify-between sm:w-[90%] sm:px-5 md:w-fit md:px-0">
          <div className="flex flex-col justify-between pt-3"> */
    <div className="w-[95%] border-2 border-solid transition-all duration-200 hover:w-[97%] hover:shadow-md">
      <Link
        className="flex cursor-pointer items-center justify-between"
        href={`/products/${product?.id}`}
      >
        <div className="flex w-full gap-2 sm:flex-row md:flex-col md:items-center lg:flex-row">
          <Image
            src={product?.image_url ?? ""}
            alt="item_img"
            className="h-[7rem] w-[7rem] p-3 md:h-[14rem] md:w-[14rem] lg:h-[7rem] lg:w-[7rem]"
            width={500}
            height={500}
          />
          <div className="flex flex-1 justify-between md:w-full md:px-5 lg:px-0">
            <div className="pt-7">
              {/* stop */}
              <div className={`${product?.available ?? "text-red-600"}`}>
                {product?.title}
              </div>
              <div className={`${product?.available || "text-gray-500"}`}>
                {product?.available || "Not"} Available
              </div>
            </div>
            <div className="flex flex-col gap-2 p-3">
              <div className="text-right">
                {product?.price_after_discount.toFixed(2)}
                TND
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
