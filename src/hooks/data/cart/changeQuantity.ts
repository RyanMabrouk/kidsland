import handleProductQuantity from "@/actions/Cart/handleProductQuantity";
import { useToast } from "@/hooks/useToast";
import { IProduct, QueryReturnType } from "@/types/database.tables.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartPopulatedQuery } from "./cartPopulatedQuery";

export default function useChangeQuantity(product: IProduct | null) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (quantity: number) => {
      if (!product) {
        throw new Error("Product not found");
      }
      return await handleProductQuantity(product.id, quantity);
    },
    onMutate: async (quantity) => {
      const queryKey = cartPopulatedQuery()["queryKey"];
      type queryReturnType = QueryReturnType<typeof cartPopulatedQuery>;
      await queryClient.cancelQueries({
        queryKey,
      });
      const previousCart = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(
        queryKey,
        (old: queryReturnType): queryReturnType => {
          const changedProduct = old.data?.find(
            (e) => e.product.id === product?.id,
          );
          if (!changedProduct) {
            return old;
          }
          return {
            ...old,
            data: [
              ...(old.data?.filter((e) => e.product.id !== product?.id) ?? []),
              {
                ...changedProduct,
                quantity,
              },
            ],
          };
        },
      );
      return previousCart;
    },
    onSuccess: () => {
      toast.success("Quantity updated successfully");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error, _, previousCart) => {
      queryClient.setQueryData(cartPopulatedQuery()["queryKey"], previousCart);
      toast.error(error.message);
    },
  });
}
