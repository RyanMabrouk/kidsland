import handleDeleteCartItem from "@/actions/Cart/handleDeleteCartItem";
import { useToast } from "@/hooks/useToast";
import { IProduct } from "@/types/database.tables.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteFromCart(product: IProduct | null) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!product) {
        throw new Error("Product not found");
      }
      await handleDeleteCartItem(product.id);
    },
    onSuccess: () => {
      toast.success("Item deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => toast.error(error.message),
  });
}
