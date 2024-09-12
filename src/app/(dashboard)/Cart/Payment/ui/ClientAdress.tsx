import React, { Dispatch, SetStateAction, useState } from "react";
import ClientAdressForm from "./ClientAdressForm";
import { useOrders } from "@/hooks/data/orders/useOrders";

export default function ClientAdress({
  open: o,
  setOpen,
}: {
  open: "clientAdress" | "paymentOptions" | "none";
  setOpen: Dispatch<SetStateAction<"clientAdress" | "paymentOptions" | "none">>;
}) {
  const { data } = useOrders();
  const isOpen = o === "clientAdress";
  const open = () => setOpen("clientAdress");
  const close = () => setOpen("none");
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
      {isOpen || <div className="underline">data will be here soon</div>}
      {isOpen && <ClientAdressForm close={close} />}
    </div>
  );
}
