"use client";

import { useState } from "react";
import ClientAdress from "./ClientAdress";
import PaymentOptions from "./PaymentOptions";

export default function Content() {
  const [open, setOpen] = useState<"clientAdress" | "paymentOptions" | "none">(
    "clientAdress",
  );

  return (
    <div className="flex w-7/12 flex-col items-center gap-7 bg-white">
      <ClientAdress open={open} setOpen={setOpen} />
      <PaymentOptions open={open} setOpen={setOpen} />
    </div>
  );
}
