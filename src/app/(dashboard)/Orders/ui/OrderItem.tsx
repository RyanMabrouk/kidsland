import { Tables } from "@/types/database.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function OrderItem({
  order,
}: {
  order: Tables<"orders"> | null;
}) {
  if (!order) return null;
  return (
    <Link href={`/Orders/${order.id}`}>
      <div className="flex w-full items-center gap-2 rounded-md bg-gray-100 p-3 transition-all duration-200 hover:shadow-md">
        <div className="w-3/12 p-3">
          {order.status === "cancelled" && (
            <div className="flex flex-col items-center">
              <Image
                src="/Orders/orderCancelled.png"
                alt="order"
                width={100}
                height={100}
              />{" "}
              <h1 className="font-semibold text-color1">{order.status} ❌</h1>
            </div>
          )}
          {order.status === "pending" && (
            <div className="flex flex-col items-center">
              <Image
                src="/Orders/orderPending.png"
                alt="order"
                width={100}
                height={100}
              />{" "}
              <h1 className="font-semibold text-color5">{order.status} 🕛</h1>
            </div>
          )}
          {order.status === "approved" && (
            <div className="flex flex-col items-center">
              <Image
                src="/Orders/orderApproved.png"
                alt="order"
                width={100}
                height={100}
              />{" "}
              <h1 className="font-semibold text-color6">{order.status} 👍</h1>
            </div>
          )}
          {order.status === "fulfilled" && (
            <div className="flex flex-col items-center">
              <Image
                src="/Orders/orderFulfilled.png"
                alt="order"
                width={100}
                height={100}
              />{" "}
              <h1 className="font-semibold text-green-500">
                {order.status} ✅
              </h1>
            </div>
          )}
        </div>
        <div className="grid w-9/12 grid-cols-2 gap-2 rounded-md border border-gray-300 bg-gray-50 p-3">
          <div className="max-sm:col-span-2">
            Date : {order.created_at.substring(0, 10)}
          </div>
          <div className="text-right font-semibold max-sm:col-span-2 max-sm:text-left">
            Total : {order.total_price} TND
          </div>
          <div className="flex gap-2 max-md:col-span-2">
            <h1>Full name :</h1>
            <div className="">{order.first_name}</div>
            <div className="">{order.last_name}</div>
          </div>
          <div className="flex gap-2 max-md:col-span-2">
            <h1>email</h1>
            <div className="max-sm:overflow-scroll">{order.address}</div>
          </div>
          <div className="flex gap-2 max-md:col-span-2">
            <h1>phone number</h1>
            <div className="">{order.phone_number}</div>
          </div>
          <div className="flex gap-2 max-md:col-span-2">
            <h1>To : </h1>
            <div className="">{order.city} - </div>
            <div className="">{order.region}</div>
          </div>
          <div className="col-span-2">
            <h1>additional informations :</h1>
            <div className="">{order.additional_info}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="col-span-2 flex gap-2">
              <h1 className="text-nowrap">payment method : </h1>
              <div className="">{order.payment_method}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
