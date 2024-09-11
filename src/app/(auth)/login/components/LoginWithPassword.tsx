"use client";
import login from "@/actions/auth/login";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export default function LoginWithPassword() {
  const { mutate } = useMutation({
    mutationFn: async (formdata: FormData) => {
      const { email, password } = Object.fromEntries(formdata) as {
        [key: string]: string;
      };
      const { error } = await login({ email, password });
      if (error) throw error;
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
