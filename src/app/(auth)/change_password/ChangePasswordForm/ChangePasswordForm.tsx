"use client";
import updatePassword from "@/actions/auth/updatePassword";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { z } from "zod";

// Define Zod schema for password validation
const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters")
      .refine(
        (val) => /[A-Z]/.test(val),
        "Password must contain at least one uppercase letter",
      )
      .refine(
        (val) => /[0-9]/.test(val),
        "Password must contain at least one number",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path to error in the form
  });

export default function ChangePasswordForm() {
  const [errors, setErrors] = React.useState<string[]>([]);
  const [successMessage, setSuccessMessage] = React.useState<string>("");

  const { mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      const formObject = Object.fromEntries(formData) as {
        newPassword: string;
        confirmPassword: string;
      };

      // Validate data using Zod
      try {
        changePasswordSchema.parse(formObject);
        setErrors([]); // Clear errors if validation is successful
      } catch (err) {
        if (err instanceof z.ZodError) {
          // Set the errors from Zod validation
          setErrors(err.errors.map((e) => e.message));
        } else {
          setErrors(["An unexpected error occurred"]);
        }
        throw err; // Stop further processing
      }

      // Proceed with the change password logic here (replace with actual API)
      const { error } = await updatePassword({
        newPassword: formObject.newPassword,
      });

      if (error) {
        setErrors([error.message]);
        throw new Error(error.message);
      }

      setSuccessMessage("Your password has been successfully changed.");
    },
    onSuccess: () => {},
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
        />
        <Input
          label="Confirm New Password"
          placeholder="Confirm new password"
          type="password"
          required
          name="confirmPassword"
        />

        {errors.length > 0 && (
          <div className="space-y-1">
            {errors.map((error, index) => (
              <p key={index} className="text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        )}

        {successMessage && (
          <p className="text-sm text-green-500">{successMessage}</p>
        )}

        <PrimaryButton className="w-full">Change Password</PrimaryButton>
      </form>
    </div>
  );
}
