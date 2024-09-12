"use client";
import deleteData from "@/api/deleteData";
import getSession from "@/api/getSession";
import { useToast } from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { wishlistQuery } from "./wishlistQuery";

export function useRemoveFromWishlist() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    onMutate(variables) {
      const previousValue = queryClient.getQueryData(
        wishlistQuery()["queryKey"],
      );
      queryClient.setQueryData(
        wishlistQuery()["queryKey"],
        (old: { data: string[] | undefined }) => {
          return {
            data: old?.data?.filter((id) => id !== variables.product_id),
          };
        },
      );
      return previousValue;
    },
    mutationFn: async ({ product_id }: { product_id: string }) => {
      const { session } = await getSession();
      if (!session) {
        throw new Error("User is not authenticated");
      }
      await deleteData<"wishlist">({
        tableName: "wishlist",
        match: { product_id, user_id: session.user.id },
      });
    },
    onError: (error, _, prev) => {
      toast.error(error.message);
      queryClient.setQueryData(wishlistQuery()["queryKey"], prev);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Item removed from wishlist");
    },
  });
}
