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
  const [successMessage, setSuccessMessage] = React.useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: async (formObject: FormData) => {
      const data = Object.fromEntries(formObject) as {
        email: string;
        password: string;
      };

      try {
        loginSchema.parse(data);
        setErrors([]);
      } catch (err) {
        setSuccessMessage("");
        if (err instanceof z.ZodError) {
          setErrors(err.errors.map((e) => e.message));
        } else {
          setErrors(["An unexpected error occurred"]);
        }
        console.error("Validation error:", err);
        throw err;
      }

      // Proceed with login if validation passes
      const email = formObject.get("email") as string;
      const password = formObject.get("password") as string;
      const { error } = await login({ email, password });
      console.log("Login API response:", { error });

      if (error) {
        setErrors([error.message]);
        throw error;
      }

      setSuccessMessage("Login successful");
      // Optionally handle redirection or other success behavior here
    },
    onSuccess: () => {
      // Optionally handle success behavior here
      console.log("Login successful, handling success...");
    },
  });

  return (
    <form className="w-full flex-1 space-y-6" action={mutate}>
      <h2 className="text-2xl font-bold text-gray-800">Login</h2>
      <p className="text-gray-600">
        If you have an account, log in with your email address.
      </p>

      <Input
        name="email"
        label="Your email"
        type="email"
        required
        placeholder="Enter Your Email"
      />
      <Input
        name="password"
        label="Password"
        type="password"
        required
        placeholder="Enter Your Password"
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

      <div className="flex items-center justify-between gap-4 max-sm:flex-col">
        <PrimaryButton className="max-sm:w-full" loading={isPending}>
          Sign Up
        </PrimaryButton>
        <Link
          href="/forget_password"
          className="text-sm text-blue-500 hover:underline"
        >
          Forgot your password?
        </Link>
      </div>
    </form>
  );
}
