import React, { useState } from "react";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import Image from "next/image";
import SecondaryLink from "@/components/SecondaryLink";
import FcGoogle from "@/components/icons/FcGoogle";
import SignupWithPassword from "./SignupWithPassword";

export default function SignupForm() {
  return (
    <div className="mx-auto flex h-fit w-full max-w-[40rem] flex-col gap-3 rounded-lg border p-10 shadow-lg">
      <SignupWithPassword />
      <div className="mt-6 flex w-full flex-col items-center justify-center gap-6">
        <div className="mx-auto flex w-full items-center justify-center space-x-3">
          <hr className="w-36 border-gray-300 max-sm:flex-1" />
          <span className="text-sm text-gray-500">or sign up with</span>
          <hr className="w-36 border-gray-300 max-sm:flex-1" />
        </div>

        <button
          className={
            "flex w-64 items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-200 ease-in-out hover:border-gray-400 hover:bg-gray-100 hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-400 max-sm:w-full"
          }
        >
          <FcGoogle size={20} />
          <span className="text-sm">Sign up with Google</span>
        </button>
      </div>
    </div>
  );
}
