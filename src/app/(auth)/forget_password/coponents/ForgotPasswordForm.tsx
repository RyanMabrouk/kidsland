"use client";
import resetPassword from "@/actions/auth/resetPassword";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";

// Define Zod schema for email validation
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPasswordForm() {
  const [errors, setErrors] = React.useState<string[]>([]);
  const [successMessage, setSuccessMessage] = React.useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const email = formData.get("email") as string;

      try {
        forgotPasswordSchema.parse({ email });
        setErrors([]);
      } catch (err) {
        setSuccessMessage("");
        if (err instanceof z.ZodError) {
          setErrors(err.errors.map((e) => e.message));
        } else {
          setErrors(["An unexpected error occurred"]);
        }
        throw err;
      }

      const { error } = await resetPassword({ email });
      if (error) {
        setErrors([error.message]);
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      setSuccessMessage("A password reset link has been sent to your email.");
    },
  });

  return (
    <div className="mx-auto flex h-fit w-full max-w-[40rem] flex-col rounded-lg border bg-white p-10 shadow-lg">
      <div className="flex flex-col gap-10">
        <div className="flex-1">
          <form action={mutate} className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Forgot your password?
            </h2>
            <p className="text-gray-600">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <div className="space-y-2">
              <Input
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                required
                name="email"
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
            </div>

            <PrimaryButton loading={isPending} className="w-full">
              Send Reset Link
            </PrimaryButton>
          </form>

          <div className="mt-6 flex w-full flex-col items-center justify-center gap-6">
            <div className="mx-auto flex w-full items-center justify-center space-x-3">
              <hr className="w-36 border-gray-300 max-sm:flex-1" />
              <span className="text-sm text-gray-500">or</span>
              <hr className="w-36 border-gray-300 max-sm:flex-1" />
            </div>
            <Link href="/login">
              <SecondaryButton className="">Return to Login</SecondaryButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}