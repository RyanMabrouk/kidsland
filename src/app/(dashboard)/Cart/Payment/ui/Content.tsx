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
      <div className="flex w-full flex-col items-start justify-center gap-24 p-8 transition-all duration-500 lg:flex-row">
        <div className="flex w-full flex-col items-center gap-5 bg-white lg:w-7/12">
          <ClientAddress />
          <PaymentOptions />
        </div>
        <OrderResume />
      </div>
    </OpenProvider>
  );
}
