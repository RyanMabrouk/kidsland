import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import useOrdersByDate from '@/hooks/data/orders/useOrdersByDate';
import { useQueryClient } from '@tanstack/react-query';
import { ordersByDateQuery } from '@/hooks/data/orders/ordersByDateQuery';
import { Pagination } from '@mui/material';
import { useOrdersPagination } from '../context/useOrdersPagination';
import { Tables } from '@/types/database.types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OrderDetails from './orderDetails';
import DeleteOrder from './deleteOrder';
import EditOrderStatus from './editOrderStatus';
import Image from 'next/image';

export default function Orders({ searchQuery }: { searchQuery: string }) {
  const { date } = useParams();
  const { page, setPage } = useOrdersPagination(); 
  const limit = 8; 
  const { data: orders, isLoading } = useOrdersByDate({
    search: {
      column: "username",
      value: searchQuery,
    },
    pagination: {
      page: page,
      limit,
    },
    date: date as string,
  }); 

  const queryClient = useQueryClient();

  useEffect(() => {
    if (orders?.meta.has_next_page) {
      queryClient.prefetchQuery(
        ordersByDateQuery({
          date: date as string,  
          pagination: {
            page: page + 1,
            limit,
          }
        }),
      );
    }
  }, [page, orders?.meta.has_next_page, queryClient]);

  return (
    <div className='flex flex-col gap-5'>
      <div className='grid grid-cols-7 gap-5 px-5'>
        <div className='text-center col-span-2'>Username</div>
        <div className='text-center col-span-2'>Total Price</div>
        <div className='text-center col-span-2'>Status</div>
      </div>

      <div className='flex flex-col gap-2'>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          orders?.data.map((order: Tables<"orders">) => (
            <Dialog  key={order.id}>
              <DialogTrigger>
                <div
                  className="py-5 px-5 cursor-pointer shadow-lg grid grid-cols-7 gap-5 font-semibold text-slate-700 bg-white rounded-lg transition-all duration-300 transform hover:bg-blue-50 hover:shadow-xl hover:scale-105"
                >
                  <h2 className='text-center col-span-2'>{order.username}</h2>
                  <h2 className='text-center col-span-2'>{order.total_price} dt</h2>
                  <div
                      className='flex justify-center col-span-2'
                      onClick={(e) => e.stopPropagation()} 
                    >
                    <EditOrderStatus status={order.status} id={order.id} />
                  </div>
                  
                    <div
                      className='flex justify-center'
                      onClick={(e) => e.stopPropagation()} 
                    >
                      <DeleteOrder id={order.id} />
                    </div>
                </div>
              </DialogTrigger>

              <DialogContent className='ml-[7rem] w-[60rem] maw-w-full'>
                <DialogHeader >
                  <DialogTitle className='font-bold text-color5 text-lg'>      
                    <div className="flex flex-row items-center  gap-3">
                    <Image
                      src="/home/icons/flower_yellow.png"
                      alt=""
                      height={15}
                      width={15}
                    />
                    <div className=" font-bold uppercase text-color5 sm:text-2xl">
                     Orders Details
                    </div>
                    <Image
                      src="/home/icons/flower_yellow.png"
                      alt=""
                      height={15}
                      width={15}
                    />
                  </div>
                  </DialogTitle>
                  <OrderDetails orderId={order.id} order_total_Price={order.total_price} order_wholesale_price={order.wholesale_price} client={order.username} status={order.status} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))
        )}
      </div>

      <Pagination
        className="flex w-full justify-center"
        count={orders?.meta.total_pages}
        page={page}
        boundaryCount={3}
        siblingCount={3}
        onChange={(e, value) => setPage(value)}
      />
    </div>
  );
}
