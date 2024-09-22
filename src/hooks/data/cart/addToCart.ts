"use client";
import getData from "@/api/getData";
import getSession from "@/api/getSession";
import postData from "@/api/postData";
import { useToast } from "@/hooks/useToast";
import useTranslation from "@/translation/useTranslation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddToCart() {
  const { toast } = useToast();
  const { data: translation } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ product_id }: { product_id: string }) => {
      const { session } = await getSession();
      if (!session) {
        throw (
          new Error(translation?.lang["User is not authenticated"]) ??
          "User is not authenticated"
        );
      }
      const isAvailable = await getData({
        tableName: "products",
        match: {
          id: product_id,
        },
      }).then((res) => (res.data?.[0].stock ?? 0) > 0);
      if (!isAvailable) {
        throw new Error(translation?.lang["Product is out of stock"]);
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
      toast.success(
        translation?.lang["Item added to cart"] ?? "Item added to cart",
      );
    },
  });
}
