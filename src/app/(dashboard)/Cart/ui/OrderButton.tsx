import { fixOrder } from "@/api/Order/fixOrder";
import { useToast } from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";

export default function OrderButton({ total }: { total: number }) {
  const [hover, setHover] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate } = useMutation({
    mutationFn: fixOrder,
    onSuccess: () => {
      toast.success("Order placed successfully");
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <Link onClick={() => mutate()} href="/Cart/Payment" className="w-full">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="rounded-lg bg-color1 p-3 text-center text-xl font-semibold text-white transition-all duration-300 hover:bg-red-400"
      >
        Order ({Math.round(total * 100) / 100} TND)
      </div>
    </Link>
  );
}
