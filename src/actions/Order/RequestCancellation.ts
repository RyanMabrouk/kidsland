"use client";

import updateData from "@/api/updateData";
import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";

export default function useRequestCancellation(
  cancelMessage: string,
  id: number,
) {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async () => {
      if (!id || !cancelMessage) return;
      const { data, error } = await updateData<"orders">({
        tableName: "orders",
        match: { id },
        payload: { cancel_reason: cancelMessage },
      });
      if (error) throw new Error(error.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Cancellation request sent successfully");
    },
  });
}
