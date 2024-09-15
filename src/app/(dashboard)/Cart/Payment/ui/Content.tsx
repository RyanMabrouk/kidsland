"use client";

import { useState } from "react";
import ClientAdress from "./ClientAdress";
import PaymentOptions from "./PaymentOptions";
import OrderResume from "./OrderResume";

export default function Content() {
  const [open, setOpen] = useState<"clientAdress" | "paymentOptions" | "none">(
    "clientAdress",
  );
  return (
    <div className="flex w-full justify-center gap-7 p-8">
      <div className="mr-52 flex w-7/12 flex-col items-center gap-5 bg-white">
        <ClientAdress open={open} setOpen={setOpen} />
        <PaymentOptions open={open} setOpen={setOpen} />
      </div>
      <OrderResume />
    </div>
  );
}

// TODO: Remove the button
