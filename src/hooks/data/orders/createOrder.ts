import clearCart from "@/actions/Cart/clearCart";
import confirmOrder from "@/actions/Order/createOrder";
import { useToast } from "@/hooks/useToast";
import { PaymentMethodEnum } from "@/types/database.tables.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import { z } from "zod";

export default function useCreateOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (args: {
      first_name: string;
      last_name: string;
      address: string;
      region: string;
      city: string;
      phone_number: string;
      additional_info: string;
      payment_method: PaymentMethodEnum;
    }) => {
      const schema = z.object({
        first_name: z.string({ message: "First name is required" }).min(2, {
          message: "First name must be at least 2 characters",
        }),
        last_name: z
          .string({
            message: "Last name is required",
          })
          .min(2, {
            message: "Last name must be at least 2 characters",
          }),
        address: z
          .string({
            message: "address is required",
          })
          .min(4, {
            message: "address must be at least 4 characters",
          }),
        region: z.string({
          message: "Region is required",
        }),
        city: z.string({
          message: "City is required",
        }),
        phone_number: z
          .string({
            message: "Phone number is required",
          })
          .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),

        additional_info: z
          .string({
            message: "Additional info must be a string",
          })
          .optional(),
        payment_method: z.enum(
          [PaymentMethodEnum.CASH, PaymentMethodEnum.ONLINE],
          {
            message: "Choose a payment method",
          },
        ),
      });

      try {
        schema.parse(args);
      } catch (err) {
        if (err instanceof z.ZodError) {
          err.errors.map((error) => {
            throw new Error(error.message);
          });
        }
      }
      const user_id = await confirmOrder({
        order: args,
      });
      await clearCart(user_id);
      localStorage.clear();
    },
    onSuccess: async () => {
      toast.success("Order created successfully", "success");
      await queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (error) => {
      if (!error.message.includes("{")) {
        toast.error(error.message, "error");
      } else {
        const parsedError = JSON.parse(error.message);
        parsedError.forEach((err: any) => {
          toast.error(err.message);
        });
      }
    },
  });
}
