"use client";
import login from "@/actions/auth/login";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { z } from "zod";

// Define Zod schema for login validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginWithPassword() {
  const [errors, setErrors] = React.useState<string[]>([]);

  const { mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      // Convert FormData to plain object
      const formObject = Object.fromEntries(formData) as {
        email: string;
        password: string;
      };

      // Validate data with Zod
      try {
        loginSchema.parse(formObject);
        setErrors([]); // Clear errors if validation is successful
      } catch (err) {
        if (err instanceof z.ZodError) {
          // Set the errors from Zod validation
          setErrors(err.errors.map((e) => e.message));
        } else {
          setErrors(["An unexpected error occurred"]);
        }
        throw err; // rethrow the error to stop further processing
      }

      // Proceed with login if validation passes
      const { email, password } = formObject;
      const { error } = await login({ email, password });
      if (error) {
        setErrors([error.message]);
        throw error;
      }
    },
    onSuccess: () => {
      // Redirect or handle success
    },
  });

  return (
    <form className="w-full flex-1 space-y-6" action={mutate}>
      <h2 className="text-2xl font-bold text-gray-800">Login</h2>
      <p className="text-gray-600">
        If you have an account, log in with your email address.
      </p>

      <Input name="email" label="Your email" type="email" required />
      <Input name="password" label="Password" type="password" required />

      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-4 max-sm:flex-col">
        <PrimaryButton className="max-sm:w-full">Login</PrimaryButton>
        <Link
          href="/forgot-password"
          className="text-sm text-blue-500 hover:underline"
        >
          Forgot your password?
        </Link>
      </div>
    </form>
  );
}
