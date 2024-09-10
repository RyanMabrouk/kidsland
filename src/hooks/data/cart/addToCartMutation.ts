"use client";
import getSession from "@/api/getSession";
import postData from "@/api/postData";
import { useToast } from "@/hooks/useToast";
import { TablesInsert } from "@/types/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddToCart() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ product_id }: { product_id: string }) => {
      const { session } = await getSession();
      if (!session) {
        throw new Error("User is not authenticated");
      }
      await postData<"cart">({
        tableName: "cart",
        payload: [
          {
            product_id,
            user_id: session.user.id,
          },
        ],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item added to cart");
    },
  });
}
