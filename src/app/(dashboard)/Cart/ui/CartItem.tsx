import handleDeleteCartItem from "@/api/Cart/handleDeleteCartItem";
import handleProductQuantity from "@/api/Cart/handleProductQuantity";
import { IProduct } from "@/types/database.tables.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useOptimistic, useState } from "react";

export default function CartItem({
  product,
  quantity,
  filter,
}: {
  product: IProduct;
  quantity: number;
  filter: string;
}) {
  const queryClient = useQueryClient();
  const { mutate: change } = useMutation({
    mutationFn: async (quantity: number) => {
      return await handleProductQuantity(product.id, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => alert(error.message),
  });
  const { mutate: Delete } = useMutation({
    mutationFn: async () => await handleDeleteCartItem(product.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => alert(error.message),
  });

  return (
    <div className="color w-[95%] border-2 border-solid transition-all duration-200 hover:w-[97%] hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <img
            src={product.image_url ?? ""}
            alt="item_img"
            className="h-[7rem] w-[7rem] p-3"
          />
          <div className="pt-7">
            <div className={`${product.available || "text-red-600"}`}>
              {product.title}
            </div>
            {product.available ? (
              <div>Available</div>
            ) : (
              <div className="text-gray-500">Not Available</div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 p-3">
          <div className="text-right">
            {Math.round(product.price_after_discount * 100) / 100} TND
          </div>
          {product.discount > 0 && (
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
          onClick={() => Delete()}
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
