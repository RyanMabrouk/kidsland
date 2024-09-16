"use client";

import { useState } from "react";
import ClientAddress from "./ClientAddress";
import PaymentOptions from "./PaymentOptions";
import OrderResume from "./OrderResume";

export type OpenPaymentFormType = "clientAddress" | "paymentOptions" | "none";

export default function Content() {
  const [open, setOpen] = useState<OpenPaymentFormType>("clientAddress");
  return (
    <div className="flex w-full justify-center gap-7 p-8">
      <div className="mr-52 flex w-7/12 flex-col items-center gap-5 bg-white">
        <ClientAddress open={open} setOpen={setOpen} />
        <PaymentOptions open={open} setOpen={setOpen} />
      </div>
      <OrderResume />
    </div>
  );
}
