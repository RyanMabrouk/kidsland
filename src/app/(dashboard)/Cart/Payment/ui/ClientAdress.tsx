import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ClientAdressForm from "./ClientAdressForm";
import { useOrder } from "@/hooks/data/orders/useOrder";

export default function ClientAdress({
  open: o,
  setOpen,
}: {
  open: "clientAdress" | "paymentOptions" | "none";
  setOpen: Dispatch<SetStateAction<"clientAdress" | "paymentOptions" | "none">>;
}) {
  const { data: order } = useOrder();
  const isOpen = o === "clientAdress";
  const open = () => setOpen("clientAdress");
  const close = () => setOpen("none");
  const next = () => setOpen("paymentOptions");
  return (
    <div className="w-full shadow-lg">
      <div className="flex justify-between">
        <h1 className="px-4 py-2"> 1. ADRESSE CLIENT</h1>
        {isOpen || (
          <button
            onClick={open}
            className="px-4 transition-all duration-300 hover:text-blue-900 hover:underline"
          >
            modifier
          </button>
        )}
      </div>
      <hr />
      {isOpen || (
        <div className="flex flex-col gap-2 p-4 text-gray-600">
          <div className="flex gap-2">
            <div>{order?.first_name}</div>
            <div>{order?.last_name}</div>
          </div>
          <h2>
            {order?.address} | {order?.region} - {order?.city} | +216{" "}
            {order?.phone_number}
          </h2>
        </div>
      )}
      {isOpen && <ClientAdressForm next={next} close={close} />}
    </div>
  );
}