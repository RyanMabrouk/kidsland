"use client";
import signUp from "@/actions/auth/signup";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryLink from "@/components/SecondaryLink";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function SignupWithPassword() {
  const { mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { email, password } = Object.fromEntries(formData) as {
        [key: string]: string;
      };
      const { error } = await signUp({ email, password });
      console.log(error);
      if (error) throw error;
    },
  });
  return (
    <form className="flex-1 space-y-6" action={mutate}>
      <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>

      <Input name="email" label="Email" type="email" required />
      <Input name="password" label="Password" type="password" required />
      <Input name="confirm" label="Confirm Password" type="password" required />

      <div className="flex items-center space-x-4">
        <input type="checkbox" id="terms" required />
        <label htmlFor="terms" className="text-sm text-gray-600">
          By marking this field, you agree with the{" "}
          <a href="/terms" className="text-blue-500 hover:underline">
            terms of use
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>{" "}
          of this online store.
        </label>
      </div>
      <div className="flex justify-between gap-4 max-sm:flex-col">
        <PrimaryButton className="max-sm:w-full">Sign Up</PrimaryButton>
        <SecondaryLink href={"/login"} className="max-sm:w-full">
          You have account
        </SecondaryLink>
      </div>
    </form>
  );
}
