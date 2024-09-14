"use client";
import useOrdersById from '@/hooks/data/orders/useOrderById';
import React, { useEffect, useState } from 'react';
import Item from './item';
import { Player } from '@lottiefiles/react-lottie-player';
import { Enums, Tables } from '@/types/database.types';

export default function OrderDetails({ order }: { order : Tables<"orders"> }) {
  const { data: orderDetails, isPending } = useOrdersById(order.id);
  const client=order.first_name + " " + order.last_name;
  const address = order.region + ", " + order.city + ", " + order.additional_info;

  return (
    <div className='flex flex-col gap-5 mt-5'>
      <div>
        <div className='text-lg font-bold text-color2 mb-4'>User Information</div>
        <div className=' grid grid-cols-2 gap-2 items-center'>
          <div className='flex gap-2 items-center'>
            <div className='text-sm'>Client Name:</div>
            <div className='font-semibold' >{client?.toUpperCase()}</div>
          </div>
          <div className='flex gap-2 items-center'>
            <div className='text-sm'>
              Phone:
            </div>
            <div className="font-semibold">{order.phone_number}</div>
          </div>
          <div className='flex gap-2 items-center'>
            <div className='text-sm'>
              Email:
            </div>
            <div className="font-semibold">{order.address}</div>
          </div>
          <div className='flex gap-2 items-center'>
            <div className='text-sm'>
              Address:
            </div>
            <div className="font-semibold">{address}</div>
          </div>
        </div>
      </div>
      
      <div className='flex flex-col gap-2'>
        <div className='text-lg font-bold text-color2 mb-1'>Order Content</div>
          <div className='grid grid-cols-8 gap-2 text-color3 font-semibold'>
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
              <div
                className={`flex flex-col gap-2 ${
                  orderDetails && orderDetails.length > 0 ? 'max-h-96 overflow-y-auto' : ''
                }`}
              >
                {orderDetails?.map((item) => (
                  <Item key={item.id} item={item} />
                ))}
              </div>


              <div className='flex gap-5 text-lg text-slate-900 mt-4'>
                <div className='flex gap-2 i items-center'>
                  <span className='text-sm '>Total Price: </span>
                  <div className=' font-bold'>{order.total_price}</div>
                </div>

                <div className='flex gap-2  items-center'>
                  <span className='text-sm ' >Total Income: </span>
                  <div className=' font-bold '>{order.total_price - order.wholesale_price}</div>
                </div>
              </div>
            </>
          )}
      </div>
      
    </div>
  );
}
