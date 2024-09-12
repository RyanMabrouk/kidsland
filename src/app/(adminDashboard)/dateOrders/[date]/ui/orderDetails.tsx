"use client";
import useOrdersById from '@/hooks/data/orders/useOrderById';
import React, { useEffect, useState } from 'react';
import Item from './item';
import { Player } from '@lottiefiles/react-lottie-player';
import { Enums } from '@/types/database.types';

export default function OrderDetails({ orderId, order_total_Price,order_wholesale_price , client , status }: { orderId: number; order_total_Price: number; order_wholesale_price: number ; client: string | null; status: Enums<"status_type_enum">}) {
  const { data: orderDetails, isPending } = useOrdersById(orderId);
  const getStatusTextColor = () => {
    switch (status) {
      case "pending":
        return "text-color5";  // Customize the class based on your design
      case "fulfilled":
        return "text-green-600";
      case "cancelled":
        return "text-color1";
      default:
        return "text-gray-500"; // Default text color when nothing is selected
    }
  };
  return (
    <div className='flex flex-col gap-2 mt-5'>
      <div className='flex justify-between w-[50%]'>
        <div className='flex gap-2'>
          <div className='text-sm'>Client Name:</div>
          <div className='font-semibold' >{client?.toUpperCase()}</div>
        </div>
        <div className='flex gap-2'>
          <div className='text-sm'>
            Order Status:
          </div>
          <div className={`className='font-semibold' ${getStatusTextColor()}`}>{status.toUpperCase()}</div>
        </div>
      </div>
      <div className='grid grid-cols-8 gap-2 text-color1 font-semibold'>
        <div className='col-span-2'>Product</div>
        <div className='text-center'>Quantity</div>
        <div className='text-center'>unit Price</div>
        <div className='col-span-2 text-center'>Unit WholesalePrice</div>
        <div className='text-center'>Total Price</div>
        <div className='text-center'>Income</div>
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

          <div className='flex gap-5 text-lg text-slate-900 mt-5'>
            <div className='flex gap-2 items-center'>
              <span className='text-sm '>Total Price: </span>
              <div className=' font-bold'>{order_total_Price}</div>
            </div>

            <div className='flex gap-2 items-center'>
              <span className='text-sm ' >Total Income: </span>
              <div className=' font-bold '>{order_total_Price - order_wholesale_price}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
