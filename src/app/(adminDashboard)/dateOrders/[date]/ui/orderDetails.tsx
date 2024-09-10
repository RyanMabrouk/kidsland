"use client";
import useOrdersById from '@/hooks/data/orders/useOrderById';
import React, { useEffect, useState } from 'react';
import Item from './item';
import { Player } from '@lottiefiles/react-lottie-player';

export default function OrderDetails({ orderId, order_total_Price,order_wholesale_price }: { orderId: number; order_total_Price: number; order_wholesale_price: number}) {
  const { data: orderDetails, isPending } = useOrdersById(orderId);
  return (
    <div className='flex flex-col gap-4 mt-5'>
      <div className='grid grid-cols-5 gap-2 text-slate-700 font-semibold'>
        <div className='col-span-3'>Product</div>
        <div>Price</div>
        <div>Income</div>
      </div>

      {isPending? (
        <div className="flex justify-center items-center">
          <Player
            className="m-auto"
            autoplay
            loop
            src="/AnimationLoading.json"
            style={{ height: "10rem", width: "10rem" }}
          />
        </div>
      ) : (
        <>
          <div className='flex flex-col gap-2'>
            {orderDetails?.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </div>

          <div className='flex gap-5'>
            <div className='flex gap-2 items-center'>
              <span>Total Price: </span>
              <div className='text-sm'>{order_total_Price}</div>
            </div>

            <div className='flex gap-2 items-center'>
              <span>Total Income: </span>
              <div className='text-sm'>{order_total_Price - order_wholesale_price}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
