"use client";

import { useState } from "react";
import ClientAdress from "./ClientAdress";
import PaymentOptions from "./PaymentOptions";
import OrderResume from "./OrderResume";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import { getOrder } from "@/api/getOrder";

export default function Content() {
  const [open, setOpen] = useState<"clientAdress" | "paymentOptions" | "none">(
    "clientAdress",
  );
  const { toast } = useToast();
  const { mutate } = useMutation({
    mutationFn: getOrder,
    onSuccess: () => toast.success("success"),
    onError: (error: Error) => toast.error(error.message),
  });

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
