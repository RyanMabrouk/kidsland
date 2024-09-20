"use client";
import updatePassword from "@/actions/auth/updatePassword";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { z } from "zod";

const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ChangePasswordForm() {
  const [fieldErrors, setFieldErrors] = React.useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = React.useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const formObject = Object.fromEntries(formData) as {
        newPassword: string;
        confirmPassword: string;
      };

      try {
        changePasswordSchema.parse(formObject);
        
        setFieldErrors({
          newPassword: "",
          confirmPassword: "",
        });
      } catch (err) {
        if (err instanceof z.ZodError) {
          const errors = {
            newPassword: "",
            confirmPassword: "",
          };

          err.errors.forEach((e) => {
            errors[e.path[0] as keyof typeof errors] = e.message;
          });
          setFieldErrors(errors);
        } else {
          setFieldErrors({
            newPassword: "",
            confirmPassword: "An unexpected error occurred",
          });
        }
        throw err;
      }

      const { error } = await updatePassword({
        newPassword: formObject.newPassword,
      });

      if (error) {
        setFieldErrors({
          ...fieldErrors,
          newPassword: error.message,
        });
        throw new Error(error.message);
      }

      setSuccessMessage("Your password has been successfully changed.");
    },
  });

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Change Password
      </h2>
      <form action={mutate} className="space-y-6">
        <Input
          label="New Password"
          placeholder="Enter new password"
          type="password"
          required
          name="newPassword"
          error={fieldErrors.newPassword} 
        />
        <Input
          label="Confirm New Password"
          placeholder="Confirm new password"
          type="password"
          required
          name="confirmPassword"
          error={fieldErrors.confirmPassword} 
        />

        {successMessage && (
          <p className="text-sm text-green-500">{successMessage}</p>
        )}

        <PrimaryButton loading={isPending} className="w-full">
          Change Password
        </PrimaryButton>
      </form>
    </div>
  );
}
