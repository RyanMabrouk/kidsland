import React, { useState } from "react";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import Image from "next/image";
import SecondaryLink from "./SecondaryLink";

export default function SignupForm() {
  return (
    <div className="mx-auto flex h-fit w-full max-w-[75rem] gap-10 rounded-lg border p-10 shadow-lg max-lg:flex-col">
      <form className="flex-1 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
        <div className="flex w-full gap-6 max-sm:flex-col">
          <Input label="First Name" type="text" />
          <Input label="Last Name" type="text" />
        </div>

        <Input label="Email" type="email" required />
        <Input label="Password" type="password" required />
        <Input label="Confirm Password" type="password" required />

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
    </div>
  );
}
