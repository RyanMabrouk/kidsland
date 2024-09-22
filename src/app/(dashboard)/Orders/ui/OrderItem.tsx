import useRequestCancellation from "@/actions/Order/RequestCancellation";
import { Tables } from "@/types/database.types";
import Image from "next/image";
import React, { useState } from "react";

export default function OrderItem({
  order,
}: {
  order: Tables<"orders"> | null;
}) {
  const [cancelRequest, setCancelRequest] = useState(false);
  const [cancelMessage, setCancelMessage] = useState(
    order?.cancel_reason || "",
  );
  const { mutate } = useRequestCancellation(cancelMessage, order?.id ?? 0);
  if (!order) return null;
  return (
    <div>
      <div className="flex w-[45rem] items-center gap-2 bg-gray-100 p-3 transition-all duration-200 hover:shadow-md">
        <div className="w-3/12 p-3">
          {order.status === "cancelled" && (
            <div className="flex flex-col items-center">
              <Image
                src="/Orders/orderCancelled.png"
                alt="order"
                width={200}
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
                width={200}
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
                width={200}
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
                width={200}
                height={100}
              />{" "}
              <h1 className="font-semibold text-green-500">
                {order.status} ✅
              </h1>
            </div>
          )}
        </div>
        <div className="grid w-9/12 grid-rows-7">
          <div className="flex justify-between">
            <div className="">Date : {order.created_at.substring(0, 10)}</div>
            <div className="font-semibold">Total : {order.total_price} TND</div>
          </div>
          <div className="flex gap-2">
            <h1>Full name :</h1>
            <div className="">{order.first_name}</div>
            <div className="">{order.last_name}</div>
          </div>
          <div className="flex gap-2">
            <h1>email</h1>
            <div className="">{order.address}</div>
          </div>
          <div className="flex gap-2">
            <h1>phone number</h1>
            <div className="">{order.phone_number}</div>
          </div>
          <div className="flex gap-2">
            <h1>To : </h1>
            <div className="">{order.city} - </div>
            <div className="">{order.region}</div>
          </div>
          <div>
            <h1>additional informations :</h1>
            <div className="">{order.additional_info}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <h1>payment method : </h1>
              <div className="">{order.payment_method}</div>
            </div>
            {cancelRequest || (
              <button
                className={`rounded-md bg-color1 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-color1`}
                disabled={order.status === "cancelled"}
                onClick={() => setCancelRequest(true)}
              >
                Request cancellation
              </button>
            )}
            {cancelRequest && (
              <div className="flex gap-1">
                <button
                  className="rounded-md bg-color3 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-color2"
                  onClick={() => setCancelRequest(false)}
                >
                  cancel request
                </button>
                <button
                  className={`rounded-md bg-color1 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-color1`}
                  disabled={order.status === "cancelled"}
                  onClick={() => mutate()}
                >
                  Request cancellation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {cancelRequest && (
        <div className="flex items-start gap-3 bg-gray-100 p-5">
          <label className="w-[8rem] font-semibold" htmlFor="cancel_reason">
            cancel reason
          </label>
          <textarea
            value={cancelMessage}
            onChange={(e) => setCancelMessage(e.target.value)}
            name="cancel_reason"
            id="cancel_reason"
            className="w-full p-2"
            rows={5}
          ></textarea>
        </div>
      )}
    </div>
  );
}
