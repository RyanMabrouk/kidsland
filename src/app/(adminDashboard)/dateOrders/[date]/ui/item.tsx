"use client";
import getProductTitleAndWholesalePrice from '@/api/products/getProductTitleAndWholesalePrice';
import { Tables } from '@/types/database.types';
import { Player } from '@lottiefiles/react-lottie-player';
import React, { useState, useEffect } from 'react';

export default function Item({ item }: { item: Tables<"order_products"> }) {
  const [title, setTitle] = useState<string | null>(null);
  const [wholesalePrice, setWholesalePrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { title, wholesalePrice } = await getProductTitleAndWholesalePrice(item.product_id);
        setTitle(title);
        setWholesalePrice(wholesalePrice);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [item.product_id]);

  const price = item.price_before_discount - item.discount;

  return (
    <>
      {title === null ? (
        <div className="flex justify-center items-center">
          <Player
            className="m-auto"
            autoplay
            loop
            src="/AnimationLoading.json"
            style={{ height: "5rem", width: "5rem" }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-2 text-sm text-slate-500">
          <div className='col-span-3'>
            {title} * {item.quantity}
          </div>
          <div>{price}</div>
          <div>{price - (item.quantity * (wholesalePrice || 0))}</div>
        </div>
      )}
    </>
  );
}
