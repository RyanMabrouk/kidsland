import handleProductQuantity from "@/actions/Cart/handleProductQuantity";
import { useToast } from "@/hooks/useToast";
import { IProduct } from "@/types/database.tables.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    onSuccess: () => {
      toast.success("Quantity updated successfully");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => toast.error(error.message),
  });
}
