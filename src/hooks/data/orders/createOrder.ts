"use client";
import clearCart from "@/actions/Cart/clearCart";
import confirmOrder from "@/actions/Order/createOrder";
import { useToast } from "@/hooks/useToast";
import useTranslation from "@/translation/useTranslation";
import { PaymentMethodEnum } from "@/types/database.tables.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export default function useCreateOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: translation } = useTranslation();
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
        first_name: z
          .string({
            message: translation?.lang["${ELEMENT} is required"].replace(
              "${ELEMENT}",
              "First name",
            ),
          })
          .min(2, {
            message: translation?.lang[
              "${ELEMENT} must be at least ${MIN} characters"
            ]
              .replace("${ELEMENT}", "First name")
              .replace("${MIN}", "2"),
          }),
        last_name: z
          .string({
            message: translation?.lang["${ELEMENT} is required"].replace(
              "${ELEMENT}",
              "Last name",
            ),
          })
          .min(2, {
            message: translation?.lang[
              "${ELEMENT} must be at least ${MIN} characters"
            ]
              .replace("${ELEMENT}", "Last name")
              .replace("${MIN}", "2"),
          }),
        address: z
          .string({
            message: translation?.lang["${ELEMENT} is required"].replace(
              "${ELEMENT}",
              "Address",
            ),
          })
          .min(4, {
            message: translation?.lang[
              "${ELEMENT} must be at least ${MIN} characters"
            ]
              .replace("${ELEMENT}", "Address")
              .replace("${MIN}", "4"),
          }),
        region: z.string({
          message: translation?.lang["${ELEMENT} is required"].replace(
            "${ELEMENT}",
            "Region",
          ),
        }),
        city: z.string({
          message: translation?.lang["${ELEMENT} is required"].replace(
            "${ELEMENT}",
            "City",
          ),
        }),
        phone_number: z
          .string({
            message: translation?.lang["${ELEMENT} is required"].replace(
              "${ELEMENT}",
              "Phone number",
            ),
          })
          .regex(
            /^\+?[1-9]\d{1,14}$/,
            translation?.lang["Invalid ${ELEMENT} format"].replace(
              "${ELEMENT}",
              "phone number",
            ),
          ),

        additional_info: z
          .string({
            message: translation?.lang["${ELEMENT} must be a string"].replace(
              "${ELEMENT}",
              "Additional info",
            ),
          })
          .optional(),
        payment_method: z.enum(
          [PaymentMethodEnum.CASH, PaymentMethodEnum.ONLINE],
          {
            message: translation?.lang["Choose a ${ELEMENT}"].replace(
              "${ELEMENT}",
              "payment method",
            ),
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
      toast.success(
        translation?.lang["Order created successfully"] ??
          "Order created successfully",
      );
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
