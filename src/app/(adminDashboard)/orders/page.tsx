"use client";
import useOrders from "@/hooks/data/orders/useOrders";
import { Tables } from "@/types/database.types";
import React from "react";
import Day from "./ui/day";
import Image from "next/image";
import { getLastDayOfMonth } from "@/helpers/getLastDayOfMonth";

export default function Page() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); 
  const startDate = new Date(year, month, 1); 
  const endDate = new Date(year, month + 1, 0); 

  const { data: orders, isLoading, error } = useOrders({
    sort: { ascending: false, column: "created_at" },
    date: {
      from: `${startDate.toISOString().split("T")[0]}T00:00:00`,
      to: `${endDate.toISOString().split("T")[0]}T23:59:59`,
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const groupedOrders = orders?.data?.reduce((acc: Record<string, Tables<"orders">[]>, order: Tables<"orders">) => {
    const orderDate = new Date(order.created_at).toISOString().split("T")[0];
    if (!acc[orderDate]) {
      acc[orderDate] = [];
    }
    acc[orderDate].push(order);
    return acc;
  }, {});

  return (
    <div className="w-[50rem] mt-20 m-auto">
      <div className="flex flex-row items-center justify-center gap-2 md:gap-3">
        <Image
          src="/home/icons/flower_yellow.png"
          alt="Yellow Flower"
          height={15}
          width={15}
        />
        <div className="text-xl md:text-2xl font-bold uppercase text-color5">
          Orders of This Month
        </div>
        <Image
          src="/home/icons/flower_yellow.png"
          alt="Yellow Flower"
          height={15}
          width={15}
        />
      </div>
      <div className="grid grid-cols-3 gap-5 text-slate-900 text-lg font-bold mt-10 px-5">
        <div>Day</div>
        <div>Total Orders</div>
        <div>Total Revenue</div>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        {groupedOrders ? (
          Object.keys(groupedOrders).map((date) => (
            <Day key={date} date={date} groupedOrders={groupedOrders} />
          ))
        ) : (
          <p>No orders found for this month.</p>
        )}
      </div>
    </div>
  );
}
