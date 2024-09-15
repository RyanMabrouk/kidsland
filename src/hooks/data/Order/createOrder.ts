import clearCart from "@/actions/Cart/clearCart";
import createOrder from "@/actions/Order/createOrder";
import { useToast } from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async () => {
      const user_id = await createOrder();
      await clearCart(user_id);
      localStorage.clear();
    },
    onSuccess: () => {
      toast.success("Order created successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["cart", { user: true }] });
      queryClient.invalidateQueries({
        queryKey: ["cart", { populated: true, user: true }],
      });
    },
    onError: (error) => {
      toast.error(error.message, "error");
    },
  });
}
