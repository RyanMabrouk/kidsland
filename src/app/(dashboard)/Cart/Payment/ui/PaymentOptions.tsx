import React, { Dispatch, SetStateAction, useState } from "react";
import PaymentOptionsForm from "./PaymentOptionsForm";

export default function PaymentOptions({
  open: o,
  setOpen,
}: {
  open: "clientAdress" | "paymentOptions" | "none";
  setOpen: Dispatch<SetStateAction<"clientAdress" | "paymentOptions" | "none">>;
}) {
  const isOpen = o === "paymentOptions";
  const open = () => setOpen("paymentOptions");
  const close = () => setOpen("none");

  return (
    <div className="w-full shadow-lg">
      <div className="flex justify-between">
        <h1 className="px-4 py-2">2. PAYMENT OPTIONS</h1>
        {isOpen || (
          <button
            onClick={open}
            className="px-4 transition-all duration-300 hover:text-blue-900 hover:underline"
          >
            modifier
          </button>
        )}
      </div>
      {isOpen || <div>data will be here soon</div>}
      {isOpen && <PaymentOptionsForm close={close} />}
    </div>
  );
}
