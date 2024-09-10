"use client";
import getSession from "@/api/getSession";
import { useToast } from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCart from "./useCart";
import deleteData from "@/api/deleteData";

export function useClearCart() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: oldCart } = useCart();
  return useMutation({
    mutationFn: async () => {
      const { session } = await getSession();
      if (!session) {
        throw new Error("User is not authenticated");
      }
      if (!oldCart?.data) {
        throw new Error("User cart not found");
      }
      await deleteData({
        tableName: "cart",
        matchInArray: {
          column: "product_id",
          in: oldCart.data,
        },
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Cart was cleared");
    },
  });
}
