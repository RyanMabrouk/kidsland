"use client";

import { useState } from "react";
import ClientAddress from "./ClientAddress";
import PaymentOptions from "./PaymentOptions";
import OrderResume from "./OrderResume";
import { OpenProvider } from "../context/OpenProvider";

export type OpenPaymentFormType = "clientAddress" | "paymentOptions" | "none";

export default function Content() {
  return (
    <OpenProvider>
      <div className="flex w-full justify-center gap-24 p-8 transition-all duration-500">
        <div className="flex w-7/12 flex-col items-center gap-5 bg-white">
          <ClientAddress />
          <PaymentOptions />
        </div>
        <OrderResume />
      </div>
    </OpenProvider>
  );
}
